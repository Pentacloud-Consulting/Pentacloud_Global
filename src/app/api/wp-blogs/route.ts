import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side WordPress Blog Proxy
 * Fetches posts from either pentacloud.in or pentacloudconsulting.com
 * bypassing CORS restrictions that block direct browser requests.
 *
 * Usage:
 *   GET /api/wp-blogs?domain=pentacloud.in              → all posts (up to 100)
 *   GET /api/wp-blogs?domain=pentacloudconsulting.com   → all posts (up to 100)
 *   GET /api/wp-blogs?domain=pentacloud.in&slug=my-post → single post by slug
 */

const ALLOWED_DOMAINS: Record<string, string> = {
  'pentacloud.in': 'https://pentacloud.in',
  'pentacloudconsulting.com': 'https://pentacloudconsulting.com',
};

const FALLBACK_BASE = 'https://pentacloud.in';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain') || 'pentacloud.in';
  const slug = searchParams.get('slug');

  // Resolve base URL — only allow whitelisted domains
  const baseUrl = ALLOWED_DOMAINS[domain] || FALLBACK_BASE;

  let wpUrl: string;
  if (slug) {
    wpUrl = `${baseUrl}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`;
  } else {
    wpUrl = `${baseUrl}/wp-json/wp/v2/posts?_embed&per_page=100`;
  }

  try {
    const res = await fetch(wpUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Pentacloud-NextJS/1.0',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      // If primary domain fails and it's not already the fallback, try pentacloud.in
      if (baseUrl !== FALLBACK_BASE) {
        const fallbackUrl = slug
          ? `${FALLBACK_BASE}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`
          : `${FALLBACK_BASE}/wp-json/wp/v2/posts?_embed&per_page=100`;

        const fallbackRes = await fetch(fallbackUrl, {
          headers: { 'Accept': 'application/json', 'User-Agent': 'Pentacloud-NextJS/1.0' },
          next: { revalidate: 60 },
        });

        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          return NextResponse.json(
            { data: fallbackData, source: 'pentacloud.in', fallback: true },
            {
              headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
                'Access-Control-Allow-Origin': '*',
              }
            }
          );
        }
      }

      return NextResponse.json(
        { error: `WordPress API returned ${res.status}`, data: [], source: domain },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(
      { data, source: domain, fallback: false },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  } catch (err: any) {
    console.error(`[wp-blogs proxy] Error fetching from ${baseUrl}:`, err?.message || err);

    // Network error fallback
    if (baseUrl !== FALLBACK_BASE) {
      try {
        const fallbackUrl = slug
          ? `${FALLBACK_BASE}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`
          : `${FALLBACK_BASE}/wp-json/wp/v2/posts?_embed&per_page=100`;

        const fallbackRes = await fetch(fallbackUrl, {
          headers: { 'Accept': 'application/json', 'User-Agent': 'Pentacloud-NextJS/1.0' },
          next: { revalidate: 60 },
        });

        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          return NextResponse.json(
            { data: fallbackData, source: 'pentacloud.in', fallback: true }
          );
        }
      } catch {
        // ignore
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch blogs', data: [], source: domain },
      { status: 500 }
    );
  }
}
