import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import http from 'http';

/**
 * Server-side WordPress Blog Proxy
 *
 * Fetch strategy (3 tiers — first success wins):
 *   1. HTTPS to Hostinger IP (rejectUnauthorized:false) — bypasses DNS + redirect loop
 *   2. HTTP to Hostinger IP with follow-redirect to HTTPS on same IP
 *   3. https://wp.pentacloudconsulting.com (if DNS is configured)
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
 * Tier 1 — HTTPS directly to Hostinger IP.
 * rejectUnauthorized: false because SSL cert is for the domain, not IP.
 * This bypasses DNS entirely AND avoids the 301 redirect loop.
 */
function fetchHTTPS(path: string): Promise<any[] | null> {
  return new Promise((resolve) => {
    const options: https.RequestOptions = {
      hostname: WP_IP,
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'Host':        WP_HOST,
        'Accept':      'application/json',
        'User-Agent':  'Pentacloud-NextJS/1.0',
      },
      rejectUnauthorized: false, // Hostinger shared hosting SSL cert doesn't cover the IP
      timeout: 10000,
    };

    console.log(`[wp-proxy] Tier-1 HTTPS to IP: https://${WP_IP}${path}`);

    const req = https.request(options, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400) {
        console.warn(`[wp-proxy] Tier-1 redirect ${res.statusCode} — trying HTTP fallback`);
        resolve(null);
        return;
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const arr = Array.isArray(parsed) ? parsed : null;
          console.log(`[wp-proxy] Tier-1 success — ${arr?.length ?? 0} posts`);
          resolve(arr);
        } catch {
          console.warn('[wp-proxy] Tier-1 JSON parse failed');
          resolve(null);
        }
      });
    });

    req.on('error', (err) => {
      console.warn(`[wp-proxy] Tier-1 HTTPS error: ${err.message}`);
      resolve(null);
    });
    req.on('timeout', () => {
      console.warn('[wp-proxy] Tier-1 HTTPS timeout');
      req.destroy();
      resolve(null);
    });
    req.end();
  });
}

/**
 * Tier 2 — HTTP to Hostinger IP, follow any 301 redirect back to HTTPS on same IP.
 */
function fetchHTTPWithFollowRedirect(path: string): Promise<any[] | null> {
  return new Promise((resolve) => {
    const options: http.RequestOptions = {
      hostname: WP_IP,
      port: 80,
      path: path,
      method: 'GET',
      headers: {
        'Host':        WP_HOST,
        'Accept':      'application/json',
        'User-Agent':  'Pentacloud-NextJS/1.0',
      },
      timeout: 10000,
    };

    console.log(`[wp-proxy] Tier-2 HTTP to IP: http://${WP_IP}${path}`);

    const req = http.request(options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect back to HTTPS on same IP
        console.log(`[wp-proxy] Tier-2 following ${res.statusCode} to HTTPS on same IP`);
        res.resume(); // Drain response
        fetchHTTPS(path).then(resolve);
        return;
      }
      if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
        resolve(null);
        return;
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(Array.isArray(parsed) ? parsed : null);
        } catch {
          resolve(null);
        }
      });
    });

    req.on('error', (err) => {
      console.warn(`[wp-proxy] Tier-2 HTTP error: ${err.message}`);
      resolve(null);
    });
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });
    req.end();
  });
}

/**
 * Tier 3 — HTTPS via wp.pentacloudconsulting.com subdomain.
 * Works when Cloudflare DNS has wp → 82.180.142.220 (grey cloud).
 */
async function fetchSubdomain(path: string): Promise<any[] | null> {
  try {
    const url = `https://wp.pentacloudconsulting.com${path}`;
    console.log(`[wp-proxy] Tier-3 subdomain: ${url}`);
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'Pentacloud-NextJS/1.0' },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.warn(`[wp-proxy] Tier-3 subdomain returned ${res.status}`);
      return null;
    }
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch (err: any) {
    console.warn(`[wp-proxy] Tier-3 subdomain failed: ${err?.message}`);
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
    (await fetchHTTPS(path)) ??
    (await fetchHTTPWithFollowRedirect(path)) ??
    (await fetchSubdomain(path));

  if (data) {
    return NextResponse.json(
      { data, source: domain, fallback: false },
      { headers: CACHE_HEADERS }
    );
  }

  // All tiers failed
  console.error(`[wp-proxy] All fetch tiers failed for domain: ${domain}, path: ${path}`);
  return NextResponse.json(
    { error: 'WordPress API unreachable on all fallback tiers', data: [], source: domain },
    { status: 500 }
  );
}
