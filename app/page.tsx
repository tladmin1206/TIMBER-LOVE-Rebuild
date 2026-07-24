import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import PathwaySelector from '@/components/sections/PathwaySelector';
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
            <p className="eyebrow">Our Services</p>
            <h2 className="h-section mt-4">Designing Beauty, Building Dreams</h2>
          </Reveal>
          <Reveal delay={120} className="flex items-end">
            <p className="text-body">
              Founded in 2015 by HGTV&apos;s Boise Boys, Luke Caldwell, we are an award-winning boutique team in Boise.
              We offer a suite of real estate services, including design + build, new construction, real estate,
              vacation rentals, cash home offers, and more. Committed to integrity and personalized service, we cater to
              every aspect of your real estate needs, ensuring a streamlined and exclusive experience.
            </p>
          </Reveal>
        </div>
        <div className="container-wide mt-12">
          <Reveal>
            <InlineVideo videoId={introVideoId} poster={introVideoPoster} />
          </Reveal>
        </div>
      </section>

      {/* Route the visitor, the page's primary job, and its primary CTA. */}
      <PathwaySelector />

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

      {/* HGTV Shows, the differentiator */}
      <section className="bg-bg-primary pb-20 sm:pb-28">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Stream Us On Your TV</p>
            <h2 className="h-section mt-4">HGTV&apos;s Boise Boys + Outgrown</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {hgtvShows.map((show, i) => (
              <Reveal key={show.title} delay={i * 120} className="relative aspect-[16/10] overflow-hidden">
                <VideoBg videoId={show.videoId} poster={show.poster} overlay="bg-ink/35" />
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center gap-x-6 gap-y-2 p-7">
                  <h3 className="h-card">{show.title}</h3>
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
                Whether you&apos;re building, remodeling, buying, renting, or selling, it all begins with our 3-step
                process. Then through collaboration, creativity, and precision, we execute!
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
        </div>
      </section>

      {/* Brand depth */}
      <PartnershipsFeature />

      <ClosingCta {...closingCta.home} />
    </>
  );
}
