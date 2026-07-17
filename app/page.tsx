import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import FullBleedPromo from '@/components/sections/FullBleedPromo';
import BeginJourneyCta from '@/components/sections/BeginJourneyCta';
import Reveal from '@/components/ui/Reveal';
import Gallery from '@/components/ui/Gallery';
import VideoBg from '@/components/ui/VideoBg';
import RotatingTestimonial from '@/components/ui/RotatingTestimonial';
import InlineVideo from '@/components/ui/InlineVideo';
import ModalButton from '@/components/ui/ModalButton';
import { site } from '@/lib/site';
import {
  servicePromos,
  values,
  processSteps,
  mission,
  clientReviews,
  favoriteProjects,
  introVideoId,
  introVideoPoster,
  sectionVideos,
  hgtvShows,
} from '@/lib/content/home';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Intro / About — 2-col text + full-width inline video */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="container-wide grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Our Services</p>
            <h2 className="h-display mt-4 text-4xl sm:text-6xl">Designing Beauty, Building Dreams</h2>
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
          <div className="mt-10 text-center">
            <ModalButton modal="connect" className="btn-outline">Get Started</ModalButton>
          </div>
        </div>
      </section>

      {/* Expertise heading + full-bleed service promo blocks */}
      <section className="bg-ink pb-8 pt-4 sm:pb-12 sm:pt-8">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What We Do</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Our Expertise, Your Perfect Space</h2>
          </Reveal>
        </div>
      </section>
      {servicePromos.map(({ key, ...p }) => (
        <FullBleedPromo key={key} {...p} />
      ))}

      {/* HGTV Shows — left header + video-background cards */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Stream Us On Your TV</p>
            <h2 className="h-display mt-4 text-4xl sm:text-6xl">HGTV&apos;s Boise Boys + Outgrown</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {hgtvShows.map((show, i) => (
              <Reveal key={show.title} delay={i * 120} className="relative aspect-[16/10] overflow-hidden">
                <VideoBg videoId={show.videoId} poster={show.poster} overlay="bg-ink/35" />
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center gap-x-6 gap-y-2 p-7">
                  <h3 className="h-display text-2xl sm:text-3xl">{show.title}</h3>
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

      {/* Favorite projects gallery */}
      <section className="bg-ink pb-20 sm:pb-28">
        <div className="container-wide">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">See Our Work</p>
            <h2 className="h-display mt-4 text-4xl sm:text-6xl">Some Of Our Favorite Boise Boys Projects</h2>
          </Reveal>
          <div className="mt-14">
            <Gallery images={favoriteProjects} columns={3} />
          </div>
          <div className="mt-10">
            <Link href="/timber-and-love-gallery/" className="btn-outline">See All Images</Link>
          </div>
        </div>
      </section>

      {/* Values — full-bleed video background + left header + 2x2 grid */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <VideoBg videoId={sectionVideos.values.id} poster={sectionVideos.values.poster} overlay="bg-ink/75" />
        <div className="container-wide relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Why Choose Us</p>
            <h2 className="h-display mt-4 text-5xl sm:text-7xl">Our Values</h2>
            <ModalButton modal="work-with-us" className="btn-outline mt-8">Work With Us</ModalButton>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="border border-cream/20 bg-ink/30 p-6 backdrop-blur-sm">
                <h3 className="h-display text-lg">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/80">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission — centered on dark */}
      <section className="bg-ink py-24 text-center sm:py-32">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="eyebrow">Commitment To Excellence</p>
            <h2 className="h-display mt-4 text-4xl sm:text-6xl">Our Mission</h2>
            <p className="mt-8 text-body">{mission}</p>
            <ModalButton modal="work-with-us" className="btn-outline mt-10">Work With Us</ModalButton>
          </Reveal>
        </div>
      </section>

      {/* Testimonials — full-bleed video background + centered rotating quote */}
      <section className="relative overflow-hidden py-24 text-center sm:py-32">
        <VideoBg videoId={sectionVideos.testimonials.id} poster={sectionVideos.testimonials.poster} overlay="bg-ink/75" />
        <div className="container-wide relative z-10">
          <Reveal>
            <p className="eyebrow">Testimonials</p>
            <h2 className="h-display mt-4 text-4xl sm:text-6xl">See What Others Are Saying</h2>
          </Reveal>
          <div className="mt-12">
            <RotatingTestimonial items={clientReviews} />
          </div>
          <div className="mt-12">
            <a href={site.reviewUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">We&apos;d Love Your Review</a>
          </div>
        </div>
      </section>

      {/* 3-step process — left header + bordered cards */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className="eyebrow">Let&apos;s Work Together</p>
              <h2 className="h-display mt-4 text-4xl sm:text-6xl">Get Started In 3 Simple Steps</h2>
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
              <Reveal key={step.num} delay={i * 110} className="border border-cream/15 p-8">
                <div className="font-sans text-5xl tracking-brand text-accent/70">{step.num}</div>
                <h3 className="h-display mt-6 text-xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-body">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Book — text left (italic serif) + image right */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow italic">Luke&apos;s Debut Design Book</p>
            <h2 className="mt-4 font-serif text-5xl italic text-cream sm:text-7xl">Americana Soul</h2>
            <p className="mt-6 text-body">
              Designed with comfort and intention, Luke Caldwell&apos;s debut design book shares the philosophy and
              spaces behind Timber and Love. Bring a piece of the T+L aesthetic into your own home.
            </p>
            <a
              href={site.book.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-sm italic uppercase tracking-[0.16em] text-cream link-underline"
            >
              Get Your Copy Today →
            </a>
          </Reveal>
          <Reveal delay={120} className="relative aspect-[4/3] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wp-content/uploads/2024/03/Timber-and-Love-Design-Build-Luke-Caldwell-1-775x1024.jpg"
              alt="Luke Caldwell — Americana Soul"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Partnerships */}
      <section className="bg-ink pb-20 sm:pb-28">
        <div className="container-wide max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">Appearances | Partnerships | Press</p>
            <h2 className="h-display mt-4 text-3xl sm:text-5xl">Partnership Opportunities</h2>
            <p className="mt-6 text-body">
              For appearances, partnerships, and press, reach out to our partnerships team. Is your project a good fit?
              Let&apos;s talk.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-cream">
              <a href={site.partnerships.phoneHref} className="link-underline">{site.partnerships.phone}</a>
              <a href={`mailto:${site.partnerships.email}`} className="link-underline">{site.partnerships.email}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <BeginJourneyCta />
    </>
  );
}
