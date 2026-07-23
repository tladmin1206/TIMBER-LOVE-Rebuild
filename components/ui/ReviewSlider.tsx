'use client';

import Stars from '@/components/ui/Stars';
import type { Testimonial } from '@/components/ui/Testimonials';

/**
 * Continuous, seamless-loop slider of review cards (marquee style). The track is
 * duplicated so the loop is seamless; it pauses on hover and, under
 * prefers-reduced-motion, the global CSS rule holds it static. Edge fades keep
 * the ends soft against the dark background.
 */
export default function ReviewSlider({ items, duration = 55 }: { items: Testimonial[]; duration?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink to-transparent sm:w-24" />
      <div
        className="flex w-max animate-marquee gap-5 py-1 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((r, i) => (
          <figure
            key={i}
            aria-hidden={i >= items.length}
            className="flex w-[300px] shrink-0 flex-col surface-card-glass p-6 text-left sm:w-[380px]"
          >
            <div className="flex items-center justify-between">
              <Stars rating={5} size="sm" />
              <span className="text-[0.65rem] uppercase tracking-[0.14em] text-text-muted">Google</span>
            </div>
            <blockquote className="mt-4 line-clamp-6 text-sm leading-relaxed text-text-secondary">“{r.quote}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-border-subtle pt-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-sm text-accent">
                {r.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm text-cream">{r.name}</span>
                <span className="block text-xs uppercase tracking-[0.12em] text-text-muted">{r.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
