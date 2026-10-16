import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE, isValidSession } from './lib/admin-auth';

/**
 * Admin session gate, plus the 301 from the misspelled /terms-conditons URL.
 * Unauthenticated admin page requests redirect to the login screen; admin API
 * requests get a 401. Login and logout stay public.
 */
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/terms-conditons', '/terms-conditons/'],
};

const PUBLIC = new Set(['/admin/login', '/api/admin/login', '/api/admin/logout']);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 301 the misspelled terms URL (with or without a trailing slash) to the
  // canonical page. next.config permanent redirects are 308, so this lives here.
  if (pathname === '/terms-conditons' || pathname === '/terms-conditons/') {
    const url = req.nextUrl.clone();
    url.pathname = '/terms-and-conditions/';
    return NextResponse.redirect(url, 301);
  }

  if (PUBLIC.has(pathname)) return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (await isValidSession(token)) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized. Sign in at /admin/login.' }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = '/admin/login';
  url.search = `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}
