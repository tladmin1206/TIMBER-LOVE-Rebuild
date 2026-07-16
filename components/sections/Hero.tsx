import HeroVideo from '@/components/ui/HeroVideo';
import RotatingText from '@/components/ui/RotatingText';
import StatCounter from '@/components/ui/StatCounter';
import LogoMarquee from '@/components/ui/LogoMarquee';
import { heroRotating, heroVideoId, stats, pressLogos } from '@/lib/content/home';

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      {/* Background Vimeo video + dark overlay (mirrors the live Elementor hero) */}
      <HeroVideo videoId={heroVideoId} poster="/video-posters/953577619.jpg" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink/90" />

      {/* Left-aligned hero content (mirrors the live hero) */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="container-wide w-full pt-24 text-left">
          <h1 className="h-display animate-fadeUp text-5xl text-cream sm:text-7xl lg:text-8xl">Timber and Love</h1>
          <p className="mt-4 animate-fadeUp text-lg uppercase tracking-brand text-cream/85 [animation-delay:120ms] sm:text-2xl">
            <RotatingText words={heroRotating} />
          </p>

          {/* Inline stat counters */}
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4 sm:gap-x-6">
            {stats.map((s) => (
              <StatCounter key={s.label} align="left" {...s} />
            ))}
          </div>

          <p className="mt-10 max-w-xl animate-fadeUp text-sm text-cream/85 [animation-delay:240ms] sm:text-base">
            Looking to build, remodel, buy, sell, or rent? Our team is here to help you every step of the way. Trust our
            expertise to create your perfect, personalized space.
          </p>
        </div>
      </div>

      {/* Press-logo strip pinned to the bottom of the hero */}
      <div className="relative z-10 border-t border-cream/10 bg-ink/40 py-6 backdrop-blur-sm">
        <div className="container-wide">
          <LogoMarquee logos={pressLogos} />
        </div>
      </div>
    </section>
  );
}
