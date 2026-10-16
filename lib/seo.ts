import type { Metadata } from 'next';
import { site } from './site';

// Default share image: the light Timber and Love wordmark on the brand dark
// background, generated at 1200x630 by app/og/route.tsx.
const DEFAULT_OG = '/og/';

/**
 * Build per-page metadata with canonical + OG/Twitter, preserving live values.
 * The canonical is the absolute clean path. Tracking parameters on the request
 * are not part of this URL, so `?utm_*` and similar queries point here.
 */
export function pageMeta(opts: {
  title: string;
  description?: string;
  path: string; // e.g. "/design-and-build/"
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  /** Skip the root "%s - Timber and Love" title template. */
  absoluteTitle?: boolean;
}): Metadata {
  const { title, description, path, image = DEFAULT_OG, type = 'website', noindex, absoluteTitle } = opts;
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
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
