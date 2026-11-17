import type { ImgHTMLAttributes } from 'react';

const WIDTHS = [384, 640, 750, 828, 1080, 1200, 1920];
const optimizable = (path: string) => path.startsWith('/') && /\.(jpe?g|png|webp)$/i.test(path);
const rendition = (path: string, width: number) => `/_next/image?url=${encodeURIComponent(path)}&w=${width}&q=80`;
const srcSetFor = (path: string) => WIDTHS.map((w) => `${rendition(path, w)} ${w}w`).join(', ');

/**
 * Responsive local photography, optimized by Next without changing its composition.
 *
 * `mobileSrc` is art direction, not resolution switching: a phone gets a
 * different photograph (usually a portrait frame) instead of a landscape one
 * cropped down to a sliver. The browser picks one source, so only one image is
 * ever downloaded.
 */
export default function SiteImage({
  src,
  mobileSrc,
  sizes = '(min-width: 1280px) 1200px, 100vw',
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { mobileSrc?: string }) {
  const path = typeof src === 'string' ? src : '';
  const optimize = optimizable(path);
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ''}
      decoding={props.decoding ?? 'async'}
      src={optimize ? rendition(path, 1200) : src}
      srcSet={optimize ? srcSetFor(path) : undefined}
      sizes={optimize ? sizes : undefined}
    />
  );
  if (!mobileSrc || !optimizable(mobileSrc)) return img;
  return (
    <picture className="contents">
      <source media="(max-width: 767px)" srcSet={srcSetFor(mobileSrc)} sizes="100vw" />
      {img}
    </picture>
  );
}
