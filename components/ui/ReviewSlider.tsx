'use client';

import { useEffect, useState } from 'react';
import Stars from '@/components/ui/Stars';
import type { Testimonial } from '@/lib/content/types';

/**
 * Continuous slider of review cards.
 *
 * Motion is pausable and the reviews are reachable at the reader's own pace:
 * pausing switches the track to a natively scrollable, keyboard-focusable
 * region. Previously the marquee ran indefinitely with no stop control and its
 * content could not be reached by keyboard, so the reviews were effectively
 * unreadable for anyone who could not read them at scroll speed.
 *
 * The duplicated half of the track exists only to make the loop seamless and is
 * hidden from assistive technology; a visually hidden list carries the reviews
 * while the marquee is running.
 */
export default function ReviewSlider({ items, duration = 55 }: { items: Testimonial[]; duration?: number }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Under reduced motion the track never animates, so it must be scrollable
  // from the outset rather than requiring a pause first.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const still = paused || reduced;
  const cards = still ? items : [...items, ...items];

  return (
    <div className="relative">
      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink to-transparent sm:w-24" />

        {still ? (
          <div
            role="region"
            aria-label="Client reviews"
            tabIndex={0}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
          >
            {cards.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>
        ) : (
          <div
            aria-hidden
            className="flex w-max animate-marquee gap-5 py-1 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
            style={{ animationDuration: `${duration}s` }}
          >
            {cards.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>
        )}
      </div>

      {/* The visible track is hidden from assistive tech while animating, so the
          reviews are exposed here instead. */}
      {!still && (
        <ul className="sr-only">
          {items.map((r) => (
            <li key={r.name}>
              {r.quote}: {r.name}, {r.role}
            </li>
          ))}
        </ul>
      )}

      {!reduced && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-pressed={paused}
            className="link-underline text-[0.7rem] uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-cream"
          >
            {paused ? 'Resume Scrolling' : 'Pause to Read'}
          </button>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <figure className="surface-card-glass flex w-[300px] shrink-0 snap-start flex-col p-6 text-left sm:w-[380px]">
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
