'use client';

import { useState } from 'react';

/** Click-to-play inline Vimeo player with a poster (mirrors the live intro video). */
export default function InlineVideo({
  videoId,
  poster,
  className = '',
}: {
  videoId: string;
  poster: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-ink ${className}`}>
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
          title="Timber and Love"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label="Play video"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" className="h-full w-full object-cover" loading="lazy" />
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
