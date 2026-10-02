import Reveal from '@/components/ui/Reveal';
import VideoBg from '@/components/ui/VideoBg';

/** Standard interior-page hero: full-bleed image or background video, dark overlay, eyebrow + title. */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  videoId,
  height = 'tall',
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  videoId?: string;
  height?: 'tall' | 'short';
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`media-card relative isolate flex items-center justify-center overflow-hidden bg-bg-primary ${
        height === 'tall'
          ? 'min-h-[58vh] py-24 sm:min-h-[68vh] sm:py-32'
          : 'min-h-[42vh] py-20 sm:min-h-[48vh] sm:py-28'
      }`}
    >
      {videoId ? (
        <>
          <VideoBg videoId={videoId} poster={image} overlay="bg-gradient-to-b from-ink/80 via-ink/60 to-ink/90" />
        </>
      ) : (
        <>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/60 to-ink/90" />
        </>
      )}
      {/* Center vignette guarantees legible headings over any image brightness. */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_60%_at_center,rgba(11,11,12,0.55),transparent_75%)]" />
      {/* container-wide matches every page body below, so hero and content
          share one left edge instead of stepping in and out on scroll. */}
      <Reveal className="container-wide relative z-10 pt-12 text-center">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="h-page mx-auto mt-4 max-w-4xl text-cream">{title}</h1>
        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-body">{subtitle}</p>}
        {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-4">{children}</div>}
      </Reveal>
    </section>
  );
}
