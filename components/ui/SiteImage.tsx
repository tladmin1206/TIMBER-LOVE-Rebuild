import type { ImgHTMLAttributes } from 'react';

/** Responsive local photography, optimized by Next without changing its composition. */
export default function SiteImage({ src, sizes = '(min-width: 1280px) 1200px, 100vw', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const path = typeof src === 'string' ? src : '';
  const optimize = path.startsWith('/') && /\.(jpe?g|png|webp)$/i.test(path);
  const widths = [384, 640, 750, 828, 1080, 1200, 1920];
  const url = (width: number) => `/_next/image?url=${encodeURIComponent(path)}&w=${width}&q=80`;
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt ?? ''} decoding={props.decoding ?? 'async'} src={optimize ? url(1200) : src} srcSet={optimize ? widths.map(w => `${url(w)} ${w}w`).join(', ') : undefined} sizes={optimize ? sizes : undefined} />;
}
