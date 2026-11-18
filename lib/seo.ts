import type { Metadata } from 'next';
import { site } from './site';

import { ogCardFor, ogImagePath } from './og-cards';

/**
 * Build per-page metadata with canonical + OG/Twitter, preserving live values.
 * The canonical is the absolute clean path. Tracking parameters on the request
 * are not part of this URL, so `?utm_*` and similar queries point here.
 */
export function pageMeta(opts: {
  title: string;
  description?: string;
  path: string; // e.g. "/design-and-build/"
  type?: 'website' | 'article';
  noindex?: boolean;
  /** Skip the root "%s - Timber and Love" title template. */
  absoluteTitle?: boolean;
}): Metadata {
  const { title, description, path, type = 'website', noindex, absoluteTitle } = opts;
  // Every page shares its own 1200x630 card: see lib/og-cards.ts for what it
  // shows and app/og/[[...slug]]/route.tsx for how it is drawn.
  const image = ogImagePath(path);
  const card = ogCardFor(path);
  const alt = `${card.title}: ${card.eyebrow}`;
  const url = `${site.url}${path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      images: [{ url: image, width: 1200, height: 630, alt, type: 'image/jpeg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: image, alt }],
    },
  };
}
