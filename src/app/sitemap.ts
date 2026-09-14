import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pentacloud.in';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/blogs',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic WordPress blog routes
  let blogRoutes: any[] = [];
  try {
    const res = await fetch('https://cms.pentacloudconsulting.com/wp-json/wp/v2/posts?per_page=100', {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const posts = await res.json();
      if (Array.isArray(posts)) {
        blogRoutes = posts.map((post: any) => ({
          url: `${baseUrl}/blogs/${post.slug}`,
          lastModified: new Date(post.modified || post.date || new Date()),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }));
      }
    }
  } catch (err) {
    console.warn('WordPress fetch failed in sitemap:', err);
  }

  return [...staticRoutes, ...blogRoutes];
}
