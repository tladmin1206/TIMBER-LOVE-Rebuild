import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE, isValidSession } from './lib/admin-auth';

/**
 * Gate every /admin page and /api/admin route behind a valid admin session,
 * except the login/logout endpoints themselves. Unauthenticated page requests
 * redirect to the login screen; API requests get a 401.
 */
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

const PUBLIC = new Set(['/admin/login', '/api/admin/login', '/api/admin/logout']);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
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
