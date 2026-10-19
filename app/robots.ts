import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /admin is gated by middleware, so this is not what protects it. It
        // keeps the login page out of search results, which is the part a
        // session cookie cannot do.
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
