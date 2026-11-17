import SiteImage from '@/components/ui/SiteImage';
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

  const showArticle = ['/boise-boys-are-back/', '/building-boise-new-show-announcement/'].includes(path);
  const headings = article.blocks.flatMap((b, i) => b.type === 'h2' || b.type === 'h3' ? [{ text: b.text, id: `article-section-${i}` }] : []);

  return (
    <>
      <JsonLd schema={jsonLd} />

      <header className="section-tonal pb-14 pt-32 sm:pb-20 sm:pt-40">
        <div className="container-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div><Link href="/journal/" className="eyebrow inline-flex min-h-11 items-center underline-offset-4 hover:underline">Timber + Love Journal</Link>
            <h1 className="h-section mt-5">{article.title}</h1>
            {dateStr && <p className="mt-5 text-xs uppercase tracking-[.14em] text-text-muted">{dateStr}</p>}
          </div>
          {heroImage && <div>{/* eslint-disable-next-line @next/next/no-img-element */}<SiteImage sizes="(min-width: 1024px) 50vw, 100vw" src={heroImage} alt="" className="mx-auto h-auto max-h-[36rem] w-full object-contain" /></div>}
        </div>
      </header>

      <TrustBar />

      {/* Body */}
      <article className="section-tonal section-tight">
        <div className="container-tl max-w-3xl">
          {showArticle && <aside className="mb-10 border-l-2 border-cream/60 bg-bg-primary p-6"><p className="eyebrow">Update · October 5, 2026</p><h2 className="h-card-sm mt-3">Watch Luke and Clint Now</h2><p className="mt-4 text-sm leading-relaxed text-text-secondary">This announcement is part of our story. The independent show is now called Luke and Clint and is available on YouTube.</p><Link href="/shows/#episodes" className="link-underline mt-4 inline-flex min-h-11 items-center text-sm">Watch the Current Show →</Link></aside>}
          {path === '/luke-caldwell-faq/' && <nav aria-label="In this article" className="mb-10 border border-border-subtle p-6"><p className="eyebrow">Find an Answer</p><ul className="mt-4 space-y-2">{headings.map(h => <li key={h.id}><a href={`#${h.id}`} className="link-underline inline-flex min-h-11 items-center text-sm">{h.text}</a></li>)}</ul><Link href="/shows/" className="link-underline mt-4 inline-flex min-h-11 items-center text-sm">Discover Luke and Clint and the HGTV Shows →</Link></nav>}
          <BlockRenderer blocks={article.blocks} />
          <div className="mt-14 border-t border-border-subtle pt-10">
            <p className="eyebrow">Continue the Story</p><div className="cta-row mt-5"><Link href="/timber-and-love-gallery/" className="btn-secondary">Explore Our Work</Link><Link href={showArticle ? '/shows/' : path.includes('community') ? '/about/' : '/design-and-build/'} className="btn-secondary">{showArticle ? 'Watch the Shows' : path.includes('community') ? 'Meet Timber + Love' : 'Explore Design + Build'}</Link></div>
          </div>
        </div>
      </article>

      <ClosingCta {...(showArticle ? { surface: 'solid' as const, eyebrow: 'The Story Continues', title: 'Watch Luke and Clint', body: 'Catch up with the independent show, or revisit the complete Boise Boys and Outgrown collection.', primary: { label: 'Watch the Shows', href: '/shows/' }, secondary: { label: 'Explore the Homes', href: '/timber-and-love-gallery/' } } : closingCta.article)} />
    </>
  );
}
