'use client';

import { useState } from 'react';

type Logo = { src: string; alt: string };

/**
 * Infinite horizontal marquee of press logos.
 *
 * Pauses while hovered (desktop) or touched (mobile), and resumes on leave.
 * No visible control: the interaction is the control. Under reduced motion the
 * global CSS rule halts the animation entirely.
 */
export default function LogoMarquee({ logos }: { logos: Logo[] }) {
  const [paused, setPaused] = useState(false);
  const doubled = [...logos, ...logos];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused((p) => !p)}
    >
      <div
        className="flex w-max animate-marquee items-center gap-16 sm:gap-24"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
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
  );
}
