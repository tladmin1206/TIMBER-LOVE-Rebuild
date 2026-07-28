import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import LukeTrustBar from '@/components/sections/LukeTrustBar';
import PartnershipsFeature from '@/components/sections/PartnershipsFeature';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import Reveal from '@/components/ui/Reveal';
import Gallery from '@/components/ui/Gallery';
import VideoBg from '@/components/ui/VideoBg';
import ReviewSlider from '@/components/ui/ReviewSlider';
import InlineVideo from '@/components/ui/InlineVideo';
import LogoMarquee from '@/components/ui/LogoMarquee';
import ModalButton from '@/components/ui/ModalButton';
import { site } from '@/lib/site';
import {
  values,
  processSteps,
  mission,
  clientReviews,
  favoriteProjects,
  pressLogos,
  introVideoId,
  introVideoPoster,
  sectionVideos,
  hgtvShows,
} from '@/lib/content/home';

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
      <section className="border-b border-border-subtle bg-bg-primary section-tight">
        <div className="container-wide">
          <p className="mb-8 text-center text-xs uppercase tracking-[0.2em] text-cream/50">As Featured On</p>
          <LogoMarquee logos={pressLogos} />
        </div>
      </section>

      {/* Intro: who we are, then straight into the choice. No CTA here: the
          pathway grid directly below is the action. */}
      <section className="bg-bg-primary section">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Who We Are</p>
            <h2 className="h-section mt-4">A Luxury Design + Build Firm</h2>
          </Reveal>
          <Reveal delay={120} className="flex items-end">
            <p className="text-body">
              Founded in 2015 by Luke Caldwell of HGTV&apos;s Boise Boys, Timber and Love is Treasure Valley&apos;s
              leading luxury design and build firm. We design and build custom homes and high-end remodels, from the
              first drawing to the final walkthrough. We are not a flipping company, and we are not semi-custom. Design
              and construction happen under one roof, so nothing is lost between the vision and the build.
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
                  '/wp-content/uploads/2024/03/TimberandLoveHomeRemodelingCompany-Design-BuildBackgroundImage-ezgif.com-webp-to-jpg-converter-1.jpg',
              },
              {
                key: 'remodels',
                title: 'Remodels',
                blurb: 'Whole-home renovations and high-end remodels that reimagine the home you already have.',
                cta: 'See Our Remodels',
                href: '/timber-and-love-gallery/',
                image:
                  '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Living-Room-1-scaled.jpg',
              },
            ].map((p, i) => (
              <Reveal key={p.key} delay={i * 100}>
                <div className="group card-interactive relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden sm:min-h-[24rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
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

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/investment-planner/" className="btn-primary" data-track="wwd_plan">
              Plan Your Project
            </Link>
            <Link href="/contact/" className="btn-secondary" data-track="wwd_consult">
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Who leads the work: Luke as the authority anchor, right after What We
          Do and before the social proof. */}
      <LukeTrustBar />

      {/* Trust strip: rating, HGTV, local tenure, as the lead-in to the reviews
          rather than directly under the hero. */}
      <TrustBar />

      {/* Proof: moved up from near the foot of the page so the 4.9 rating does
          work for the majority of visitors, not just those who scroll to 70%. */}
      <section className="relative overflow-hidden text-center section-feature">
        <VideoBg videoId={sectionVideos.testimonials.id} poster={sectionVideos.testimonials.poster} overlay="bg-ink/75" />
        <div className="container-wide relative z-10">
          <Reveal>
            <p className="eyebrow">Testimonials</p>
            <h2 className="h-section mt-4">See What Others Are Saying</h2>
          </Reveal>
          <div className="mt-12">
            <ReviewSlider items={clientReviews} />
          </div>
          {/* Tertiary: a request of the visitor, not an offer to them, so it
              must not compete with the conversion actions. */}
          <div className="mt-12">
            <a
              href={site.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-xs uppercase tracking-[0.16em] text-cream/70"
            >
              We&apos;d Love Your Review →
            </a>
          </div>
        </div>
      </section>

      {/* Visual proof */}
      <section className="bg-bg-primary section">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">See Our Work</p>
            <h2 className="h-section mt-4">Some Of Our Favorite Boise Boys Projects</h2>
          </Reveal>
          <div className="mt-14">
            <Gallery images={favoriteProjects} columns={3} />
          </div>
          <div className="mt-10">
            <Link href="/timber-and-love-gallery/" className="btn-secondary">See All Images</Link>
          </div>
        </div>
      </section>

      {/* HGTV: a supporting credibility note, intentionally smaller than a
          hero-scale block. The design-build story leads; the show reinforces. */}
      <section className="bg-bg-primary pb-20 sm:pb-28">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">As Seen on HGTV</p>
            <h3 className="h-card mt-3">Boise Boys + Outgrown</h3>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {hgtvShows.map((show, i) => (
              <Reveal key={show.title} delay={i * 120} className="relative aspect-[16/6] overflow-hidden">
                <VideoBg videoId={show.videoId} poster={show.poster} overlay="bg-ink/35" />
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center gap-x-5 gap-y-1 p-5">
                  <h4 className="h-card-sm">{show.title}</h4>
                  <a
                    href={i === 0 ? site.shows.boiseBoys : site.shows.outgrown}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.16em] text-cream link-underline"
                  >
                    Watch on Discovery + →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why us: Values, carrying the mission statement as its lede. Previously
          these were two consecutive "about us" sections with duplicate buttons,
          the second of which was a centred wall of text that stalled the scroll. */}
      <section className="relative overflow-hidden section-feature">
        <VideoBg videoId={sectionVideos.values.id} poster={sectionVideos.values.poster} overlay="bg-ink/75" />
        <div className="container-wide relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Why Choose Us</p>
            <h2 className="h-section mt-4">Our Values</h2>
            <p className="text-lead mt-5 max-w-md">{mission}</p>
            <ModalButton modal="work-with-us" className="btn-secondary mt-8">Work With Us</ModalButton>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="surface-card-glass p-6">
                <h3 className="h-card-sm">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/80">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Remove friction immediately before the ask */}
      <section className="bg-bg-primary section">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className="eyebrow">Let&apos;s Work Together</p>
              <h2 className="h-section mt-4">Get Started In 3 Simple Steps</h2>
            </Reveal>
            <Reveal delay={120} className="flex items-end">
              <p className="text-body">
                Every home we design and build starts the same way: a simple, three-step process, then collaboration,
                creativity, and precision as we bring it to life. The fastest way to begin is our Investment Planner,
                which gives you a realistic planning range in a few minutes.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 110} className="surface-card p-8">
                <div className="font-sans text-5xl tracking-brand text-accent/70">{step.num}</div>
                <h3 className="h-card mt-6">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-body">{step.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/investment-planner/" className="btn-primary" data-track="process_plan">
              Plan Your Project
            </Link>
            <Link href="/design-and-build/" className="btn-secondary" data-track="process_learn">
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Brand depth */}
      <PartnershipsFeature />

      <ClosingCta {...closingCta.home} />
    </>
  );
}
