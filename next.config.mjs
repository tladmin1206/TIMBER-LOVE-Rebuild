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
};

export default nextConfig;
