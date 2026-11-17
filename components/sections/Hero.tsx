import VideoBg from '@/components/ui/VideoBg';
import StatCounter from '@/components/ui/StatCounter';
import Cta from '@/components/ui/Cta';
import { heroVideoId, heroStill, heroStillMobile, stats } from '@/lib/content/home';

/**
 * Homepage hero. Leads with the single thing a stranger needs to understand in
 * the first three seconds: Timber and Love is a luxury design + build firm.
 *
 * Composed mobile first. The photograph owns the top of the screen and the
 * copy is anchored to the bottom, so on a phone the first impression is the
 * work itself, with the name, the positioning line, and both actions all
 * inside the first screen. Phones get a portrait photograph; wider screens get
 * a landscape one. The film is still one tap away.
 *
 * The track record sits in the hero on large screens, where there is room for
 * a single row. On smaller screens it becomes its own strip directly beneath,
 * so it never pushes the calls to action below the fold.
 */
export default function Hero() {
  return (
    <>
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
        <VideoBg
          videoId={heroVideoId}
          poster={heroStill}
          posterMobile={heroStillMobile}
          overlay=""
          control="hero"
          priority
        />
        {/* Legibility: a floor of ink under the copy, a soft cap under the
            header, and on wide screens a gentle left weight behind the text.
            The middle of the photograph is left clear. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/75 via-[42%] to-transparent to-[78%] lg:via-ink/45 lg:via-[38%]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-ink/70 via-ink/25 to-transparent lg:block" />

        <div className="hero-safe-bottom container-wide relative z-10 w-full pt-[calc(var(--header-h,88px)+4rem)]">
          <p className="eyebrow animate-fadeUp text-cream/80">Design + Build &middot; Boise, Idaho</p>
          <h1 className="h-hero mt-4 animate-fadeUp text-cream [animation-delay:60ms]">Timber + Love</h1>
          <p className="mt-4 max-w-2xl animate-fadeUp text-[0.95rem] uppercase leading-relaxed tracking-brand text-cream/90 [animation-delay:120ms] sm:text-xl">
            Treasure Valley&apos;s Leading Luxury Design + Build Firm
          </p>
          <p className="mt-5 max-w-xl animate-fadeUp text-[0.95rem] leading-relaxed text-cream/85 [animation-delay:200ms] sm:text-base">
            We design and build custom homes and luxury remodels across the Treasure Valley. One team, from the first
            drawing to the final walkthrough. Custom, never semi-custom.
          </p>

          <div className="cta-row mt-8 animate-fadeUp [animation-delay:280ms]">
            <Cta href="/design-and-build-questionnaire/" variant="primary" track="hero_plan_project">
              Start a Project
            </Cta>
            <Cta href="/timber-and-love-gallery/" variant="secondary" className="btn-on-media" track="hero_explore_work">
              See Our Work
            </Cta>
          </div>

          {/* Track record: one row, large screens only. */}
          <div className="mt-14 hidden grid-cols-4 gap-x-10 border-t border-cream/20 pt-8 lg:grid">
            {stats.map((s) => (
              <StatCounter key={s.label} align="left" size="md" {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Track record strip for phones and tablets. */}
      <section aria-label="Track record" className="border-b border-border-subtle bg-ink lg:hidden">
        <div className="container-wide grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} align="left" size="md" {...s} />
          ))}
        </div>
      </section>
    </>
  );
}
