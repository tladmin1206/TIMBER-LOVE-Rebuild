'use client';

import { useCallback, useEffect, useState } from 'react';

export type GalleryImage = { src: string; alt: string };

export default function Gallery({
  images,
  columns = 3,
}: {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, close, prev, next]);

  const colCls =
    columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : columns === 2
      ? 'sm:grid-cols-2'
      : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <>
      <div className={`grid grid-cols-1 gap-3 sm:gap-4 ${colCls}`}>
        {images.map((img, i) => (
          <button
            key={img.src + i}
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden bg-panel"
            aria-label={`View image: ${img.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/20" />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/95 p-4 animate-fadeIn"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          role="dialog"
          aria-modal="true"
        >
          <button onClick={close} aria-label="Close" className="absolute right-5 top-5 text-4xl leading-none text-cream/80 hover:text-cream">
            ×
          </button>
          <button onClick={prev} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 px-4 text-4xl text-cream/70 hover:text-cream sm:left-8">
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[index].src} alt={images[index].alt} className="max-h-[85vh] max-w-[90vw] object-contain" />
          <button onClick={next} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 px-4 text-4xl text-cream/70 hover:text-cream sm:right-8">
            ›
          </button>
        </div>
      )}
    </>
  );
}
