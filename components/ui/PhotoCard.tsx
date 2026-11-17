import ContainedImage from '@/components/ui/ContainedImage';
import SiteImage from '@/components/ui/SiteImage';
import type { ReactNode } from 'react';

/**
 * The site's standard media card: a photograph on top, copy on a solid
 * surface beneath it.
 *
 * Copy never sits on the photograph. Overlaying text meant every image needed
 * a heavy dark wash to stay legible, which hid the photography the card exists
 * to show and left half of each card as empty gradient on a phone. Separating
 * the two keeps the image clean and the text readable at every width, and it
 * matches the project and rental cards so all cards read as one family.
 */
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
    <div className={`photo-card flex h-full min-w-0 flex-col overflow-hidden border border-border-subtle bg-surface/40 ${className}`}>
      <div className="relative aspect-[3/2] shrink-0 overflow-hidden bg-ink">
        {/* Decorative photography supports the adjacent heading. */}
        {contain ? (
          <ContainedImage src={image} alt="" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" position={imagePosition} />
        ) : (
          <SiteImage
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            src={image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            style={{ objectPosition: imagePosition }}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">{children}</div>
    </div>
  );
}
