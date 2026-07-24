'use client';

import { useState } from 'react';
import Stars from '@/components/ui/Stars';
import type { Testimonial } from '@/lib/content/types';

/**
 * Continuous marquee of review cards.
 *
 * Pauses while hovered (desktop) or touched (mobile), and resumes on leave, so
 * a reader can hold a card still without any visible control. The duplicated
 * half of the track exists only to make the loop seamless and is hidden from
 * assistive technology; a visually hidden list carries the reviews so they are
 * never absent from the accessibility tree or from crawlers. Under reduced
 * motion the global CSS rule halts the animation.
 */
export default function ReviewSlider({ items, duration = 55 }: { items: Testimonial[]; duration?: number }) {
  const [paused, setPaused] = useState(false);
  const cards = [...items, ...items];

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused((p) => !p)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink to-transparent sm:w-24" />
        <div
          aria-hidden
          className="flex w-max animate-marquee gap-5 py-1"
          style={{ animationDuration: `${duration}s`, animationPlayState: paused ? 'paused' : 'running' }}
        >
          {cards.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>
      </div>

      {/* The visible track is aria-hidden, so the reviews are exposed here. */}
      <ul className="sr-only">
        {items.map((r) => (
          <li key={r.name}>
            {r.quote}. {r.name}, {r.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <figure className="surface-card-glass flex w-[300px] shrink-0 flex-col p-6 text-left sm:w-[380px]">
      <div className="flex items-center justify-between">
        <Stars rating={5} size="sm" />
        <span className="text-[0.65rem] uppercase tracking-[0.14em] text-text-muted">Google</span>
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-text-secondary">“{review.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border-subtle pt-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-sm text-accent">
          {review.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm text-cream">{review.name}</span>
          <span className="block text-xs uppercase tracking-[0.12em] text-text-muted">{review.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
