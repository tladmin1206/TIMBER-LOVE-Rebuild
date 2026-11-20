import SiteImage from '@/components/ui/SiteImage';
import LukeClintFeature from '@/components/sections/LukeClintFeature';
import HgtvShows from '@/components/sections/HgtvShows';
import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import { pageMeta } from '@/lib/seo';

import TrustBar from '@/components/sections/TrustBar';
import LukeTrustBar from '@/components/sections/LukeTrustBar';
import FeatureBand from '@/components/sections/FeatureBand';
import PartnershipsFeature from '@/components/sections/PartnershipsFeature';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import Reveal from '@/components/ui/Reveal';
import PhotoCard from '@/components/ui/PhotoCard';
import VideoBg from '@/components/ui/VideoBg';
import InlineVideo from '@/components/ui/InlineVideo';
import LogoMarquee from '@/components/ui/LogoMarquee';
import ModalButton from '@/components/ui/ModalButton';
import { site } from '@/lib/site';
import {
  values,
  processSteps,
  mission,
  pressLogos,
  introVideoId,
  introVideoPoster,
  sectionVideos,
  hgtvShows,
} from '@/lib/content/home';
import { projects } from '@/lib/content/projects';

export const metadata = pageMeta({
  absoluteTitle: true,
  title: "Timber + Love | Boise Design-Build by HGTV's Luke Caldwell",
  description:
    "Timber + Love is a Boise design-build firm led by HGTV's Luke Caldwell. Custom homes and luxury remodels, designed and built by one team. Start here.",
  path: '/',
});

// Lead the homepage with design-build case studies (the custom homes), the
// clearest proof of the integrated design + build service.
const featuredProjects = ['promise-lane-spanish-modern', 'stucco-in-time', 'north-end-gem'].map((slug) => projects.find((p) => p.slug === slug)!);

