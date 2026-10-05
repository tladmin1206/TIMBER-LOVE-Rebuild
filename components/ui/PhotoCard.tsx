import SiteImage from '@/components/ui/SiteImage';
import type { ReactNode } from 'react';

/** A clear photographic opening, with a dark reading surface behind the copy. */
export default function PhotoCard({
  image,
  imagePosition = 'center',
  contain = false,
  children,
  className = '',
}: {
  image: string;
  imagePosition?: string;
  contain?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`photo-card media-card relative isolate flex h-full min-w-0 min-h-[25rem] flex-col overflow-hidden border border-border-subtle bg-ink ${className}`}>
      {/* Decorative photography supports the adjacent service heading. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <SiteImage sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" src={image} alt="" aria-hidden="true" loading="lazy" decoding="async"
        style={{ objectPosition: imagePosition }}
        className={`pointer-events-none absolute inset-0 h-full w-full ${contain ? 'object-contain' : 'object-cover'}`} />
      <div aria-hidden="true" className="photo-card-overlay pointer-events-none absolute inset-0" />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col px-6 pb-7 pt-40 sm:px-8 sm:pb-8">
        {children}
      </div>
    </div>
  );
}
