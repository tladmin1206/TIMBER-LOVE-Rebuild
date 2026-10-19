import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE, isValidSession } from './lib/admin-auth';

/**
 * Admin session gate, plus the 301s from the legacy terms URLs.
 * Unauthenticated admin page requests redirect to the login screen; admin API
 * requests get a 401. Login and logout stay public.
 */
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/terms-conditons',
    '/terms-conditons/',
    '/terms-conditions',
    '/terms-conditions/',
  ],
};

const PUBLIC = new Set(['/admin/login', '/api/admin/login', '/api/admin/logout']);

/**
 * Legacy terms URLs: the misspelled one, and the one missing "and". Both
 * redirect to the canonical page, and both do it from here rather than from
 * next.config `redirects()`, because `permanent: true` there emits 308 and
 * these need to agree. Two near-identical legacy URLs answering with different
 * status codes is the kind of detail that makes an audit distrust the rest of
 * the redirect map.
 *
 * Listed with and without the trailing slash: `trailingSlash: true` normalises
 * eventually, but the matcher has to name the exact paths either way.
 */
const LEGACY_TERMS = new Set([
  '/terms-conditons',
  '/terms-conditons/',
  '/terms-conditions',
  '/terms-conditions/',
]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 301 every legacy terms URL to the canonical page. Cloning the URL keeps any
  // query string on the request.
  if (LEGACY_TERMS.has(pathname)) {
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
