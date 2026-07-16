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
      // Common legacy/typo aliases kept for SEO safety.
      { source: '/terms-conditions', destination: '/terms-conditons/', permanent: true },
      { source: '/contact', destination: '/#connect', permanent: false },
    ];
  },
};

export default nextConfig;
