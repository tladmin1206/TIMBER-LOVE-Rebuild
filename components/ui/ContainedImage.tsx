import SiteImage from '@/components/ui/SiteImage';

/**
 * Shows a photograph whole inside a frame of a different shape.
 *
 * Portraits and artwork must keep their full composition (no cropped heads),
 * but letterboxing them on black left large empty bars that read as a broken
 * image. A soft, blurred copy of the same photograph fills the frame behind
 * the complete image instead, so the frame is always full and nothing is
 * cropped. The backdrop requests the smallest rendition; it is only a wash of
 * colour.
 *
 * The parent supplies the frame: `relative`, `overflow-hidden`, and a size.
 */
export default function ContainedImage({
  src,
  alt,
  sizes,
  position = 'center',
  loading = 'lazy',
  className = '',
}: {
  src: string;
  alt: string;
  sizes?: string;
  position?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}) {
  return (
    <>
      <SiteImage
        src={src}
        alt=""
        aria-hidden="true"
        sizes="96px"
        loading={loading}
        className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl"
      />
      <SiteImage
        src={src}
        alt={alt}
        sizes={sizes}
        loading={loading}
        style={{ objectPosition: position }}
        className={`absolute inset-0 h-full w-full object-contain ${className}`}
      />
    </>
  );
}
