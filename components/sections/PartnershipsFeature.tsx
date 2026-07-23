'use client';

import { useCallback, useEffect, useState } from 'react';
import VideoBg from '@/components/ui/VideoBg';
import { site } from '@/lib/site';

/**
 * Cinematic, video-backed brand feature. Two slides — Americana Soul and
 * Partnership Opportunities — share one editorial split layout (content beside
 * a framed image) so the slider feels intentional and premium. Elegant labeled
 * navigation, gentle auto-advance, and a bottom-weighted overlay for legibility.
 */
const SLIDES = [
  {
    key: 'book',
    nav: 'Americana Soul',
    eyebrow: 'Luke Caldwell · Debut Design Book',
    title: 'Americana Soul',
    serif: true,
    body: 'Designed with comfort and intention, Luke Caldwell’s debut design book shares the philosophy and spaces behind Timber and Love. Bring a piece of the T+L aesthetic into your own home.',
    cta: { label: 'Get Your Copy', href: site.book.amazon },
    image: '/wp-content/uploads/2024/03/Timber-and-Love-Design-Build-Luke-Caldwell-1-775x1024.jpg',
    imageAlt: 'Americana Soul, the debut design book by Luke Caldwell',
  },
  {
    key: 'partnerships',
    nav: 'Partnerships',
    eyebrow: 'Appearances · Partnerships · Press',
    title: 'Partnership Opportunities',
    serif: false,
    body: 'For appearances, brand partnerships, and press, reach out to our partnerships team. If your project is a good fit, we would love to talk.',
    image: '/wp-content/uploads/2024/05/Timber-and-Love-Home-Remodeling-Contractors-Boise-Boise-Boys-Season-2-Episode-9-Casa-De-Boise-Front-Exterior-scaled.jpg',
    imageAlt: 'A Timber and Love home featured on HGTV',
  },
] as const;

export default function PartnershipsFeature({ videoId = '927976789', poster = '/video-posters/927976789.jpg' }: { videoId?: string; poster?: string }) {
  const [active, setActive] = useState(0);
  const go = useCallback((n: number) => setActive((n + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setActive((v) => (v + 1) % SLIDES.length), 9000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden section-feature" aria-roledescription="carousel" aria-label="Americana Soul and Partnerships">
      <VideoBg videoId={videoId} poster={poster} overlay="bg-gradient-to-t from-ink via-ink/85 to-ink/60" />

      <div className="container-wide relative z-10 w-full">
        {/* Slides — stacked, cross-fading, shared split layout */}
        <div className="relative">
          {SLIDES.map((s, idx) => {
            const isActive = idx === active;
            return (
              <div
                key={s.key}
                aria-hidden={!isActive}
                className={`grid items-center gap-10 transition-opacity duration-700 ease-out lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 ${
                  isActive ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
                }`}
              >
                {/* Content */}
                <div>
                  <p className="eyebrow">{s.eyebrow}</p>
                  {s.serif ? (
                    <h2 className="mt-5 font-serif text-6xl italic leading-none text-cream sm:text-7xl lg:text-8xl">{s.title}</h2>
                  ) : (
                    <h2 className="h-section mt-5 text-cream">{s.title}</h2>
                  )}
                  <p className="mt-7 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg">{s.body}</p>

                  {'cta' in s && s.cta ? (
                    <a href={s.cta.href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-9" data-track="americana_soul">
                      {s.cta.label}
                    </a>
                  ) : (
                    <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
                      <a href={site.partnerships.phoneHref} className="group inline-flex flex-col">
                        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-cream/50">Call</span>
                        <span className="mt-1 text-lg text-cream link-underline">{site.partnerships.phone}</span>
                      </a>
                      <a href={`mailto:${site.partnerships.email}`} className="group inline-flex flex-col">
                        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-cream/50">Email</span>
                        <span className="mt-1 text-lg text-cream link-underline">{site.partnerships.email}</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Framed image */}
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden border border-border-subtle shadow-2xl shadow-black/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.imageAlt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Labeled navigation */}
        <div className="mt-14 flex items-center gap-8">
          {SLIDES.map((s, idx) => (
            <button
              key={s.key}
              onClick={() => go(idx)}
              aria-current={idx === active}
              className={`pb-1 text-xs uppercase tracking-[0.16em] transition-colors ${
                idx === active ? 'border-b border-cream text-cream' : 'border-b border-transparent text-cream/40 hover:text-cream/75'
              }`}
            >
              <span className="mr-2 text-cream/40">0{idx + 1}</span>
              {s.nav}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
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
