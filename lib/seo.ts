import type { Metadata } from 'next';
import { site } from './site';

const DEFAULT_OG = '/wp-content/uploads/2024/04/Timber-and-Love-Design-Build-Premier-Home-Remodeling-Contractors-in-Boise-1.jpg';

/** Build per-page metadata with canonical + OG/Twitter, preserving live values. */
export function pageMeta(opts: {
  title: string;
  description?: string;
  path: string; // e.g. "/design-and-build/"
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}): Metadata {
  const { title, description, path, image = DEFAULT_OG, type = 'website', noindex } = opts;
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
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
