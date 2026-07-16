/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // WordPress used trailing-slash URLs (e.g. /design-and-build/). Preserve them
  // exactly so existing search rankings, backlinks, and indexes stay valid.
  trailingSlash: true,
  // Serve the self-hosted /wp-content/uploads images directly without the
  // Next image-optimization server — keeps Replit deploys simple and robust.
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // The canonical route is now the correctly-spelled /terms-and-conditions/.
      // Redirect the old misspelled URL and any variants to it (permanent).
      { source: '/terms-conditons', destination: '/terms-and-conditions/', permanent: true },
      { source: '/terms-conditions', destination: '/terms-and-conditions/', permanent: true },
    ];
  },
  // The site references its media at root-relative /wp-content/... paths. Those
  // assets live on the original WordPress origin (and are publicly served), so
  // proxy them through until they are moved to a dedicated media host/CDN. Set
  // ASSET_ORIGIN to a CDN URL later; leave it unset to use the live domain.
  // NOTE: once this app is served FROM timberandlove.com, point ASSET_ORIGIN at
  // a separate media host (e.g. cdn.timberandlove.com) so it does not loop.
  async rewrites() {
    const assetOrigin = process.env.ASSET_ORIGIN || 'https://timberandlove.com';
    return [
      { source: '/wp-content/:path*', destination: `${assetOrigin}/wp-content/:path*` },
    ];
  },
};

export default nextConfig;
