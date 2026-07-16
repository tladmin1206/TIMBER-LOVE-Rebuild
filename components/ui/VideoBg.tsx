'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Lazy full-bleed Vimeo background video with a poster + dark overlay.
 * Loads the iframe only when scrolled near view (mirrors Elementor's lazy bg video).
 */
export default function VideoBg({
  videoId,
  poster,
  overlay = 'bg-ink/55',
}: {
  videoId: string;
  poster: string;
  overlay?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const src =
    `https://player.vimeo.com/video/${videoId}` +
    `?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1&title=0&byline=0&portrait=0`;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-ink" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      {show && (
        <iframe
          src={src}
          title=""
          tabIndex={-1}
          allow="autoplay; fullscreen"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
        />
      )}
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
