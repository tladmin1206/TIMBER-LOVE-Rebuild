import Link from 'next/link';
import BlockRenderer, { type Block } from '@/components/ui/BlockRenderer';
import BeginJourneyCta from '@/components/sections/BeginJourneyCta';
import JsonLd from '@/components/JsonLd';
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
    author: { '@id': `${site.url}/#organization` },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}${path}`,
  };

  return (
    <>
      <JsonLd schema={jsonLd} />

      {/* Hero */}
      <header className="relative isolate flex min-h-[52vh] items-end overflow-hidden bg-bg-primary pb-12 pt-36">
        {article.heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.heroImage} alt="" aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/50" />
        <div className="container-tl max-w-3xl">
          <Link href="/journal/" className="eyebrow link-underline">Timber and Love Journal</Link>
          <h1 className="h-display mt-4 text-3xl text-cream sm:text-5xl">{article.title}</h1>
          {dateStr && <p className="mt-4 text-sm uppercase tracking-[0.16em] text-text-muted">{dateStr}</p>}
        </div>
      </header>

      {/* Body */}
      <article className="bg-bg-primary py-16 sm:py-20">
        <div className="container-tl max-w-3xl">
          <BlockRenderer blocks={article.blocks} />
          <div className="mt-14 border-t border-border-subtle pt-10">
            <Link href="/timber-and-love-gallery/" className="btn-secondary">Explore Our Work</Link>
          </div>
        </div>
      </article>

      <BeginJourneyCta />
    </>
  );
}
