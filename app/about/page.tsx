import { breadcrumbSchema, personSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import SiteImage from '@/components/ui/SiteImage';
import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import FeatureBand from '@/components/sections/FeatureBand';
import EditorialSplit from '@/components/sections/EditorialSplit';
import Reveal from '@/components/ui/Reveal';
import Cta from '@/components/ui/Cta';
import { site, pathways } from '@/lib/site';
import PhotoCard from '@/components/ui/PhotoCard';
import { pageMeta } from '@/lib/seo';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import TrustBar from '@/components/sections/TrustBar';
import StatStrip from '@/components/sections/StatStrip';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "About Timber + Love | Boise Design-Build Since 2015",
  description: "Timber + Love is a Boise design-build firm and real estate team, started in 2015 by Luke Caldwell of HGTV's Boise Boys. Here's how it got going.",
  path: '/about/',
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[personSchema, breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }])]} />
      <PageHero
        eyebrow="Our Story"
        title="About Timber + Love"
        subtitle="Timber + Love started in Boise in 2015 and grew into design and build, a real estate team, a way to buy houses for cash, and a few vacation homes. It's all here in Boise."
        image="/editorial/estate-living.webp"
        imageMobile="/editorial/luke-estate.webp"
      >
        <Cta href="/contact/" variant="primary" track="about_contact">Talk to Us</Cta>
        <Cta href="/timber-and-love-gallery/" variant="secondary">See Our Work</Cta>
      </PageHero>

      <TrustBar />

      <StatStrip />

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
              Today that means design and build, real estate, cash offers, investing and vacation homes.
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">
              Most people come to us for one thing and end up needing another. You remodel, then sell, then maybe buy the next place. It helps when the next step isn&apos;t a cold call to a stranger.
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">
              Read <Link href="/timber-love-story-boise/" className="link-underline">the full Timber + Love story</Link>, or
              see <Link href="/service-areas/" className="link-underline">where we work</Link> across the Treasure Valley.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why one brand includes multiple services */}
      <section className="section-tonal border-t border-border-subtle bg-bg-secondary section" aria-labelledby="brand-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What we do</p>
            <h2 id="brand-heading" className="h-section mt-4">
              Five things we do
            </h2>
            <p className="text-lead mt-4">
              A house doesn&apos;t stay one kind of project. Here&apos;s what we do and who to talk to.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pathways.map((p, i) => (
              <Reveal key={p.key} delay={i * 70} className="h-full">
                <Link
                  href={p.href}
                  {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group card-interactive block h-full"
                  data-track={`about_pathway_${p.key}`}
                >
                  <PhotoCard image={p.image} className="!border-0">
                    <div className="step-num">{String(i + 1).padStart(2, '0')}</div>
                    <h3 className="h-card mt-3">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{p.blurb}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs uppercase tracking-[0.16em] text-cream">
                      {p.cta}
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                        {p.external ? '↗' : '→'}
                      </span>
                    </span>
                  </PhotoCard>
                </Link>
              </Reveal>
            ))}
            {/* Sixth cell: completes the grid and catches anyone who is not
                sure which of the five applies to them. */}
            <Reveal delay={pathways.length * 70} className="h-full">
              <div className="surface-card flex h-full flex-col justify-center p-7 sm:p-9">
                <p className="eyebrow">Not Sure Which Fits?</p>
                <h3 className="h-card mt-4">Start With a Conversation</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Tell us what you have in mind and our team will point you to the right people.
                </p>
                <Link href="/contact/" className="btn-secondary mt-7 self-start" data-track="about_pathway_contact">
                  Talk to Us
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Luke Caldwell */}
      <section className="border-t border-border-subtle bg-bg-primary section" aria-labelledby="luke-heading">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="eyebrow">Who Leads the Work</p>
            <h2 id="luke-heading" className="h-section mt-4">
              Luke Caldwell
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5">
            <p className="text-lead">
              Luke Caldwell designs and builds houses in Boise with Clint Robertson, and you may know them from HGTV&apos;s Boise Boys and Outgrown.
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">
              {/* TEMP: confirm any biographical specifics (background, family, tenure) before adding them */}
              Luke is still hands-on in the houses his team designs, builds and renovates. That same eye carries into the real estate, investing and vacation-home side of things.
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">
              Read the <Link href="/luke-caldwell-faq/" className="link-underline">frequently asked questions about Luke Caldwell</Link>{' '}
              and <Link href="/luke-caldwell-boise-community/" className="link-underline">how Luke gives back in Boise</Link>.
            </p>
            <Cta href="/the-boise-boys/" variant="link">Read the HGTV Story →</Cta>
          </Reveal>
        </div>
      </section>

      <EditorialSplit image="/editorial/luke-clint-studio.webp" imageAlt="Luke Caldwell and Clint Robertson" eyebrow="The Story Continues" title="A Partnership Boise Watched Grow" cta="Discover the Shows" href="/shows/" tone="secondary" ratio="natural">
        <p>Luke and Clint took their Boise renovations to HGTV. Now they make a YouTube series, Luke and Clint.</p>
      </EditorialSplit>

      {/* Editorial: an interior that shows the warm, modern point of view. */}
      <EditorialSplit
        image="/projects/promise-ln-5120/5120-promise-ln-living-green-panel.jpg"
        imageAlt="Living space with green paneled millwork and a fireplace in a modern farmhouse by Timber + Love"
        eyebrow="The look"
        title="True to the house"
        tone="secondary"
        ratio="landscape"
      >
        <p>
          This living space pairs green paneling with a fireplace, and it looks new and feels like people already live there.
        </p>
        <p>
          Luke brings the same eye to every house the team designs, builds and renovates.
        </p>
      </EditorialSplit>

      {/* Americana Soul */}
      <section id="americana-soul" className="section-tonal border-t border-border-subtle bg-bg-secondary section" aria-labelledby="book-heading">
        <div className="container-wide grid gap-12 lg:grid-cols-[minmax(0,440px)_1fr] lg:items-center">
          <Reveal className="mx-auto w-full max-w-[440px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <SiteImage sizes="(min-width: 1024px) 40vw, 100vw"
              src="/editorial/luke-book.webp"
              width={1200}
              height={1800}
              alt="Luke Caldwell holding his design book Americana Soul"
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
              Rooms feel welcoming when they have soul in them, and soul isn&apos;t something you can go out and buy. Luke wrote {site.book.title} to show what he was after in each room, and why.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">
              If you like how our houses feel, the book shows where it comes from.
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
      <section className="border-t border-border-subtle bg-bg-primary section-tight" aria-labelledby="press-heading">
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
