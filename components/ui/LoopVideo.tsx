'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Self-hosted, muted, continuously looping film in a 16:9 frame.
 *
 * Replaces the Vimeo player for short silent clips so the film starts fast
 * and loops with no player chrome. Nothing is downloaded until the frame
 * nears the viewport (preload="none" plus an IntersectionObserver); phones
 * get the 720p file through the <source media> query, larger screens the
 * 1080p file, WebM first where the browser supports it.
 *
 * Visitors who prefer reduced motion see the poster with native controls
 * and no autoplay.
 */
export type LoopVideoSources = {
  webm1080?: string;
  mp41080: string;
  webm720?: string;
  mp4720?: string;
};

export default function LoopVideo({
  sources,
  poster,
  className = '',
  title = 'Timber + Love',
}: {
  sources: LoopVideoSources;
  poster: string;
  className?: string;
  title?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    const start = () => {
      el.muted = true;
      el.play().catch(() => {
        /* autoplay refused: the poster stays and the visitor can press play */
        el.controls = true;
      });
    };
    if (typeof IntersectionObserver === 'undefined') {
      el.preload = 'auto';
      start();
      return;
    }
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!started) {
            started = true;
            el.preload = 'auto';
            el.load();
          }
          start();
        } else if (started) {
          el.pause();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mobile = '(max-width: 767px)';

  return (
    <div className={`media-card relative aspect-video w-full overflow-hidden bg-bg-primary ${className}`}>
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        controls={reduced}
        disablePictureInPicture
        disableRemotePlayback
        aria-label={title}
      >
        {sources.webm720 && <source src={sources.webm720} type="video/webm" media={mobile} />}
        {sources.mp4720 && <source src={sources.mp4720} type="video/mp4" media={mobile} />}
        {sources.webm1080 && <source src={sources.webm1080} type="video/webm" />}
        <source src={sources.mp41080} type="video/mp4" />
      </video>
    </div>
  );
}
