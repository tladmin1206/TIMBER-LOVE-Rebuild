import type { ImgHTMLAttributes } from 'react';

/**
 * Widths rendered ahead of time by scripts/build-images.mjs. Keep in step
 * with WIDTHS there.
 */
const WIDTHS = [384, 640, 828, 1200, 1920];

/**
 * Photographs under these folders have static renditions in production.
 * Anything else (remote URLs, SVGs, uploads previewed from the browser) is
 * served as it is.
 */
const RENDERED = /^\/(brand|editorial|external|projects|rentals|shows|video-posters|wp-content)\/.+\.(jpe?g|png|webp)$/i;

// Renditions exist only after `npm run build`. In development the original
// file is used, so `next dev` needs no extra step.
const USE_RENDITIONS = process.env.NODE_ENV === 'production';

const optimizable = (path: string) => USE_RENDITIONS && RENDERED.test(path);
const rendition = (path: string, width: number) => `/_r/${width}${encodeURI(path)}.webp`;
const srcSetFor = (path: string) => WIDTHS.map((w) => `${rendition(path, w)} ${w}w`).join(', ');

/**
 * Responsive local photography without changing its composition.
 *
 * Sources are static WebP files generated at build time, not Next's on-demand
 * optimizer. On the autoscale deployment that optimizer left some first-time
 * resize requests unanswered, and the affected photographs then rendered as
 * empty boxes for every visitor. A static file cannot hang.
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
  if (!mobileSrc) return img;
  return (
    <picture className="contents">
      <source
        media="(max-width: 767px)"
        srcSet={optimizable(mobileSrc) ? srcSetFor(mobileSrc) : mobileSrc}
        sizes={optimizable(mobileSrc) ? '100vw' : undefined}
      />
      {img}
    </picture>
  );
}
