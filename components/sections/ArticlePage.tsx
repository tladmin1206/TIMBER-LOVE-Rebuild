import Link from 'next/link';
import BlockRenderer, { type Block } from '@/components/ui/BlockRenderer';
import BeginJourneyCta from '@/components/sections/BeginJourneyCta';
import { site } from '@/lib/site';

export type Article = {
  title: string;
  slug: string;
  date?: string;
  heroImage?: string;
  blocks: Block[];
};

export default function ArticlePage({ article, path }: { article: Article; path: string }) {
  const dateStr = article.date
    ? new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: article.heroImage ? `${site.url}${article.heroImage}` : undefined,
    datePublished: article.date || undefined,
    author: { '@type': 'Organization', name: site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}/wp-content/uploads/2024/03/Timber-And-Love-Logo-White-1-Premier-Home-Remodeling-And-Design-Company-In-Boise-HGTVs-Boise-Boys.png`,
      },
    },
    mainEntityOfPage: `${site.url}${path}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <header className="relative isolate flex min-h-[52vh] items-end overflow-hidden bg-ink pb-12 pt-36">
        {article.heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.heroImage} alt="" aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/50" />
        <div className="container-tl max-w-3xl">
          <Link href="/" className="eyebrow link-underline">Timber and Love Journal</Link>
          <h1 className="h-display mt-4 text-3xl text-cream sm:text-5xl">{article.title}</h1>
          {dateStr && <p className="mt-4 text-sm uppercase tracking-[0.16em] text-cream/60">{dateStr}</p>}
        </div>
      </header>

      {/* Body */}
      <article className="bg-ink py-16 sm:py-20">
        <div className="container-tl max-w-3xl">
          <BlockRenderer blocks={article.blocks} />
          <div className="mt-14 border-t border-cream/10 pt-10">
            <Link href="/the-boise-boys/" className="btn-outline">Explore Our Work</Link>
          </div>
        </div>
      </article>

      <BeginJourneyCta />
    </>
  );
}
