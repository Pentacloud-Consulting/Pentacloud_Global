import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const response = NextResponse.json({ success: true });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.headers.get('cookie')?.match(new RegExp(`(^| )${name}=([^;]+)`))?.[2];
          },
          set(name: string, value: string, options: CookieOptions) {
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.set({ name, value: '', ...options });
          },
        },
      }
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Fallback check for default admin credentials (.me or .in)
      const cleanEmail = email.trim().toLowerCase();
      if ((cleanEmail === 'arshad@adminpentacloud.me' || cleanEmail === 'arshad@adminpentacloud.in') && password === 'Arshad@khan') {
        response.cookies.set('sb-access-token', 'mock-token', { path: '/' });
        return response;
      }
      return NextResponse.json({ success: false, error: error.message }, { status: 401 });
    }

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
