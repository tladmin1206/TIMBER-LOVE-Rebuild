'use client';

import { useEffect, useState } from 'react';

/**
 * Full-bleed Vimeo background video that mirrors the live Elementor hero.
 * The poster image shows immediately (and is the reduced-motion / no-JS
 * fallback); the muted, looping background player fades in once mounted.
 */
export default function HeroVideo({
  videoId,
  poster,
}: {
  videoId: string;
  poster: string;
}) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    // Defer the iframe a tick so the poster paints first (no black flash).
    const t = setTimeout(() => setShowVideo(true), 100);
    return () => clearTimeout(t);
  }, []);

  const src =
    `https://player.vimeo.com/video/${videoId}` +
    `?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1&title=0&byline=0&portrait=0`;

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden>
      {/* Poster / fallback */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      {/* Vimeo background player, scaled to cover (16:9) */}
      {showVideo && (
        <iframe
          src={src}
          title=""
          tabIndex={-1}
          allow="autoplay; fullscreen"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
        />
      )}
    </div>
  );
}
