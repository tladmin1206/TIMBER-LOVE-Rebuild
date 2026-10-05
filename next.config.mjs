/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // WordPress used trailing-slash URLs (e.g. /design-and-build/). Preserve them
  // exactly so existing search rankings, backlinks, and indexes stay valid.
  trailingSlash: true,
  // Local originals remain portable; responsive renditions are generated and cached by Next.
  images: {
    unoptimized: false,
  },
  async redirects() {
    return [
      // Temporarily retire both planner entry points, including old bookmarks.
      { source: '/investment-planner', destination: '/design-and-build-questionnaire/', permanent: false },
      { source: '/estimate', destination: '/design-and-build-questionnaire/', permanent: false },
      // The canonical route is now the correctly-spelled /terms-and-conditions/.
      // Redirect the old misspelled URL and any variants to it (permanent).
      { source: '/terms-conditons', destination: '/terms-and-conditions/', permanent: true },
      { source: '/terms-conditions', destination: '/terms-and-conditions/', permanent: true },
    ];
  },
};

export default nextConfig;