/**
 * Homepage sequence: orient → route → prove → demonstrate → reassure → convert.
 *
 * The routing grid sits directly under the intro because sending a visitor into
 * the right business line is this page's actual job, and proof follows straight
 * after rather than at ~70% scroll depth where most visitors never reached it.
 * CTA weight escalates down the page: exactly one primary action per screenful.
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      {/* As Featured On: press credibility as the very first thing after the hero. */}
      <section className="border-b border-border-subtle bg-bg-primary py-10 sm:py-16">
        <div className="container-wide">
          <p className="mb-7 text-center text-xs uppercase tracking-[0.2em] text-cream/50">As Featured On</p>
          <LogoMarquee logos={pressLogos} />
        </div>
      </section>

      {/* Intro: who we are, then straight into the choice. No CTA here: the
          pathway grid directly below is the action. */}
      <section className="section-tonal border-t border-border-subtle section">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Who We Are</p>
            <h2 className="h-section mt-4">A Luxury Design + Build Firm</h2>
          </Reveal>
          <Reveal delay={120} className="flex items-end">
            <p className="text-body">
              Founded in 2015 by Luke Caldwell of HGTV&apos;s Boise Boys, Timber + Love offers{' '}
              <Link href="/design-and-build/" className="link-underline">design-build in Boise</Link> for custom homes
              and high-end remodels, from the first drawing to the final walkthrough. Design and construction happen
              under one roof, so nothing is lost between the vision and the build.{' '}
              <Link href="/reviews/" className="link-underline">Read what our clients say</Link>.
            </p>
          </Reveal>
        </div>
        <div className="container-wide mt-12">
          <Reveal>
            <InlineVideo videoId={introVideoId} poster={introVideoPoster} />
          </Reveal>
        </div>
      </section>

      {/* What we do: foreground the two design-build paths. The other verticals
          (realty, rentals, cash offers, investing) are intentionally not here;
          they live in the footer so a first-time visitor immediately understands
          that we are primarily a luxury design + build firm. */}
      <section id="pathways" className="bg-bg-primary section" aria-labelledby="wwd-heading">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What We Do</p>
            <h2 id="wwd-heading" className="h-section mt-4">Custom Homes and Luxury Remodels</h2>
            <p className="text-lead mt-5">
              Two ways we work, one team behind both. Every project is fully custom, designed and built in house from
              the first concept to the final detail.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              {
                key: 'new-builds',
                title: 'New Builds',
                blurb: 'Custom homes designed and built from the ground up, tailored to exactly how you live.',
                cta: 'Explore New Builds',
                href: '/design-and-build/',
                image:
                  '/projects/promise-ln-5106/5106-promise-ln-exterior-front.jpg',
              },
              {
                key: 'remodels',
                title: 'Remodels',
                blurb: 'Whole-home renovations and high-end remodels that reimagine the home you already have.',
                cta: 'See Our Remodels',
                href: '/timber-and-love-gallery/',
                image:
                  '/editorial/cottage-living.webp',
              },
            ].map((p, i) => (
              <Reveal key={p.key} delay={i * 100}>
                <div className="group card-interactive relative isolate flex min-h-[23rem] flex-col justify-end overflow-hidden sm:min-h-[26rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <SiteImage
                    src={p.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 via-[38%] to-transparent to-[72%]" />
                  <div className="p-6 sm:p-9">
                    <h3 className="h-display text-2xl text-text-primary sm:text-4xl">{p.title}</h3>
                    <p className="mt-3 max-w-md text-text-secondary">{p.blurb}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-accent">
                      {p.cta}
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                  <Link
                    href={p.href}
                    data-track={`wwd_${p.key}`}
                    className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-focus"
                    aria-label={`${p.title}: ${p.cta}`}
                  >
                    <span className="sr-only">{p.blurb}</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="cta-row mt-8 sm:mt-10">
            <Link href="/design-and-build-questionnaire/" className="btn-primary" data-track="wwd_plan">
              Start a Project
            </Link>
            <Link href="/contact/" className="btn-secondary" data-track="wwd_consult">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Full-bleed photographic statement: design + build under one roof. */}
      <FeatureBand
        image="/editorial/cedar-kitchen.webp"
        eyebrow="One Team, One Roof"
        title="Designed and Built Under One Roof"
        body="From the first sketch to the final fixture, our designers and builders work together on every detail, so nothing is lost between the vision and the finished home."
      />

      <LukeTrustBar />
      <TrustBar />

      {/* Featured design-build projects: the clearest proof of the integrated
          service. Custom homes lead; the full portfolio is one click away. */}
      <section className="section-tonal border-t border-border-subtle section">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Featured Work</p>
            <h2 className="h-section mt-4">Different Homes. One Considered Approach.</h2>
            <p className="text-lead mt-5">
              Explore a custom home, a beam-filled renovation, and a characterful North End transformation. Each begins with the home and the people who live there.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <Link href={`/projects/${p.slug}/`} className="group card-interactive block h-full overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[4/5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <SiteImage
                      src={p.cover}
                      alt={`${p.title}: ${p.category} by Timber + Love`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="eyebrow">{p.style ?? p.category}</p>
                    <h3 className="h-card mt-2">{p.title}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-text-muted">{p.location}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="cta-row mt-8 sm:mt-10">
            <Link href="/timber-and-love-gallery/" className="btn-secondary">Explore the Full Portfolio</Link>
          </div>
        </div>
      </section>

      {/* Remove friction immediately before the ask */}
      <section className="section-tonal border-t border-border-subtle section">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className="eyebrow">Let&apos;s Work Together</p>
              <h2 className="h-section mt-4">Get Started In 3 Simple Steps</h2>
            </Reveal>
            <Reveal delay={120} className="flex items-end">
              <p className="text-body">
                Every home we design and build starts the same way: a simple, three-step process, then collaboration,
                creativity, and precision as we bring it to life. Tell us what you have in mind,
                and our team will help you find the right starting point.
              </p>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 110} className="h-full">
                <PhotoCard image={step.image}>
                  <div className="step-num">{step.num}</div>
                  <h3 className="h-card mt-3">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{step.body}</p>
                </PhotoCard>
              </Reveal>
            ))}
          </div>
          <div className="cta-row mt-8 sm:mt-10">
            <Link href="/design-and-build-questionnaire/" className="btn-primary" data-track="process_plan">
              Start a Project
            </Link>
            <Link href="/our-process/" className="btn-secondary" data-track="process_learn">
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      <HgtvShows />

      <LukeClintFeature />

      {/* Solid editorial sections on either side give the values film room. */}
      <section className="relative isolate overflow-hidden bg-ink section-feature" aria-labelledby="values-heading">
        <VideoBg
          videoId={sectionVideos.values.id}
          poster={sectionVideos.values.poster}
          overlay="bg-ink/75 lg:bg-transparent lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/70 lg:to-ink/50"
        />
        <div className="container-wide relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Why Choose Us</p>
            <h2 id="values-heading" className="h-section mt-4">Our Values</h2>
            <p className="text-lead mt-5 max-w-md">{mission}</p>
            <ModalButton modal="work-with-us" className="btn-secondary btn-on-media mt-8 w-full sm:w-auto">Work With Us</ModalButton>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="surface-card-glass p-5 sm:p-6">
                <h3 className="h-card-sm">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-cream/80 sm:mt-3">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* A solid black transition after the full-background values film. */}
      <section className="bg-ink section" aria-labelledby="start-project-heading">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Your Home, Realized</p>
            <h2 id="start-project-heading" className="h-section mt-4">Let&apos;s Design Something Worth Building</h2>
            <p className="text-lead mt-5">Tell us about your home and your goals, and let’s bring your vision to life.</p>
            <Link href="/design-and-build-questionnaire/" className="btn-primary mt-8 flex w-full sm:inline-flex sm:w-auto">Start a Project</Link>
          </Reveal>
        </div>
      </section>

      {/* Brand depth */}
      <PartnershipsFeature />

      <ClosingCta {...closingCta.home} />
    </>
  );
}
