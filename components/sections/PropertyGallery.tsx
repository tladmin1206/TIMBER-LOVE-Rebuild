'use client';
import SiteImage from '@/components/ui/SiteImage';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useDialogFocus } from '@/components/hooks/useDialogFocus';

export type GalleryImage = { src: string; alt: string };

/**
 * Airbnb-style property gallery: a primary image plus a supporting grid on
 * desktop, with a "Show all photos" action that opens a full-screen, keyboard-
 * and swipe-accessible lightbox (image count, close, prev/next). Only the
 * preview images load eagerly-ish; the rest lazy-load.
 */
export default function PropertyGallery({ images }: { images: GalleryImage[] }) {
  const dialog = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };
  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useDialogFocus(open, dialog);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, prev, next]);

  if (images.length === 0) return null;
  const preview = images.slice(0, 5);

  return (
    <>
      {/* Mosaic preview */}
      <div className="relative grid gap-2 overflow-hidden sm:grid-cols-4 sm:grid-rows-2">
        <button
          onClick={() => openAt(0)}
          className="group relative aspect-[4/3] overflow-hidden sm:col-span-2 sm:row-span-2 sm:aspect-auto"
          aria-label={`Open gallery: ${preview[0].alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <SiteImage src={preview[0].src} alt={preview[0].alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </button>
        {preview.slice(1, 5).map((img, i) => (
          <button
            key={img.src + i}
            onClick={() => openAt(i + 1)}
            className="group relative hidden aspect-[4/3] overflow-hidden sm:block"
            aria-label={`Open gallery: ${img.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <SiteImage src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          </button>
        ))}
        <button
          onClick={() => openAt(0)}
          className="absolute bottom-4 right-4 z-10 border border-cream/60 bg-ink/70 px-4 py-2 text-xs uppercase tracking-[0.14em] text-cream backdrop-blur transition hover:bg-bg-primary"
        >
          Show All {images.length} Photos
        </button>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="media-card fixed inset-0 z-[120] flex flex-col bg-ink/95 animate-fadeIn"
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label="Property photo gallery"
        >
          <div className="flex items-center justify-between p-4 text-cream">
            <span className="text-sm tracking-[0.14em]">{index + 1} / {images.length}</span>
            <button ref={closeBtn} onClick={close} aria-label="Close gallery" className="min-h-11 min-w-11 text-3xl leading-none text-cream/80 hover:text-cream">
              ×
            </button>
          </div>
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center p-4"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (dx > 40) prev();
              else if (dx < -40) next();
              touchX.current = null;
            }}
          >
            <button onClick={prev} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 px-4 text-4xl text-cream/70 hover:text-cream sm:left-8">
              ‹
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <SiteImage src={images[index].src} alt={images[index].alt} className="max-h-full max-w-[92vw] object-contain" />
            <button onClick={next} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 px-4 text-4xl text-cream/70 hover:text-cream sm:right-8">
              ›
            </button>
          </div>
          <p className="p-4 text-center text-xs text-cream/70">{images[index].alt}</p>
        </div>
      )}
    </>
  );
}
