import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/JsonLd';
import { pageMeta } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { journalPosts } from '@/lib/content/journal';

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

      <section className="bg-bg-primary py-16 sm:py-24">
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
                  <h2 className="h-display mt-4 text-2xl sm:text-3xl">{featured.title}</h2>
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
                    <h3 className="h-display mt-3 text-lg leading-snug">{p.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{p.excerpt}</p>
                    <span className="mt-4 text-xs uppercase tracking-[0.14em] text-cream link-underline">Read More</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border-subtle bg-bg-secondary py-20 text-center sm:py-24">
        <div className="container-wide max-w-2xl">
          <Reveal>
            <p className="eyebrow">Work With Us</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Have a Project in Mind?</h2>
            <p className="text-lead mt-4">From a single room to a custom home, our team can help you plan the next step.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Cta href="/design-and-build-questionnaire/" variant="primary">Start Your Project</Cta>
              <Cta href="/timber-and-love-gallery/" variant="secondary">See Our Work</Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
