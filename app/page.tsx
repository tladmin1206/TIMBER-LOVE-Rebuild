import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import PathwaySelector from '@/components/sections/PathwaySelector';
import ReviewWall from '@/components/sections/ReviewWall';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import VideoBg from '@/components/ui/VideoBg';
import InlineVideo from '@/components/ui/InlineVideo';
import { site, pathways } from '@/lib/site';
import {
  pressLogos,
  featuredProjects,
  whyReasons,
  clientReviews,
  brandEcosystem,
  sectionVideos,
  hgtvShows,
  introVideoId,
  introVideoPoster,
} from '@/lib/content/home';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />

      {/* Intro + "Designing Beauty" inline video (the player that belongs below
          the hero, matching the original homepage). */}
      <section className="bg-bg-primary py-20 sm:py-28" aria-labelledby="intro-heading">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Design + Build</p>
            <h2 id="intro-heading" className="h-display mt-4 text-4xl sm:text-6xl">Designing Beauty, Building Homes</h2>
          </Reveal>
          <Reveal delay={120} className="flex items-end">
            <p className="text-lead">
              Founded in {site.founded} by Luke Caldwell of HGTV&apos;s Boise Boys, Timber and Love is an award-winning
              boutique team in Boise. We bring design, construction, real estate, and more under one trusted brand for
              a streamlined, personal experience.
            </p>
          </Reveal>
        </div>
        <div className="container-wide mt-12">
          <Reveal>
            <InlineVideo videoId={introVideoId} poster={introVideoPoster} />
          </Reveal>
        </div>
      </section>

      <PathwaySelector />

      {/* Brand credibility — verified proof, calm media presentation */}
      <section className="bg-bg-secondary py-20 sm:py-24" aria-labelledby="proof-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Why Trust Timber and Love</p>
            <h2 id="proof-heading" className="h-display mt-4 text-3xl sm:text-4xl">
              Founded in Boise in {site.founded}
            </h2>
            <p className="text-lead mt-4">
              A boutique team led by Luke Caldwell of HGTV&apos;s Boise Boys, working across design, construction, and
              real estate throughout the Treasure Valley.
            </p>
          </Reveal>

          <div className="mt-14">
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Featured On</p>
            <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
              {pressLogos.map((logo) => (
                <li key={logo.alt}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.src} alt={logo.alt} loading="lazy" className="h-7 w-auto opacity-70 sm:h-8" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured work — curated project case studies */}
      <section className="bg-bg-primary py-20 sm:py-28" aria-labelledby="work-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">See Our Work</p>
            <h2 id="work-heading" className="h-display mt-4 text-3xl sm:text-5xl">
              Featured Projects
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link href={p.href} className="group card-interactive block overflow-hidden" data-track={`featured_${p.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.cover}
                      alt={`${p.name} — ${p.type} in ${p.location}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.16em] text-accent">
                      <span>{p.type}</span>
                      <span className="text-text-muted">·</span>
                      <span className="text-text-muted">{p.location}</span>
                    </div>
                    <h3 className="h-display mt-3 text-2xl">{p.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{p.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cream">
                      View Project
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Cta href="/timber-and-love-gallery/" variant="secondary">View the Full Gallery</Cta>
          </div>
        </div>
      </section>

      {/* Why Timber and Love — differentiated reasons */}
      <section className="bg-bg-secondary py-20 sm:py-28" aria-labelledby="why-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Why Choose Us</p>
            <h2 id="why-heading" className="h-display mt-4 text-3xl sm:text-5xl">
              One Team, Every Stage of Home
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyReasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 70} className="surface-card p-7">
                <h3 className="h-display text-lg">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Estimator lead magnet — low-friction conversion */}
      <section className="relative overflow-hidden py-16 sm:py-20" aria-labelledby="estimator-heading">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/wp-content/uploads/2024/03/TimberandLoveHomeRemodelingCompany-Design-BuildBackgroundImage-ezgif.com-webp-to-jpg-converter-1.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/70" />
        <div className="container-wide">
          <Reveal className="max-w-xl" as="div">
            <p className="eyebrow">Plan With Confidence</p>
            <h2 id="estimator-heading" className="h-display mt-4 text-3xl sm:text-4xl">
              Curious What Your Project Might Cost?
            </h2>
            <p className="text-lead mt-4">
              Answer a few quick questions and see a realistic preliminary investment range in about two minutes. No
              pressure, no obligation, and no exact-quote guesswork.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Cta href="/estimate/" variant="primary" track="home_estimator">Estimate Your Project</Cta>
              <span className="text-xs uppercase tracking-[0.14em] text-text-muted">Free · Takes ~2 minutes</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HGTV — editorial credibility */}
      <section className="bg-bg-primary py-20 sm:py-28" aria-labelledby="hgtv-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">As Seen on HGTV</p>
            <h2 id="hgtv-heading" className="h-display mt-4 text-3xl sm:text-5xl">
              Boise Boys &amp; Outgrown
            </h2>
            <p className="text-lead mt-4">
              Timber and Love&apos;s work has been documented across HGTV&apos;s Boise Boys and Outgrown. Watch the
              transformations, then see how that same experience informs our work today.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {hgtvShows.map((show, i) => (
              <Reveal key={show.title} delay={i * 120} className="relative aspect-[16/10] overflow-hidden border border-border-subtle">
                <VideoBg videoId={show.videoId} poster={show.poster} overlay="bg-ink/35" />
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center gap-x-6 gap-y-2 p-7">
                  <h3 className="h-display text-2xl sm:text-3xl">{show.title}</h3>
                  <a
                    href={i === 0 ? site.shows.boiseBoys : site.shows.outgrown}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.16em] text-cream link-underline"
                  >
                    Watch on Discovery+ ↗
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Cta href="/the-boise-boys/" variant="link">Read the HGTV Story →</Cta>
          </div>
        </div>
      </section>

      {/* Client stories — premium review wall with real, attributed reviews */}
      <ReviewWall reviews={clientReviews} moreHref="/reviews/" />

      {/* Brand ecosystem — one brand, more ways to help */}
      <section className="bg-bg-secondary py-20 sm:py-24" aria-labelledby="ecosystem-heading">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">The Timber and Love Ecosystem</p>
            <h2 id="ecosystem-heading" className="h-display mt-4 text-3xl sm:text-5xl">One Brand, More Ways to Help</h2>
            <p className="text-lead mt-4">
              Many of our clients move between services over time. However you start, one connected team can guide the
              next step.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="space-y-3">
              {brandEcosystem.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-border-subtle pb-3 text-sm text-text-secondary">
                  <span aria-hidden="true" className="mt-0.5 text-accent">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Final pathway CTA */}
      <section className="relative overflow-hidden py-24 text-center sm:py-28" aria-labelledby="final-heading">
        <VideoBg videoId={sectionVideos.finalCta.id} poster={sectionVideos.finalCta.poster} overlay="bg-ink/85" />
        <div className="container-wide relative z-10 max-w-2xl">
          <Reveal>
            <p className="eyebrow">Not Sure Where to Start?</p>
            <h2 id="final-heading" className="h-display mt-4 text-3xl sm:text-5xl">
              Choose the Option Closest to Your Goal
            </h2>
            <p className="text-lead mt-4">
              Pick the pathway that fits best, or reach out and our team will point you in the right direction.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {pathways.map((p) => (
                <Link
                  key={p.key}
                  href={p.href}
                  {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="border border-border-subtle px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
                >
                  {p.label}
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Cta href="/contact/" variant="primary" track="final_contact">Contact Timber and Love</Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
