import { assertIndexableProductionBuild, robotsHeaderRules } from './lib/robots-headers.mjs';

// Runs when Next loads this file, which is how `next build` starts. A
// deployment that inherited FORCE_NOINDEX from the shared Replit secrets
// stops here instead of publishing a noindexed site.
assertIndexableProductionBuild(process.env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // WordPress used trailing-slash URLs (e.g. /design-and-build/). Preserve them
  // exactly so existing search rankings, backlinks, and indexes stay valid.
  trailingSlash: true,
  // ADA-NS-07: Next's built-in trailing slash redirect also caught
  // /_next/image?url=..., so every optimised image cost a 308 round trip to
  // /_next/image/?url=... first. The built-in redirect is skipped and
  // middleware.ts re-implements it for page paths only (not /_next, /api, or
  // files with an extension), keeping the WordPress /path/ URLs canonical.
  skipTrailingSlashRedirect: true,
  // Local originals remain portable; responsive renditions are generated and cached by Next.
  images: {
    unoptimized: false,
  },
  /**
   * Security headers, applied to every route.
   *
   * Content-Security-Policy is deliberately NOT here. This page pulls scripts
   * from Google Tag, Meta Pixel and Clarity, frames Clarity, and loads Vimeo,
   * so a CSP written without auditing those hosts would silently break
   * analytics or video, which is worse than not having one. It is the right
   * next step, but it needs an allowlist built against real traffic and a
   * spell in Report-Only first, not a guess committed on a Friday.
   *
   * Permissions-Policy denies camera, microphone and geolocation because
   * nothing on the site asks for them (verified: no getUserMedia, no
   * navigator.geolocation). Revisit if that changes.
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Two years, subdomains included, preload-eligible. Only ever sent
          // over HTTPS, so it is inert on local http://localhost.
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Stop the browser guessing a type that differs from what we served.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Nothing here is meant to be embedded, so refuse framing by others.
          // This governs who may frame US; it does not affect the Vimeo and
          // Clarity iframes this site embeds.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Build-time image renditions (scripts/build-images.mjs). Static
        // files, safe to cache: a changed photograph gets a new rendition on
        // the next build, and a month bounds how long an old one can linger.
        source: '/_r/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
      // ADA-NS-08: noindex every host that is not production (the replit.app
      // preview, localhost, any other deploy). Keyed on the Host header so
      // timberandlove.com and www.timberandlove.com stay indexable.
      // FORCE_NOINDEX=1 noindexes every host for a staging name, and
      // lib/robots-headers.mjs refuses the build when that flag is combined
      // with REPLIT_DEPLOYMENT=1.
      ...robotsHeaderRules(process.env),
      {
        // Admin only. This MUST stay scoped to /admin: on `/:path*` it would
        // deindex the entire site, which is the opposite of what the rest of
        // this config spends its effort protecting.
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },

  async redirects() {
    return [
      // Temporarily retire both planner entry points, including old bookmarks.
      { source: '/investment-planner', destination: '/design-and-build-questionnaire/', permanent: false },
      { source: '/estimate', destination: '/design-and-build-questionnaire/', permanent: false },
      // Legacy WordPress category archives (404 on the rebuild). statusCode
      // 301, not permanent: true, so they match the middleware 301s.
      { source: '/category/boise-boys', destination: '/the-boise-boys/', statusCode: 301 },
      { source: '/category/uncategorized', destination: '/journal/', statusCode: 301 },
      // Pre-WordPress URL still in Google's index.
      { source: '/design-build', destination: '/design-and-build/', statusCode: 301 },
      // The Kualoa rental moved to a slug that matches its name.
      { source: '/chinamans-ocean-front-beach-house', destination: '/kualoa-beach-house/', statusCode: 301 },
      // Old Rank Math sitemaps, still submitted in Search Console.
      ...['sitemap_index', 'page-sitemap', 'post-sitemap', 'category-sitemap', 'elementskit_template-sitemap'].map((name) => ({
        source: `/${name}.xml`,
        destination: '/sitemap.xml',
        statusCode: 301,
      })),
      // Both legacy terms URLs (/terms-conditons and /terms-conditions) are
      // 301s in middleware.ts. They are not here because `permanent: true`
      // emits 308, which would disagree with each other.
    ];
  },
};

export default nextConfig;

