import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// AI search and assistant crawlers, named so a future change to the `*` rule
// can never shut them out by accident. Remove one only on an owner decision.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-Web',
  'PerplexityBot',
  'Google-Extended',
  'CCBot',
];

// /admin is gated by middleware, so this is not what protects it. It keeps the
// login page out of search results, which is the part a session cookie cannot do.
const DISALLOW = ['/api/', '/admin/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
