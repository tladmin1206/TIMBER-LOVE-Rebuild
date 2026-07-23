import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import { site, pathways } from '@/lib/site';
import { pageMeta } from '@/lib/seo';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import TrustBar from '@/components/sections/TrustBar';

export const metadata = pageMeta({
  title: 'Our Story',
  description:
    'Timber and Love is a Boise-based brand led by Luke Caldwell of HGTV\'s Boise Boys and Outgrown, connecting design, construction, real estate, cash offers, investment, and vacation rentals under one team.',
  path: '/about/',
  image: '/wp-content/uploads/2024/03/Timber-and-Love-Design-Build-Luke-Caldwell-1.jpg',
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="One Team for Every Stage of Home"
        subtitle="Timber and Love brings design, construction, real estate, direct home offers, investment, and vacation stays together under one Boise-based brand."
        image="/wp-content/uploads/2024/03/Timber-and-Love-Design-Build-Luke-Caldwell-1.jpg"
      >
        <Cta href="/contact/" variant="primary" track="about_contact">Contact Our Team</Cta>
        <Cta href="/timber-and-love-gallery/" variant="secondary">See Our Work</Cta>
      </PageHero>

      <TrustBar />

      {/* Brand story */}
      <section className="bg-bg-primary section" aria-labelledby="story-heading">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="eyebrow">Where We Started</p>
            <h2 id="story-heading" className="h-section mt-4">
              Founded in Boise in {site.founded}
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5">
            {/* TEMP: confirm the precise founding narrative and early milestones with the business */}
            <p className="text-lead">
              Timber and Love began in Boise and has grown into one brand and one team working across the full arc of
              home and real estate. That includes designing and building homes, helping people buy and sell, making
              direct offers to homeowners who want a simpler sale, investing in property, and hosting guests in
              distinctive vacation stays.
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">
              The through line is the same at every stage: local knowledge of the Treasure Valley, a clear design point
              of view, and a team you can reach directly. Many clients move between these services over time, so keeping
              them under one roof means the next step is never a cold start with a stranger.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why one brand includes multiple services */}
      <section className="bg-bg-secondary section" aria-labelledby="brand-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">One Brand, Five Pathways</p>
            <h2 id="brand-heading" className="h-section mt-4">
              Why One Brand Includes Multiple Home and Real Estate Services
            </h2>
            <p className="text-lead mt-4">
              A home rarely stays in one category. You might remodel, then sell, then invest, then host. Each pathway
              below is a distinct service, connected to the same team so guidance carries over from one to the next.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pathways.map((p, i) => (
              <Reveal key={p.key} delay={i * 70}>
                <Link
                  href={p.href}
                  {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group card-interactive block h-full bg-surface/40 p-7"
                  data-track={`about_pathway_${p.key}`}
                >
                  <div className="font-sans text-4xl tracking-brand text-accent/70">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="h-card mt-4">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{p.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cream">
                    {p.cta}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      {p.external ? '↗' : '→'}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Luke Caldwell */}
      <section className="bg-bg-primary section" aria-labelledby="luke-heading">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="eyebrow">Who Leads the Work</p>
            <h2 id="luke-heading" className="h-section mt-4">
              Luke Caldwell
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5">
            <p className="text-lead">
              Timber and Love is led by Luke Caldwell, a Boise-based designer known to national audiences from HGTV&apos;s
              Boise Boys and the follow-up series Outgrown.
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">
              {/* TEMP: confirm any biographical specifics (background, family, tenure) before adding them */}
              His work centers on residential design in the Treasure Valley, pairing a defined aesthetic with hands-on
              involvement in the homes his team designs, builds, and renovates. That same eye carries into the real
              estate, investment, and vacation-stay sides of the brand.
            </p>
            <Cta href="/the-boise-boys/" variant="link">Read the HGTV Story →</Cta>
          </Reveal>
        </div>
      </section>

      {/* Design philosophy */}
      <section className="bg-bg-secondary section" aria-labelledby="philosophy-heading">
        <div className="container-wide">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Our Point of View</p>
            <h2 id="philosophy-heading" className="h-section mt-4">
              Warm, Modern, and True to the House
            </h2>
            <p className="text-lead mt-5">
              We design homes that feel warm and modern at once, and we work to keep the character that makes an older
              home worth saving.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">
              In practice that means honoring original details where they matter, opening up rooms that no longer fit how
              people actually live, and choosing materials for how they wear over years rather than how they look on the
              first day. The goal is a home that feels collected and personal, not staged.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HGTV history */}
      <section className="bg-bg-primary section" aria-labelledby="hgtv-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">As Seen on HGTV</p>
            <h2 id="hgtv-heading" className="h-section mt-4">
              A Story Documented on Screen
            </h2>
            <p className="text-lead mt-5">
              Luke and the team documented their Boise renovations on HGTV&apos;s Boise Boys, then continued the story
              with Outgrown. The full history, including favorite projects from the show, lives on our HGTV page.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Cta href="/the-boise-boys/" variant="secondary">Explore the HGTV Story</Cta>
              <Cta href={site.shows.boiseBoys} variant="link" external newTab>Watch Boise Boys</Cta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Americana Soul */}
      <section id="americana-soul" className="bg-bg-secondary section" aria-labelledby="book-heading">
        <div className="container-wide grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-center">
          <Reveal className="mx-auto w-full max-w-[320px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wp-content/uploads/2024/03/Timber-and-Love-Design-Build-Luke-Caldwell-1-775x1024.jpg"
              alt="Cover of Americana Soul, the design book by Luke Caldwell"
              loading="lazy"
              className="w-full border border-border-subtle object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">The Book</p>
            <h2 id="book-heading" className="h-section mt-4">
              {site.book.title}
            </h2>
            {/* TEMP: confirm the book description and any subtitle wording with the business */}
            <p className="text-lead mt-5">
              {site.book.title} is Luke Caldwell&apos;s design book, gathering the ideas behind the Timber and Love look:
              comfortable, collected rooms designed with intention rather than trend.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">
              It is a closer read on the same philosophy that guides the homes we design and build, from how a space is
              layered to how materials and light are chosen. If our work resonates with you, the book is a good way to
              see where it comes from.
            </p>
            <div className="mt-8">
              <Cta href={site.book.amazon} variant="primary" external newTab track="book_purchase">
                Buy {site.book.title} on Amazon
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Press & partnerships */}
      <section className="bg-bg-primary section-tight" aria-labelledby="press-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Press &amp; Partnerships</p>
            <h2 id="press-heading" className="h-card mt-4">
              Working With Us on a Story or Project
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              For media requests and partnership opportunities, see our{' '}
              <Link href="/contact/#press" className="text-cream link-underline">
                press and partnerships contact
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingCta {...closingCta.about} />
    </>
  );
}
