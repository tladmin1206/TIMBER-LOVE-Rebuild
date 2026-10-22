import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import Gallery from '@/components/ui/Gallery';
import Reveal from '@/components/ui/Reveal';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import EditorialSplit from '@/components/sections/EditorialSplit';
import Cta from '@/components/ui/Cta';
import { fanComments } from '@/lib/content/home';
import { projects } from '@/lib/content/projects';
import { pageMeta } from '@/lib/seo';
import data from '@/content/the-boise-boys.json';
import TrustBar from '@/components/sections/TrustBar';

export const metadata = pageMeta({
  title: 'HGTV: The Boise Boys',
  description:
    "Timber + Love's work has been documented across HGTV's Boise Boys and Outgrown. Watch the transformations and see how that experience informs our work today.",
  path: '/the-boise-boys/',
});

const intro = (data.sections as any[])[0]?.paragraphs?.[0] || '';
const images = [
  { src: '/editorial/firehouse-landing.webp', alt: 'A bright stair landing at The Firehouse, a Boise Boys renovation' },
  { src: '/editorial/firehouse-entry.webp', alt: 'Collected textures and an entry bench at The Firehouse' },
  { src: '/editorial/firehouse-kitchen.webp', alt: 'The Firehouse kitchen with black cabinetry and warm wood' },
];
// Only the HGTV-featured homes belong on the show page. The custom homes now
// live in the same `projects` list but are not television projects.
const tvProjects = projects.filter((p) => p.tags.includes('hgtv'));

export default function Page() {
  return (
    <>
      <PageHero eyebrow="As Seen on HGTV" title="The Boise Boys" subtitle={intro} image={data.hero.image}>
        <Link href="/shows/#boise-boys-episodes" className="btn-primary">Browse Boise Boys Episodes</Link>
        <Link href="/shows/#outgrown-episodes" className="btn-secondary">Browse Outgrown Episodes</Link>
      </PageHero>

      <TrustBar />

      {/* The story */}
      <section className="bg-bg-primary section">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">The Story</p>
            <h2 className="h-section mt-4">Boise Homes, on National Television</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead">
              Led by Luke Caldwell, Timber + Love has restored and reimagined Boise homes across multiple seasons of
              HGTV&apos;s Boise Boys and the family-focused series Outgrown. The same hands-on, design-forward approach
              you see on screen is how we work with clients today.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured television projects: link to full case studies */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">Featured Television Projects</p>
            <h2 className="h-section mt-4">From the Show</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {tvProjects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}/`} className="group card-interactive block overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cover} alt={`${p.title}: ${p.category}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="h-card">{p.title}</h3>
                  {p.hgtv && <p className="mt-2 text-xs uppercase tracking-[0.14em] text-text-muted">{p.hgtv}</p>}
                  <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cream">View Project <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More from the show: gallery */}
      <section className="border-t border-border-subtle bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">More From the Show</p>
            <h2 className="h-section mt-4">Inside The Firehouse</h2>
          </Reveal>
          <Gallery images={images} columns={3} />
        </div>
      </section>

      {/* Full-bleed photographic statement: from the show to working with clients. */}
      <EditorialSplit image="/editorial/luke-clint-studio.webp" imageAlt="Luke Caldwell and Clint Robertson" eyebrow="From the Show to Your Home" title="The Same Care, Off Camera" ratio="natural" tone="primary" href="/shows/" cta="Watch Luke and Clint">
        <p>The homes are only part of the story. Get to know Luke and Clint, revisit the HGTV series, and watch their independent show on YouTube.</p>
      </EditorialSplit>

      {/* Fan comments: viewer remarks about the shows. Not testimonials, not
          client reviews, and never Review schema (ADA-NS-09, Hank ruling). */}
      <section className="border-t border-border-subtle bg-bg-primary section" aria-labelledby="fan-comments-heading">
        <div className="container-wide">
          <p className="eyebrow">From the Viewers</p>
          <h2 id="fan-comments-heading" className="h-section mt-4">Fan Comments</h2>
          <p className="mt-3 max-w-2xl text-sm text-text-secondary">Comments from viewers of the Boise Boys shows. These are fan comments about the shows, not reviews from Timber + Love clients.</p>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3" aria-label="Fan comments">
            {fanComments.map((f) => (
              <li key={f.name} className="surface-card p-5">
                <blockquote className="text-sm leading-relaxed text-text-secondary">“{f.quote}”</blockquote>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-text-muted">{f.name} · {f.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta {...closingCta.hgtv} />
    </>
  );
}
