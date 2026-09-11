import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ViewBlog } from '../../../Web-Page/Blogs/View Blog';
import { fetchSingleBlogForDomain, getDomainConfig } from '../../../Web-Page/Blogs/Dynamic Change Blog';
import { decodeHtmlEntities } from '../../../Web-Page/Blogs/Blog Saveed';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// ─── Location → ISO geo helpers ────────────────────────────────────────────────
const LOCATION_GEO: Record<string, { region: string; placename: string; ogLocale: string }> = {
  dubai:  { region: 'AE-DU', placename: 'Dubai, United Arab Emirates', ogLocale: 'en_AE' },
  qatar:  { region: 'QA',    placename: 'Qatar',                        ogLocale: 'en_QA' },
  uae:    { region: 'AE',    placename: 'United Arab Emirates',          ogLocale: 'en_AE' },
  india:  { region: 'IN',    placename: 'India',                         ogLocale: 'en_IN' },
  global: { region: 'US',    placename: 'Global',                        ogLocale: 'en_US' },
};

function getGeo(location?: string) {
  if (!location) return null;
  return LOCATION_GEO[location.toLowerCase()] ?? {
    region: 'AE',
    placename: location,
    ogLocale: 'en_AE',
  };
}

// ─── JSON-LD Article Schema ─────────────────────────────────────────────────────
function buildArticleSchema(blog: any) {
  const geo = getGeo(blog.location);
  const config = getDomainConfig();
  const url = blog.canonical_url || `${config.canonicalBase}/blogs/${blog.slug}`;

  // Extract all images from content
  const contentImages: string[] = [];
  if (blog.content) {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = imgRegex.exec(blog.content)) !== null) {
      if (match[1] && !contentImages.includes(match[1])) {
        contentImages.push(match[1]);
      }
    }
  }
  
  const heroImage = blog.og_image || blog.cover_image_url;
  const allImages = heroImage ? Array.from(new Set([heroImage, ...contentImages])) : contentImages;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.meta_title || blog.title,
    description: blog.meta_description || blog.excerpt || '',
    image: allImages.length > 0 ? allImages : '',
    url,
    datePublished: blog.publish_date || undefined,
    dateModified: blog.last_modified_date || blog.publish_date || undefined,
    author: {
      '@type': 'Person',
      name: blog.author || 'Pentacloud Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pentacloud Consulting',
      logo: {
        '@type': 'ImageObject',
        url: `${config.canonicalBase}/Logo/logo.webp`,
      },
    },
    ...(geo && geo.placename !== 'Global'
      ? {
          areaServed: {
            '@type': 'Place',
            name: geo.placename,
            ...(geo.region !== 'US' && {
              address: {
                '@type': 'PostalAddress',
                addressCountry: geo.region.split('-')[0],
                ...(geo.region.includes('-') && { addressRegion: geo.region }),
              },
            }),
          },
        }
      : {}),
  };
}

async function getWpPostBySlug(slug: string) {
  // Try both domains — pentacloud.in first, then pentacloudconsulting.com
  // This ensures slugs from either WordPress site always resolve correctly.
  const domains = ['pentacloud.in', 'pentacloudconsulting.com'];

  for (const domain of domains) {
    try {
      const post = await fetchSingleBlogForDomain(slug, domain);
      if (!post) continue;

      const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
      const content = post.content?.rendered || '';
      const rawExcerpt = post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]*>?/gm, '').trim() : '';
      const excerpt = decodeHtmlEntities(rawExcerpt);

      const config = getDomainConfig(domain);

      const rawTitle = post.title?.rendered ? post.title.rendered.replace(/<[^>]*>?/gm, '').trim() : 'Blog Post';
      const title = decodeHtmlEntities(rawTitle);

      return {
        title,
        slug: post.slug,
        content,
        excerpt,
        cover_image_url: featuredMedia,
        publish_date: post.date,
        author: post._embedded?.['author']?.[0]?.name || 'Pentacloud Team',
        canonical_url: `${config.canonicalBase}/blogs/${post.slug}`,
        sourceDomain: domain,
      };
    } catch (err) {
      console.error(`Error fetching WP post slug '${slug}' from ${domain}:`, err);
    }
  }

  return null;
}


// ─── Metadata ───────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getWpPostBySlug(slug);

  if (!blog) {
    return { title: 'Not Found' };
  }

  const url = blog.canonical_url;
  
  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url,
      type: 'article',
      publishedTime: blog.publish_date,
      images: blog.cover_image_url ? [{ url: blog.cover_image_url }] : [],
    },
  };
}

// ─── Page ───────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await getWpPostBySlug(slug);

  if (!blog) {
    notFound();
  }

  const articleSchema = buildArticleSchema(blog);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ViewBlog blog={blog} />
    </>
  );
}
