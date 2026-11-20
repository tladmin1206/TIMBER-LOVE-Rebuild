'use client';

import SiteImage from '@/components/ui/SiteImage';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { site } from '@/lib/site';

/**
 * Brand feature slider. Two slides, Americana Soul and Partnership
 * Opportunities, share one editorial split layout (content beside a framed
 * image) so the slider feels intentional and premium. Elegant labeled
 * navigation controlled by the visitor.
 *
 * The background is deliberately solid rather than video: the closing CTA
 * directly below carries the brand film, and two adjacent video backgrounds
 * read as a glitch. A calm dark ground here also lets the framed portrait and
 * the heading breathe, and gives the page a video / still / video rhythm.
 */
const SLIDES = [
  {
    key: 'book',
    nav: 'Americana Soul',
    eyebrow: 'Luke Caldwell · Debut Design Book',
    title: 'Americana Soul',
    body: 'Designed with comfort and intention, Luke Caldwell’s debut design book shares the philosophy and spaces behind Timber + Love. Bring a piece of the T+L aesthetic into your own home.',
    cta: { label: 'Get Your Copy', href: site.book.amazon },
    image: '/editorial/luke-book.webp',
    imageAlt: 'Luke Caldwell holding his design book Americana Soul',
  },
  {
    key: 'partnerships',
    nav: 'Partnerships',
    eyebrow: 'Appearances · Partnerships · Press',
    title: 'Partnership Opportunities',
    body: 'For appearances, brand partnerships, and press, reach out to our partnerships team. If your project is a good fit, we would love to talk.',
    image: '/editorial/luke-portrait.webp',
    imageAlt: "Luke Caldwell, designer and founder of Timber + Love",
  },
] as const;

export default function PartnershipsFeature() {
  const [active, setActive] = useState(0);
  const go = useCallback((n: number) => setActive((n + SLIDES.length) % SLIDES.length), []);

  return (
    <section
      className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-bg-primary section-feature sm:min-h-[92vh]"
      aria-roledescription="carousel"
      aria-label="Americana Soul and Partnerships"
    >
      {/* Solid ground with a whisper of depth: no video, so it does not echo the
          closing CTA's film directly below. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-secondary via-bg-primary to-bg-primary" />

      <div className="container-wide relative z-10 w-full">
        {/* Slides: stacked, cross-fading, shared split layout */}
        <div className="relative">
          {SLIDES.map((s, idx) => {
            const isActive = idx === active;
            return (
              <div
                key={s.key}
                aria-hidden={!isActive}
                // `inert` keeps keyboard focus out of the invisible slide. Without
                // it, tabbing landed on links that were announced as hidden and
                // could not be seen, a genuine keyboard trap. React 19 takes it as
                // a boolean; the old empty-string form now renders nothing.
                inert={!isActive}
                className={`grid items-center gap-10 transition-opacity duration-700 ease-out lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 ${
                  isActive ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
                }`}
              >
                {/* Content */}
                <div>
                  <p className="eyebrow">{s.eyebrow}</p>
                  <h2 className="h-section mt-5 text-cream">{s.title}</h2>
                  <p className="mt-7 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg">{s.body}</p>

                  {/* The book link is secondary: a purchase is brand affinity,
                      not a lead, and this sits directly before the closing
                      CTA's primary action. */}
                  {'cta' in s && s.cta ? (
                    <a href={s.cta.href} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-9" data-track="americana_soul">
                      {s.cta.label}
                    </a>
                  ) : (
                    <Link href="/contact/#general" className="btn-secondary mt-9" data-track="partnerships_contact">
                      Get in Touch
                    </Link>
                  )}
                </div>

                {/* Framed image */}
                <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden border border-border-subtle shadow-2xl shadow-black/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <SiteImage sizes="(min-width: 640px) 384px, 100vw" src={s.image} alt={s.imageAlt} className="h-full w-full object-contain" loading="lazy" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Labeled navigation */}
        <div className="mt-10 flex flex-wrap items-center gap-5">
          {SLIDES.map((s, idx) => (
            <button
              key={s.key}
              onClick={() => go(idx)}
              aria-current={idx === active}
              className={`min-h-11 pb-1 text-xs uppercase tracking-[0.16em] transition-colors ${
                idx === active ? 'border-b border-cream text-cream' : 'border-b border-transparent text-cream/40 hover:text-cream/75'
              }`}
            >
              <span className="mr-2 text-cream/40">0{idx + 1}</span>
              {s.nav}
            </button>
          ))}
          <div className="flex items-center gap-2 sm:ml-auto">
            <button onClick={() => go(active - 1)} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 text-cream/80 transition hover:border-cream hover:text-cream">
              ‹
            </button>
            <button onClick={() => go(active + 1)} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 text-cream/80 transition hover:border-cream hover:text-cream">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
