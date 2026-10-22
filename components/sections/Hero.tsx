import HeroVideo from '@/components/ui/HeroVideo';
import StatCounter from '@/components/ui/StatCounter';
import Cta from '@/components/ui/Cta';
import { heroVideoId, heroVideoPoster, stats } from '@/lib/content/home';

/**
 * Homepage hero. Leads with the single thing a stranger needs to understand in
 * the first three seconds: Timber and Love is a luxury design + build firm. The
 * old rotating line cycled through every vertical (realty, rentals, cash
 * offers), which read as a grab-bag and buried what we primarily do. The
 * positioning line is now fixed and plain; the other verticals live further
 * down the page and in the footer.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-bg-primary">
      <HeroVideo videoId={heroVideoId} poster={heroVideoPoster} />
      {/* Original-style overlay: darkens behind the left-aligned content while
          revealing the interior video toward the right, plus a soft vertical
          vignette for legibility of the top nav and content. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/40" />

      <div className="relative z-10 flex flex-1 items-center">
        <div className="container-wide w-full pt-24 text-left">
          <h1 className="h-hero animate-fadeUp text-cream">Timber + Love</h1>
          <p className="mt-4 max-w-2xl animate-fadeUp text-base uppercase tracking-brand text-cream/85 [animation-delay:120ms] sm:text-xl">
            Treasure Valley&apos;s Leading Luxury Design + Build Firm
          </p>

          {/* Brand stat counters */}
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-8 sm:max-w-2xl sm:grid-cols-4 sm:gap-x-10">
            {stats.map((s) => (
              <StatCounter key={s.label} align="left" size="md" {...s} />
            ))}
          </div>

          <p className="mt-10 max-w-xl animate-fadeUp text-sm text-cream/85 [animation-delay:240ms] sm:text-base">
            We design and build custom homes and luxury remodels across the Treasure Valley. One team, from the first
            drawing to the final walkthrough. Custom, never semi-custom.
          </p>

          <div className="mt-9 flex animate-fadeUp flex-wrap items-center gap-4 [animation-delay:340ms]">
            <Cta href="/design-and-build-questionnaire/" variant="primary" track="hero_plan_project">
              Start a Project
            </Cta>
            <Cta href="/timber-and-love-gallery/" variant="secondary" track="hero_explore_work">
              See Our Work
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
