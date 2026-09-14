import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://pentacloud.in';

  let posts: any[] = [];
  try {
    const res = await fetch('https://cms.pentacloudconsulting.com/wp-json/wp/v2/posts?_embed&per_page=100', {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) posts = data;
    }
  } catch (err) {
    console.error('Error fetching WP posts for image sitemap:', err);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  posts.forEach((post) => {
    const url = `${baseUrl}/blogs/${post.slug}`;
    const images: { loc: string; caption: string }[] = [];

    // 1. Featured Image
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const title = post.title?.rendered ? post.title.rendered.replace(/<[^>]*>?/gm, '').trim() : '';

    if (featuredMedia) {
      images.push({
        loc: featuredMedia,
        caption: title,
      });
    }

    // 2. Extract in-content images
    const content = post.content?.rendered || '';
    if (content) {
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      let match;
      while ((match = imgRegex.exec(content)) !== null) {
        if (match[1]) {
          images.push({
            loc: match[1],
            caption: title,
          });
        }
      }
    }

    if (images.length > 0) {
      xml += `  <url>\n    <loc>${url}</loc>\n`;
      const uniqueImages = Array.from(new Map(images.map(item => [item.loc, item])).values());
      uniqueImages.forEach((img) => {
        const cleanLoc = img.loc.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        const cleanCaption = img.caption.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        const fullLoc = cleanLoc.startsWith('http') ? cleanLoc : `${baseUrl}${cleanLoc}`;

        xml += `    <image:image>\n`;
        xml += `      <image:loc>${fullLoc}</image:loc>\n`;
        if (cleanCaption) {
          xml += `      <image:caption>${cleanCaption}</image:caption>\n`;
        }
        xml += `    </image:image>\n`;
      });
      xml += `  </url>\n`;
    }
  });

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
