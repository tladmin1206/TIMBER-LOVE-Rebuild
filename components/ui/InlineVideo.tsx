'use client';

import { trackEvent } from '@/lib/analytics';
import { useEffect, useRef, useState } from 'react';

/**
 * Inline Vimeo film in a 16:9 frame.
 *
 * Plays on its own once it scrolls into view: muted and looping, as browsers
 * require for unprompted playback, with Vimeo's controls available so a
 * visitor can turn the sound on, scrub, or go full screen. The player is only
 * added on first sight, so a film further down the page costs nothing until
 * it is reached. Visitors who prefer reduced motion keep the poster and a
 * play button instead.
 */
export default function InlineVideo({
  videoId,
  poster,
  className = '',
  title = 'Timber + Love',
}: {
  videoId: string;
  poster: string;
  className?: string;
  title?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const el = frame.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') {
      setPlaying(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frame} className={`media-card relative aspect-video w-full overflow-hidden bg-bg-primary ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-contain" loading="lazy" />
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=${manual ? 0 : 1}&loop=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => { setManual(true); setPlaying(true); trackEvent('video_play_requested', { provider: 'vimeo', video_id: videoId }); } }
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play ${title}`}
        >
          <span className="absolute inset-0 flex items-center justify-center bg-ink/25 transition group-hover:bg-ink/10">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-cream/70 bg-ink/40 backdrop-blur transition group-hover:scale-105">
              <span className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-cream" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
