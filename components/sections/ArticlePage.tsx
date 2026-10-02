import { journalPosts } from '@/lib/content/journal';
import Link from 'next/link';
import BlockRenderer, { type Block } from '@/components/ui/BlockRenderer';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import TrustBar from '@/components/sections/TrustBar';

export type Article = {
  title: string;
  slug: string;
  date?: string;
  heroImage?: string;
  blocks: Block[];
};

export default function ArticlePage({ article, path }: { article: Article; path: string }) {
  const heroImage = journalPosts.find(post => post.href === path)?.image ?? article.heroImage;
  const dateStr = article.date
    ? new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: heroImage ? `${site.url}${heroImage}` : undefined,
    datePublished: article.date || undefined,
    author: { '@id': `${site.url}/#organization` },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}${path}`,
  };

  return (
    <>
      <JsonLd schema={jsonLd} />

      <header className="section-paper pb-14 pt-32 sm:pb-20 sm:pt-40">
        <div className="container-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div><Link href="/journal/" className="eyebrow link-underline">Timber and Love Journal</Link>
            <h1 className="h-section mt-5">{article.title}</h1>
            {dateStr && <p className="mt-5 text-xs uppercase tracking-[.14em] text-text-muted">{dateStr}</p>}
          </div>
          {heroImage && <div>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={heroImage} alt="" className="mx-auto h-auto max-h-[36rem] w-full object-contain" /></div>}
        </div>
      </header>

      <TrustBar />

      {/* Body */}
      <article className="section-paper section-tight">
        <div className="container-tl max-w-3xl">
          <BlockRenderer blocks={article.blocks} />
          <div className="mt-14 border-t border-border-subtle pt-10">
            <Link href="/timber-and-love-gallery/" className="btn-secondary">Explore Our Work</Link>
          </div>
        </div>
      </article>

      <ClosingCta {...closingCta.article} />
    </>
  );
}
