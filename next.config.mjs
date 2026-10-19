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
      // Both legacy terms URLs (/terms-conditons and /terms-conditions) are
      // 301s in middleware.ts. They are not here because `permanent: true`
      // emits 308, which would disagree with each other.
    ];
  },
};

export default nextConfig;
