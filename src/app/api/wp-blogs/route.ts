import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side WordPress Blog Proxy
 *
 * Fetch strategy (3 tiers — first success wins):
 *   1. Direct IP (http://82.180.142.220) + Host header  ← always works, bypasses DNS
 *   2. https://wp.pentacloudconsulting.com              ← works after subdomain is configured in Hostinger
 *   3. https://pentacloudconsulting.com                 ← last resort
 *
 * Usage:
 *   GET /api/wp-blogs?domain=pentacloud.in              → all posts (up to 100)
 *   GET /api/wp-blogs?domain=pentacloudconsulting.com   → all posts (up to 100)
 *   GET /api/wp-blogs?domain=pentacloud.in&slug=my-post → single post by slug
 */

// Hostinger shared hosting IP — WordPress lives here permanently
const WP_IP   = process.env.WP_HOSTINGER_IP   || '82.180.142.220';
const WP_HOST = process.env.WP_HOSTINGER_HOST  || 'pentacloudconsulting.com';

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
  'Access-Control-Allow-Origin': '*',
};

/** Build the WP REST API path for posts (all or single slug) */
function wpPath(slug?: string | null): string {
  return slug
    ? `/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`
    : `/wp-json/wp/v2/posts?_embed&per_page=100`;
}

/**
 * Tier 1 — Direct IP fetch with Host header.
 * Bypasses DNS completely; works even if wp subdomain is not yet configured on Hostinger.
 * Uses plain HTTP because HTTPS to an IP without a matching cert fails.
 */
async function fetchDirectIP(path: string): Promise<any[] | null> {
  try {
    const url = `http://${WP_IP}${path}`;
    console.log(`[wp-proxy] Tier-1 direct IP: ${url}`);
    const res = await fetch(url, {
      headers: {
        'Accept':     'application/json',
        'User-Agent': 'Pentacloud-NextJS/1.0',
        'Host':       WP_HOST,
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.warn(`[wp-proxy] Tier-1 IP returned ${res.status}`);
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch (err: any) {
    console.warn(`[wp-proxy] Tier-1 IP failed: ${err?.message}`);
    return null;
  }
}

/**
 * Tier 2 — HTTPS via wp.pentacloudconsulting.com subdomain.
 * Works after the subdomain is properly configured in Hostinger hosting panel.
 */
async function fetchSubdomain(path: string): Promise<any[] | null> {
  try {
    const url = `https://wp.pentacloudconsulting.com${path}`;
    console.log(`[wp-proxy] Tier-2 subdomain: ${url}`);
    const res = await fetch(url, {
      headers: {
        'Accept':     'application/json',
        'User-Agent': 'Pentacloud-NextJS/1.0',
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.warn(`[wp-proxy] Tier-2 subdomain returned ${res.status}`);
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch (err: any) {
    console.warn(`[wp-proxy] Tier-2 subdomain failed: ${err?.message}`);
    return null;
  }
}

/**
 * Tier 3 — HTTPS via root pentacloudconsulting.com.
 * Works when the @ A record still points to Hostinger (before VPS migration).
 */
async function fetchRootDomain(path: string): Promise<any[] | null> {
  try {
    const url = `https://pentacloudconsulting.com${path}`;
    console.log(`[wp-proxy] Tier-3 root domain: ${url}`);
    const res = await fetch(url, {
      headers: {
        'Accept':     'application/json',
        'User-Agent': 'Pentacloud-NextJS/1.0',
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.warn(`[wp-proxy] Tier-3 root returned ${res.status}`);
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch (err: any) {
    console.warn(`[wp-proxy] Tier-3 root failed: ${err?.message}`);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain') || 'pentacloudconsulting.com';
  const slug   = searchParams.get('slug');

  const path = wpPath(slug);

  // ── Run all 3 tiers in order; stop at first success ─────────────
  const data =
    (await fetchDirectIP(path)) ??
    (await fetchSubdomain(path)) ??
    (await fetchRootDomain(path));

  if (data) {
    return NextResponse.json(
      { data, source: domain, fallback: false },
      { headers: CACHE_HEADERS }
    );
  }

  // All tiers failed
  console.error(`[wp-proxy] All 3 fetch tiers failed for domain: ${domain}, path: ${path}`);
  return NextResponse.json(
    { error: 'WordPress API unreachable on all fallback tiers', data: [], source: domain },
    { status: 500 }
  );
}
