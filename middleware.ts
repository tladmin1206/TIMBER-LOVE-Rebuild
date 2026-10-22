import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE, isValidSession } from './lib/admin-auth';

/**
 * Admin session gate, plus the 301s from the legacy terms URLs.
 * Unauthenticated admin page requests redirect to the login screen; admin API
 * requests get a 401. Login and logout stay public.
 */
export const config = {
  // Every path except Next internals, API routes other than admin, and files
  // with an extension. Page paths need to pass through for the trailing slash
  // redirect below (next.config skipTrailingSlashRedirect, ADA-NS-07).
  matcher: ['/api/admin/:path*', '/((?!_next/|api/|.*\\.[^/]+$).*)'],
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
    const url = new URL(req.url);
    url.pathname = '/terms-and-conditions/';
    return NextResponse.redirect(url, 301);
  }

  // Trailing slash for page paths, replacing Next's built-in redirect (308, as
  // before). API routes are never redirected.
  const isApi = pathname.startsWith('/api/');
  if (!isApi && !pathname.endsWith('/')) {
    // A plain URL, not nextUrl.clone(): with skipTrailingSlashRedirect the
    // NextURL formatter drops the trailing slash again, which loops.
    const url = new URL(req.url);
    url.pathname = `${pathname}/`;
    return NextResponse.redirect(url, 308);
  }
  const isAdmin = pathname.startsWith('/admin/') || pathname.startsWith('/api/admin/');
  if (!isAdmin) return NextResponse.next();

  const bare = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  if (PUBLIC.has(bare)) return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (await isValidSession(token)) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized. Sign in at /admin/login.' }, { status: 401 });
  }
  const url = new URL(req.url);
  url.pathname = '/admin/login/';
  url.search = `?next=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(url);
}
