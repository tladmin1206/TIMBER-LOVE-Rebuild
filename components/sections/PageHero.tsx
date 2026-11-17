import SiteImage from '@/components/ui/SiteImage';
import Reveal from '@/components/ui/Reveal';
import VideoBg from '@/components/ui/VideoBg';

/**
 * Standard interior-page hero: full-bleed photograph (optionally with a film
 * behind a Play control), eyebrow, title, and actions.
 *
 * Shares one composition with the homepage hero. The photograph owns the top
 * of the frame and the copy is anchored bottom left, on the same left edge as
 * the page body beneath it. The overlay is a floor of ink under the copy and a
 * soft cap under the header, so the middle of the photograph stays clear and
 * the image is actually seen rather than buried under a uniform dark wash.
 *
 * `imageMobile` swaps in a portrait photograph on phones when a landscape
 * frame would crop to something unrecognisable.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageMobile,
  imagePosition = 'center',
  videoId,
  height = 'tall',
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageMobile?: string;
  imagePosition?: string;
  videoId?: string;
  height?: 'tall' | 'short';
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`media-card relative isolate flex flex-col justify-end overflow-hidden bg-ink ${
        height === 'tall' ? 'min-h-[82svh] lg:min-h-[86vh]' : 'min-h-[64svh] lg:min-h-[68vh]'
      }`}
    >
      {videoId ? (
        <VideoBg videoId={videoId} poster={image} posterMobile={imageMobile} position={imagePosition === 'top' ? 'top' : 'center'} priority overlay="" />
      ) : (
        image && (
          <SiteImage
            sizes="100vw"
            src={image}
            mobileSrc={imageMobile}
            fetchPriority="high"
            loading="eager"
            alt=""
            aria-hidden
            style={{ objectPosition: imagePosition }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/80 via-[52%] to-ink/15 to-[92%] lg:via-ink/65 lg:via-[40%] lg:to-ink/10 lg:to-[80%]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-ink/60 via-ink/15 to-transparent lg:block" />

      <Reveal className="container-wide relative z-10 w-full pb-10 pt-[calc(var(--header-h,88px)+5rem)] sm:pb-14 lg:pb-16">
        {eyebrow && <p className="eyebrow text-cream/80">{eyebrow}</p>}
        <h1 className="h-page mt-4 max-w-4xl text-cream">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-body-lg">{subtitle}</p>}
        {children && <div className="cta-row mt-8">{children}</div>}
      </Reveal>
    </section>
  );
}
