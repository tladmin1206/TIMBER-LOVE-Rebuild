'use client';
import SiteImage from '@/components/ui/SiteImage';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useDialogFocus } from '@/components/hooks/useDialogFocus';

export type GalleryImage = { src: string; alt: string };

export default function Gallery({
  images,
  columns = 3,
}: {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}) {
  const dialog = useRef<HTMLDivElement>(null);
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

  useDialogFocus(index !== null, dialog);
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
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
      {/* Phones get an editorial rhythm rather than one long column: a full
          width frame, then a pair, repeating. A photo that would be left alone
          in a pair row runs full width so the grid never ends on a gap. */}
      <div className={`grid grid-cols-2 gap-2 sm:gap-4 ${colCls}`}>
        {images.map((img, i) => {
          const wide = i % 3 === 0 || (i % 3 === 1 && i === images.length - 1);
          return (
          <button
            key={img.src + i}
            onClick={() => setIndex(i)}
            className={`group relative overflow-hidden bg-surface sm:col-span-1 sm:aspect-[4/3] ${wide ? 'col-span-2 aspect-[4/3]' : 'aspect-[4/5]'}`}
            aria-label={`View image: ${img.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <SiteImage
              src={img.src}
              alt={img.alt}
              loading="lazy"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/20" />
          </button>
          );
        })}
      </div>

      {index !== null && (
        <div
          className="media-card fixed inset-0 z-[120] flex items-center justify-center bg-ink/95 p-4 animate-fadeIn"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label="Project photo gallery"
        >
          <button onClick={close} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-12 w-12 place-items-center text-4xl leading-none text-cream/80 hover:text-cream sm:right-5 sm:top-5">
            ×
          </button>
          <button onClick={prev} aria-label="Previous" className="absolute left-1 top-1/2 z-10 grid h-14 w-12 -translate-y-1/2 place-items-center text-4xl text-cream/80 hover:text-cream sm:left-8">
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <SiteImage src={images[index].src} alt={images[index].alt} sizes="100vw" className="max-h-[82vh] max-w-full object-contain sm:max-w-[86vw]" />
          <button onClick={next} aria-label="Next" className="absolute right-1 top-1/2 z-10 grid h-14 w-12 -translate-y-1/2 place-items-center text-4xl text-cream/80 hover:text-cream sm:right-8">
            ›
          </button>
        </div>
      )}
    </>
  );
}
