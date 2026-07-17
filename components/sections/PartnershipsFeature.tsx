'use client';

import { useCallback, useEffect, useState } from 'react';
import VideoBg from '@/components/ui/VideoBg';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/lib/site';

/**
 * Cinematic, video-backed feature that slides between the Partnership
 * Opportunities and Americana Soul content — a refined recreation of the
 * original homepage's swiper section, with a background video playing behind.
 */
const BOOK_IMAGE = '/wp-content/uploads/2024/03/Timber-and-Love-Design-Build-Luke-Caldwell-1-775x1024.jpg';

export default function PartnershipsFeature({ videoId = '927976789', poster = '/video-posters/927976789.jpg' }: { videoId?: string; poster?: string }) {
  const [i, setI] = useState(0);
  const slides = 2;
  const go = useCallback((n: number) => setI((n + slides) % slides), []);

  // Gentle auto-advance (respects reduced motion).
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides), 9000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden py-24 sm:py-32" aria-roledescription="carousel" aria-label="Partnerships and Americana Soul">
      <VideoBg videoId={videoId} poster={poster} overlay="bg-gradient-to-r from-ink via-ink/80 to-ink/50" />

      <div className="container-wide relative z-10">
        {/* Slide 1 — Partnership Opportunities */}
        <div className={`transition-opacity duration-700 ${i === 0 ? 'opacity-100' : 'pointer-events-none absolute inset-0 flex items-center opacity-0'}`} aria-hidden={i !== 0}>
          <div className="container-wide max-w-2xl">
            <Reveal>
              <p className="eyebrow">Appearances · Partnerships · Press</p>
              <h2 className="h-display mt-4 text-4xl sm:text-6xl">Partnership Opportunities</h2>
              <p className="mt-6 max-w-xl text-body">
                For appearances, partnerships, and press, reach out to our partnerships team. Is your project a good
                fit? Let&apos;s talk.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-cream">
                <a href={site.partnerships.phoneHref} className="link-underline">{site.partnerships.phone}</a>
                <a href={`mailto:${site.partnerships.email}`} className="link-underline">{site.partnerships.email}</a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Slide 2 — Americana Soul */}
        <div className={`transition-opacity duration-700 ${i === 1 ? 'opacity-100' : 'pointer-events-none absolute inset-0 flex items-center opacity-0'}`} aria-hidden={i !== 1}>
          <div className="container-wide grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <p className="eyebrow italic">Luke&apos;s Debut Design Book</p>
              <h2 className="mt-4 font-serif text-5xl italic text-cream sm:text-7xl">Americana Soul</h2>
              <p className="mt-6 max-w-lg text-body">
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
            <Reveal delay={120} className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden border border-cream/15 shadow-2xl shadow-black/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BOOK_IMAGE} alt="Americana Soul by Luke Caldwell" className="h-full w-full object-cover" loading="lazy" />
            </Reveal>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center gap-5">
          <button onClick={() => go(i - 1)} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-cream/80 transition hover:border-cream hover:text-cream">
            ‹
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: slides }).map((_, n) => (
              <button
                key={n}
                onClick={() => go(n)}
                aria-label={`Go to slide ${n + 1}`}
                aria-current={i === n}
                className={`h-1.5 rounded-full transition-all ${i === n ? 'w-8 bg-cream' : 'w-2 bg-cream/30 hover:bg-cream/60'}`}
              />
            ))}
          </div>
          <button onClick={() => go(i + 1)} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-cream/80 transition hover:border-cream hover:text-cream">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
