import HeroVideo from '@/components/ui/HeroVideo';
import RotatingText from '@/components/ui/RotatingText';
import StatCounter from '@/components/ui/StatCounter';
import Cta from '@/components/ui/Cta';
import { heroVideoId, heroVideoPoster, heroRotating, stats } from '@/lib/content/home';

/**
 * Homepage hero — restored to the original composition: the "Timber and Love"
 * headline with a rotating service line, the brand stat counters, and
 * supporting copy over the interior background video, with the original-style
 * left-weighted overlay. Primary/secondary CTAs are kept for conversion.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      <HeroVideo videoId={heroVideoId} poster={heroVideoPoster} />
      {/* Original-style overlay: darkens behind the left-aligned content while
          revealing the interior video toward the right, plus a soft vertical
          vignette for legibility of the top nav and content. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/40" />

      <div className="relative z-10 flex flex-1 items-center">
        <div className="container-wide w-full pt-24 text-left">
          <h1 className="h-display animate-fadeUp text-5xl text-cream sm:text-7xl lg:text-8xl">Timber and Love</h1>
          <p className="mt-4 animate-fadeUp text-lg uppercase tracking-brand text-cream/85 [animation-delay:120ms] sm:text-2xl">
            <RotatingText words={heroRotating} />
          </p>

          {/* Brand stat counters */}
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4 sm:gap-x-6">
            {stats.map((s) => (
              <StatCounter key={s.label} align="left" {...s} />
            ))}
          </div>

          <p className="mt-10 max-w-xl animate-fadeUp text-sm text-cream/85 [animation-delay:240ms] sm:text-base">
            Looking to build, remodel, buy, sell, invest, or book a stay? One connected Boise team is here to help at
            every stage of home and real estate.
          </p>

          <div className="mt-9 flex animate-fadeUp flex-wrap items-center gap-4 [animation-delay:340ms]">
            <Cta href="#pathways" variant="primary" track="hero_find_service">
              Find the Right Service
            </Cta>
            <Cta href="/timber-and-love-gallery/" variant="secondary" track="hero_explore_work">
              Explore Our Work
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
