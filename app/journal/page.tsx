import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/JsonLd';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { journalPosts } from '@/lib/content/journal';
import EditorialSplit from '@/components/sections/EditorialSplit';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import TrustBar from '@/components/sections/TrustBar';

export const metadata = pageMeta({
  title: 'Journal',
  description:
    'News, stories, and insights from Timber and Love, the Boise design-build and real estate team behind HGTV’s Boise Boys.',
  path: '/journal/',
});

function fmt(date: string) {
  // Parse as a plain date to avoid timezone drift.
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Page() {
  const [featured, ...rest] = journalPosts;
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Journal', path: '/journal/' },
        ])}
      />

      <PageHero
        eyebrow="Journal"
        title="Stories From Timber and Love"
        subtitle="News, design thinking, and the story behind the Boise team building homes on and off screen."
        image="/editorial/collected-details.webp"
        height="short"
      />

      <TrustBar />

      <section className="bg-bg-primary section">
        <div className="container-wide">
          {/* Featured (latest) post */}
          {featured && (
            <Reveal>
              <Link href={featured.href} className="group card-interactive grid overflow-hidden md:grid-cols-2" data-track="journal_featured">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface md:aspect-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featured.image} alt={featured.title} loading="lazy" className="h-full w-full object-contain" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.16em] text-accent">
                    <span>{featured.tag}</span>
                    <span className="text-text-muted">·</span>
                    <span className="text-text-muted">{fmt(featured.date)}</span>
                  </div>
                  <h2 className="h-card mt-4">{featured.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cream">
                    Read the Story
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Rest of the posts */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.href} delay={i * 70}>
                <Link href={p.href} className="group card-interactive flex h-full flex-col overflow-hidden" data-track="journal_post">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs uppercase tracking-[0.14em] text-accent">
                      <span>{p.tag}</span>
                      <span className="text-text-muted">·</span>
                      <span className="text-text-muted">{fmt(p.date)}</span>
                    </div>
                    <h3 className="h-card-sm mt-3 leading-snug">{p.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{p.excerpt}</p>
                    <span className="mt-4 text-xs uppercase tracking-[0.14em] text-cream link-underline">Read More</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EditorialSplit
        image="/projects/promise-ln-5120/5120-promise-ln-living-green-panel.jpg"
        imageAlt="Living room with green paneled millwork in a modern farmhouse custom home by Timber and Love"
        eyebrow="Design Notes"
        title="Details Worth Writing About"
        cta="See Our Work"
        href="/timber-and-love-gallery/"
        tone="secondary"
        ratio="landscape"
      >
        <p>
          The stories we tell here start in rooms like this one, where a run of green paneling becomes the
          quiet backbone of a whole living space.
        </p>
        <p>
          Our journal is a look behind those decisions: the material studies, the on-set moments, and the ideas
          that carry from one home to the next.
        </p>
      </EditorialSplit>

      <ClosingCta {...closingCta.journal} />
    </>
  );
}
