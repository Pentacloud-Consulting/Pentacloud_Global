export interface DomainConfig {
  domainName: string;
  siteTitle: string;
  wpApiUrl: string;         // URL Next.js uses to call WP REST API (server-side)
  wpApiUrlClient: string;   // URL used for the /api/wp-blogs proxy (client-side)
  canonicalBase: string;
  contactEmail: string;
  contactPhone: string;
}

/**
 * Detects active domain from a hostname string.
 *
 * │ Domain                    │ WP API URL                           │ Notes                              │
 * ├───────────────────────────┼──────────────────────────────────────┼─────────────────────────────────────├
 * │ pentacloud.in             │ https://wp.pentacloudconsulting.com │ WP lives on Hostinger subdomain    │
 * │ pentacloudconsulting.com  │ https://wp.pentacloudconsulting.com │ wp subdomain → Hostinger 82.x.x.x │
 *
 * The “wp” subdomain (A record → 82.180.142.220) stays on Hostinger Shared Hosting.
 * The “@” and “www” A records point to the VPS (31.97.207.239).
 * This ensures that server-side fetch(…/wp-json/…) NEVER loops back to Next.js.
 */
export function getDomainConfig(host?: string): DomainConfig {
  let hostname = host || '';
  if (!hostname && typeof window !== 'undefined') {
    hostname = window.location.hostname;
  }

  const isIndia = hostname.endsWith('.in') || hostname.includes('pentacloud.in');

  // wp.pentacloudconsulting.com → Hostinger Shared IP (stays there always)
  const WP_API = 'https://wp.pentacloudconsulting.com';

  if (isIndia) {
    return {
      domainName: 'pentacloud.in',
      siteTitle: 'Pentacloud Consulting India',
      wpApiUrl: WP_API,
      wpApiUrlClient: 'pentacloudconsulting.com',
      canonicalBase: 'https://pentacloud.in',
      contactEmail: 'contactus@pentacloudconsulting.com',
      contactPhone: '+91 8147897286',
    };
  }

  return {
    domainName: 'pentacloudconsulting.com',
    siteTitle: 'Pentacloud Consulting',
    wpApiUrl: WP_API,
    wpApiUrlClient: 'pentacloudconsulting.com',
    canonicalBase: 'https://pentacloudconsulting.com',
    contactEmail: 'contactus@pentacloudconsulting.com',
    contactPhone: '+971 545 132 807',
  };
}

/**
 * Returns true when running in a server-side (Node.js) environment.
 * In server context we fetch WordPress directly (no CORS). 
 * In browser context we route through /api/wp-blogs proxy (avoids CORS).
 */
function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Fetches all WordPress posts for a given domain.
 *
 * Server-side  → fetches WP REST API directly (no CORS in Node.js)
 * Client-side  → calls /api/wp-blogs proxy (avoids CORS in browser)
 *
 * @param customHost - e.g. 'pentacloud.in' or 'pentacloudconsulting.com'
 */
export async function fetchBlogsForDomain(customHost?: string) {
  const config = getDomainConfig(customHost);
  const domain = config.domainName;

  try {
    if (isServer()) {
      // ── Server-side: hit WordPress directly ─────────────────────
      const wpUrl = `${config.wpApiUrl}/wp-json/wp/v2/posts?_embed&per_page=100`;
      const res = await fetch(wpUrl, {
        headers: { 'Accept': 'application/json', 'User-Agent': 'Pentacloud-NextJS/1.0' },
        next: { revalidate: 60 },
      });

      if (res.ok) return await res.json();

      // Primary subdomain failed — try root pentacloudconsulting.com as fallback
      const fbRes = await fetch('https://wp.pentacloudconsulting.com/wp-json/wp/v2/posts?_embed&per_page=100', {
        headers: { 'Accept': 'application/json', 'User-Agent': 'Pentacloud-NextJS/1.0' },
        next: { revalidate: 60 },
      });
      if (fbRes.ok) return await fbRes.json();

      return [];
    } else {
      // ── Client-side: use /api/wp-blogs proxy (avoids CORS) ──────
      const proxyUrl = `/api/wp-blogs?domain=${encodeURIComponent(domain)}`;
      const res = await fetch(proxyUrl);
      if (!res.ok) {
        console.error(`[fetchBlogsForDomain] Proxy returned ${res.status} for domain: ${domain}`);
        return [];
      }
      const json = await res.json();
      if (json.fallback) {
        console.warn(`[fetchBlogsForDomain] Fallback to pentacloud.in — ${domain} was unavailable.`);
      }
      return Array.isArray(json.data) ? json.data : [];
    }
  } catch (err) {
    console.error(`[fetchBlogsForDomain] Error fetching blogs for ${domain}:`, err);

    // Last-resort fallback — wp subdomain
    try {
      const fbRes = await fetch('https://wp.pentacloudconsulting.com/wp-json/wp/v2/posts?_embed&per_page=100', {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 60 },
      });
      if (fbRes.ok) return await fbRes.json();
    } catch { /* ignore */ }
    return [];
  }
}

/**
 * Fetches a single WordPress post by slug.
 *
 * Server-side  → fetches WP REST API directly
 * Client-side  → calls /api/wp-blogs proxy
 *
 * @param slug - Post slug
 * @param customHost - e.g. 'pentacloud.in' or 'pentacloudconsulting.com'
 */
export async function fetchSingleBlogForDomain(slug: string, customHost?: string) {
  const config = getDomainConfig(customHost);
  const domain = config.domainName;

  try {
    if (isServer()) {
      // ── Server-side: hit WordPress directly ─────────────────────
      const wpUrl = `${config.wpApiUrl}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`;
      const res = await fetch(wpUrl, {
        headers: { 'Accept': 'application/json', 'User-Agent': 'Pentacloud-NextJS/1.0' },
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const posts = await res.json();
        if (Array.isArray(posts) && posts.length > 0) return posts[0];
      }

      // Fallback: try root pentacloudconsulting.com directly
      const fbRes = await fetch(`https://pentacloudconsulting.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`, {
        headers: { 'Accept': 'application/json', 'User-Agent': 'Pentacloud-NextJS/1.0' },
        next: { revalidate: 60 },
      });
      if (fbRes.ok) {
        const fbPosts = await fbRes.json();
        if (Array.isArray(fbPosts) && fbPosts.length > 0) return fbPosts[0];
      }

      return null;
    } else {
      // ── Client-side: use /api/wp-blogs proxy ────────────────────
      const proxyUrl = `/api/wp-blogs?domain=${encodeURIComponent(domain)}&slug=${encodeURIComponent(slug)}`;
      const res = await fetch(proxyUrl);
      if (!res.ok) {
        console.error(`[fetchSingleBlogForDomain] Proxy ${res.status} for slug: ${slug}, domain: ${domain}`);
        return null;
      }
      const json = await res.json();
      const posts = Array.isArray(json.data) ? json.data : [];
      return posts.length > 0 ? posts[0] : null;
    }
  } catch (err) {
    console.error(`[fetchSingleBlogForDomain] Error fetching slug '${slug}' for ${domain}:`, err);
    return null;
  }
}
