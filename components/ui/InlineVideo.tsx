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
 * it is reached.
 *
 * The poster and play button stay on top until Vimeo confirms the film is
 * actually playing. A player that cannot start (embedding refused on this
 * domain, autoplay blocked, a slow connection) therefore never shows as an
 * empty box: the visitor keeps the poster and can press play themselves.
 * Visitors who prefer reduced motion get the poster and play button only.
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
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [load, setLoad] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [manual, setManual] = useState(false);

  // Start loading the player the first time the frame is seen.
  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') {
      setLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reveal the player only once playback is confirmed.
  useEffect(() => {
    if (!load || manual || !frame.current) return;
    let alive = true;
    let instance: import('@vimeo/player').default | undefined;
    import('@vimeo/player').then(({ default: VimeoPlayer }) => {
      if (!alive || !frame.current) return;
      instance = new VimeoPlayer(frame.current);
      const playing = () => {
        if (alive) setConfirmed(true);
      };
      instance.on('playing', playing);
      instance.on('timeupdate', playing);
    });
    return () => {
      alive = false;
      instance?.off('playing');
      instance?.off('timeupdate');
    };
  }, [load, manual]);

  const visible = confirmed || manual;

  return (
    <div ref={box} className={`media-card relative aspect-video w-full overflow-hidden bg-bg-primary ${className}`}>
      {(load || manual) && (
        <iframe
          ref={frame}
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=${manual ? 0 : 1}&loop=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      )}
      {!visible && (
        <button
          type="button"
          onClick={() => { setManual(true); trackEvent('video_play_requested', { provider: 'vimeo', video_id: videoId }); } }
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
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
