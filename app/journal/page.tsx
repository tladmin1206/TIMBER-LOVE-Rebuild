import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/JsonLd';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { journalPosts } from '@/lib/content/journal';
import FeatureBand from '@/components/sections/FeatureBand';
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
        image={featured?.image}
        height="short"
      />

      <TrustBar />

      <section className="bg-bg-primary section">
        <div className="container-wide">
          {/* Featured (latest) post */}
          {featured && (
            <Reveal>
              <Link href={featured.href} className="group card-interactive grid overflow-hidden md:grid-cols-2" data-track="journal_featured">
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featured.image} alt={featured.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-accent">
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
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-accent">
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

      <FeatureBand
        image="/wp-content/uploads/2024/03/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Living-Room-scaled.jpg"
        eyebrow="Notes From the Studio"
        title="Where Our Ideas Take Shape"
        body="Behind every story is a home we designed and built here in the Treasure Valley."
        cta="Plan Your Project"
        href="/investment-planner/"
        align="left"
        height="short"
      />

      <ClosingCta {...closingCta.journal} />
    </>
  );
}
