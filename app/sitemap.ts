import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { projects } from '@/lib/content/projects';

/** All indexable routes, preserving the original WordPress trailing-slash URLs. */
const paths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/design-and-build/', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/design-and-build-questionnaire/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/estimate/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/buy-or-sell/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/sell-for-cash/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/invest/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/timber-and-love-gallery/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/the-boise-boys/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/stay-with-us/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vacation-rentals/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/the-darla-house/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/the-firehouse/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/chinamans-ocean-front-beach-house/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/timber-and-love-chalet/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/timber-love-story-boise/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/luke-caldwell-faq/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/luke-caldwell-boise-community/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/building-boise-new-show-announcement/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/boise-boys-are-back/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy-policy/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-and-conditions/', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const projectPaths = projects.map((p) => ({
    path: `/projects/${p.slug}/`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));
  return [...paths, ...projectPaths].map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
