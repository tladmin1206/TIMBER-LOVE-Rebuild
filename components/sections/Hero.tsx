import HeroVideo from '@/components/ui/HeroVideo';
import Cta from '@/components/ui/Cta';
import { heroVideoId } from '@/lib/content/home';

/**
 * Homepage hero. Establishes the parent brand — not a remodeling-only firm —
 * and routes visitors toward the service pathway selector. Deliberately
 * restrained: one eyebrow, one H1, supporting copy, a primary + secondary CTA,
 * and a single credibility marker. No stat overload, logo marquee, or six
 * competing actions.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink">
      <HeroVideo videoId={heroVideoId} poster="/video-posters/953577619.jpg" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink/90" />

      <div className="relative z-10 flex flex-1 items-center">
        <div className="container-wide w-full pt-24 text-left">
          <p className="eyebrow animate-fadeUp text-cream/80">Design. Build. Buy. Sell. Invest. Stay.</p>
          <h1 className="h-display mt-5 max-w-4xl animate-fadeUp text-4xl text-cream [animation-delay:100ms] sm:text-6xl lg:text-7xl">
            Every Stage of Home and Real Estate. One Trusted Team.
          </h1>
          <p className="mt-6 max-w-xl animate-fadeUp text-base text-cream/85 [animation-delay:200ms] sm:text-lg">
            Timber and Love brings together design, construction, real estate, direct home offers, investment, and
            distinctive vacation stays. One connected Boise team for every stage of home.
          </p>

          <div className="mt-9 flex animate-fadeUp flex-wrap items-center gap-4 [animation-delay:300ms]">
            <Cta href="#pathways" variant="primary" track="hero_find_service">
              Find the Right Service
            </Cta>
            <Cta href="/timber-and-love-gallery/" variant="secondary" track="hero_explore_work">
              Explore Our Work
            </Cta>
          </div>

          <p className="mt-8 animate-fadeUp text-xs uppercase tracking-[0.16em] text-cream/60 [animation-delay:400ms]">
            Founded by Luke Caldwell of HGTV&apos;s Boise Boys
          </p>
        </div>
      </div>
    </section>
  );
}
