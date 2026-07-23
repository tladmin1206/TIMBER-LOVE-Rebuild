'use client';

import { useState } from 'react';

type Logo = { src: string; alt: string };

/**
 * Infinite horizontal marquee of press logos.
 *
 * Pauses on hover and on keyboard focus, and carries an explicit stop control —
 * auto-moving content lasting more than five seconds needs a pause mechanism,
 * and hover alone provides none on touch devices.
 */
export default function LogoMarquee({ logos }: { logos: Logo[] }) {
  const [paused, setPaused] = useState(false);
  const doubled = [...logos, ...logos];

  return (
    <div className="group relative">
      <div className="overflow-hidden">
        <div
          className="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] sm:gap-24"
          style={paused ? { animationPlayState: 'paused' } : undefined}
        >
          {doubled.map((l, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={l.src}
              alt={i >= logos.length ? '' : l.alt}
              className="h-11 w-auto shrink-0 object-contain opacity-80 transition hover:opacity-100 sm:h-16"
              loading="lazy"
              aria-hidden={i >= logos.length}
            />
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          className="link-underline text-[0.7rem] uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-cream"
        >
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
}
