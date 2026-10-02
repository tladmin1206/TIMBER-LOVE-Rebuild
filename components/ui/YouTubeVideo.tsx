"use client";
import { useState } from "react";
export default function YouTubeVideo({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="media-card">
      <div className="relative aspect-video overflow-hidden bg-ink">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0"
            aria-label={`Play ${title}`}
          >
            {/* Video thumbnails retain the whole composition, including faces. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/shows/${id}.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-contain"
            />
            <span className="absolute inset-0 grid place-items-center bg-black/10">
              <span
                className="grid h-16 w-16 place-items-center rounded-full border border-white/70 bg-black/75 text-xl text-white transition-transform group-hover:scale-110"
                aria-hidden="true"
              >
                ▶
              </span>
            </span>
          </button>
        )}
      </div>
      <a
        className="mt-3 inline-flex min-h-11 items-center text-[11px] uppercase tracking-widest text-inherit underline underline-offset-4"
        href={`https://www.youtube.com/watch?v=${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch on YouTube ↗
      </a>
    </div>
  );
}
