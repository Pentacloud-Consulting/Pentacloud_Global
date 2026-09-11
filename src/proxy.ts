import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function proxy(request: NextRequest) {
  // If Supabase is not configured yet, skip all dashboard/redirect logic
  // so the public site continues to work during initial setup.
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const url = request.nextUrl.clone()
    
    // Check mock cookie
    const hasMockAuth = request.cookies.get('dashboard_mock_auth')?.value === '1';

    // Still block dashboard pages (except login) so they don't render broken
    if (
      !hasMockAuth &&
      url.pathname.startsWith('/dashboard') &&
      !url.pathname.startsWith('/dashboard/login')
    ) {
      url.pathname = '/dashboard/login'
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const url = request.nextUrl.clone()

  // 1. Dashboard Auth Check
  if (url.pathname.startsWith('/dashboard') && !url.pathname.startsWith('/dashboard/login')) {
    const hasMockAuth = request.cookies.get('dashboard_mock_auth')?.value === '1'
    if (!session && !hasMockAuth) {
      url.pathname = '/dashboard/login'
      return NextResponse.redirect(url)
    }
  }

  // 2. Redirects Check (skip for Next.js internals, dashboard, and API routes)
  if (
    !url.pathname.startsWith('/_next') &&
    !url.pathname.startsWith('/dashboard') &&
    !url.pathname.startsWith('/api')
  ) {
    try {
      const { data: redirectRules } = await supabase
        .from('redirects')
        .select('old_url, new_url, type')

      if (redirectRules) {
        const match = redirectRules.find(
          (r) => r.old_url === url.pathname || r.old_url === url.pathname + '/'
        )
        if (match) {
          url.pathname = match.new_url
          return NextResponse.redirect(url, { status: match.type === 301 ? 301 : 302 })
        }
      }
    } catch {
      // Table doesn't exist or query failed, ignore redirect check
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
