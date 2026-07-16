import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import Gallery from '@/components/ui/Gallery';
import Reveal from '@/components/ui/Reveal';
import CtaBand from '@/components/sections/CtaBand';
import RotatingTestimonial from '@/components/ui/RotatingTestimonial';
import Cta from '@/components/ui/Cta';
import { site } from '@/lib/site';
import { clientReviews, fanComments } from '@/lib/content/home';
import { projects } from '@/lib/content/projects';
import { pageMeta } from '@/lib/seo';
import data from '@/content/the-boise-boys.json';

export const metadata = pageMeta({
  title: 'HGTV: The Boise Boys',
  description:
    "Timber and Love's work has been documented across HGTV's Boise Boys and Outgrown. Watch the transformations and see how that experience informs our work today.",
  path: '/the-boise-boys/',
});

const intro = (data.sections as any[])[0]?.paragraphs?.[0] || '';
const images = (data.gallery as string[]).map((src, i) => ({ src, alt: `Boise Boys project photo ${i + 1}` }));

export default function Page() {
  return (
    <>
      <PageHero eyebrow="As Seen on HGTV" title="The Boise Boys" subtitle={intro} image={data.hero.image}>
        <a href={site.shows.boiseBoys} target="_blank" rel="noopener noreferrer" className="btn-primary">Watch Boise Boys ↗</a>
        <a href={site.shows.outgrown} target="_blank" rel="noopener noreferrer" className="btn-secondary">Watch Outgrown ↗</a>
      </PageHero>

      {/* The story */}
      <section className="bg-bg-primary py-16 sm:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">The Story</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Boise Homes, on National Television</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lead">
              Led by Luke Caldwell, Timber and Love has restored and reimagined Boise homes across multiple seasons of
              HGTV&apos;s Boise Boys and the family-focused series Outgrown. The same hands-on, design-forward approach
              you see on screen is how we work with clients today.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured television projects — link to full case studies */}
      <section className="border-t border-border-subtle bg-bg-secondary py-16 sm:py-24">
        <div className="container-wide">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">Featured Television Projects</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">From the Show</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}/`} className="group card-interactive block overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cover} alt={`${p.title} — ${p.category}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="h-display text-2xl">{p.title}</h3>
                  {p.hgtv && <p className="mt-2 text-xs uppercase tracking-[0.14em] text-text-muted">{p.hgtv}</p>}
                  <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cream">View Project <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More from the show — gallery */}
      <section className="bg-bg-primary py-16 sm:py-24">
        <div className="container-wide">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">More From the Show</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl">Project Photos</h2>
          </Reveal>
          <Gallery images={images} columns={4} />
        </div>
      </section>

      {/* Client proof — verified customer reviews only */}
      <section className="border-t border-border-subtle bg-bg-secondary py-16 text-center sm:py-24">
        <div className="container-wide">
          <Reveal>
            <p className="eyebrow">Client Stories</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">What Our Clients Say</h2>
          </Reveal>
          <div className="mt-10">
            <RotatingTestimonial items={clientReviews} />
          </div>
        </div>
      </section>

      {/* Fan comments — clearly labeled as viewers, not clients */}
      <section className="bg-bg-primary py-16 sm:py-20">
        <div className="container-wide">
          <Reveal className="mb-8 max-w-2xl">
            <p className="eyebrow">From the Fans</p>
            <h2 className="h-display mt-4 text-2xl sm:text-4xl">What Viewers Say</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {fanComments.map((f) => (
              <figure key={f.name} className="surface-card p-5">
                <blockquote className="text-sm leading-relaxed text-text-secondary">“{f.quote}”</blockquote>
                <figcaption className="mt-3 text-xs uppercase tracking-[0.14em] text-text-muted">{f.name} · {f.role}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Bring the Look Home"
        title="Bring Thoughtful Timber and Love Design to Your Home"
        body="See how the design you love on screen translates to your own project."
        image={images[0]?.src || data.hero.image}
        primary={<Cta href="/design-and-build/" variant="primary">Explore Design + Build</Cta>}
        secondary={<Cta href="/timber-and-love-gallery/" variant="secondary">View Projects</Cta>}
      />
    </>
  );
}
