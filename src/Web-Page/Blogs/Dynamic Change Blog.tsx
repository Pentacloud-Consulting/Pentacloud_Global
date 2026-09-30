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
 * Fetch strategy (server-side, 3 tiers — first success wins):
 *   1. Direct IP http://82.180.142.220 + Host header  ← always works (bypasses DNS)
 *   2. https://wp.pentacloudconsulting.com            ← works after Hostinger subdomain configured
 *   3. https://pentacloudconsulting.com               ← last resort
 */
export function getDomainConfig(host?: string): DomainConfig {
  let hostname = host || '';
  if (!hostname && typeof window !== 'undefined') {
    hostname = window.location.hostname;
  }

  const isIndia = hostname.endsWith('.in') || hostname.includes('pentacloud.in');

  if (isIndia) {
    return {
      domainName: 'pentacloud.in',
      siteTitle: 'Pentacloud Consulting India',
      wpApiUrl: 'https://wp.pentacloudconsulting.com',
      wpApiUrlClient: 'pentacloudconsulting.com',
      canonicalBase: 'https://pentacloud.in',
      contactEmail: 'contactus@pentacloudconsulting.com',
      contactPhone: '+91 8147897286',
    };
  }

  return {
    domainName: 'pentacloudconsulting.com',
    siteTitle: 'Pentacloud Consulting',
    wpApiUrl: 'https://wp.pentacloudconsulting.com',
    wpApiUrlClient: 'pentacloudconsulting.com',
    canonicalBase: 'https://pentacloudconsulting.com',
    contactEmail: 'contactus@pentacloudconsulting.com',
    contactPhone: '+971 545 132 807',
  };
}

/** Returns true when running in Node.js (server-side). */
function isServer(): boolean {
  return typeof window === 'undefined';
}

// ─── Hostinger direct-IP constants ───────────────────────────────────────────
// WordPress lives on Hostinger Shared Hosting permanently.
// By hitting the IP directly with a Host header we bypass DNS entirely,
// which means this works regardless of where @ / www / wp A records point.
const WP_IP   = '82.180.142.220';
const WP_HOST = 'pentacloudconsulting.com';

/**
 * Server-side 3-tier WP fetch helper.
 * Tier 1: direct IP + Host header (always works, no DNS dependency)
 * Tier 2: https://wp.pentacloudconsulting.com subdomain
 * Tier 3: https://pentacloudconsulting.com root domain
 */
async function serverFetchWP(path: string): Promise<any[] | null> {
  // Tier 1 — Direct IP (HTTP is fine server-to-server, no CORS)
  try {
    const res = await fetch(`http://${WP_IP}${path}`, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'Pentacloud-NextJS/1.0', 'Host': WP_HOST },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length >= 0) return data;
    }
  } catch { /* fall through */ }

  // Tier 2 — wp subdomain (works after Hostinger subdomain is configured)
  try {
    const res = await fetch(`https://wp.pentacloudconsulting.com${path}`, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'Pentacloud-NextJS/1.0' },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length >= 0) return data;
    }
  } catch { /* fall through */ }

  // Tier 3 — root domain (last resort)
  try {
    const res = await fetch(`https://pentacloudconsulting.com${path}`, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'Pentacloud-NextJS/1.0' },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length >= 0) return data;
    }
  } catch { /* fall through */ }

  return null;
}

/**
 * Fetches all WordPress posts for a given domain.
 *
 * Server-side → 3-tier direct fetch (IP → subdomain → root)
 * Client-side → /api/wp-blogs proxy (avoids CORS)
 */
export async function fetchBlogsForDomain(customHost?: string) {
  const config = getDomainConfig(customHost);
  const domain = config.domainName;

  try {
    if (isServer()) {
      const data = await serverFetchWP('/wp-json/wp/v2/posts?_embed&per_page=100');
      return data ?? [];
    } else {
      // Client-side: route through /api/wp-blogs proxy
      const proxyUrl = `/api/wp-blogs?domain=${encodeURIComponent(domain)}`;
      const res = await fetch(proxyUrl);
      if (!res.ok) {
        console.error(`[fetchBlogsForDomain] Proxy returned ${res.status} for domain: ${domain}`);
        return [];
      }
      const json = await res.json();
      if (json.fallback) {
        console.warn(`[fetchBlogsForDomain] Fallback active — ${domain} was unavailable.`);
      }
      return Array.isArray(json.data) ? json.data : [];
    }
  } catch (err) {
    console.error(`[fetchBlogsForDomain] Unhandled error for ${domain}:`, err);
    return [];
  }
}

/**
 * Fetches a single WordPress post by slug.
 *
 * Server-side → 3-tier direct fetch (IP → subdomain → root)
 * Client-side → /api/wp-blogs proxy
 */
export async function fetchSingleBlogForDomain(slug: string, customHost?: string) {
  const config = getDomainConfig(customHost);
  const domain = config.domainName;
  const path   = `/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`;

  try {
    if (isServer()) {
      const posts = await serverFetchWP(path);
      if (Array.isArray(posts) && posts.length > 0) return posts[0];
      return null;
    } else {
      // Client-side: route through /api/wp-blogs proxy
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
    console.error(`[fetchSingleBlogForDomain] Error for slug '${slug}', domain ${domain}:`, err);
    return null;
  }
}
