import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import DesignBuildQuestionnaire from '@/components/forms/DesignBuildQuestionnaire';
import WhatHappensNext from '@/components/sections/WhatHappensNext';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Start Your Design-Build Project | Timber + Love",
  description: 'Planning a custom home or remodel in Boise? Tell Timber + Love about your project, lot, and timeline to start the design and build conversation.',
  path: '/design-and-build-questionnaire/',
});

export default function Page() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Tell Us About Your House', path: '/design-and-build-questionnaire/' }])} />
      {/* The questionnaire is the page, composed like an app screen.
          Phones: a slim title row, then the form edge to edge, starting in the
          first screen with nothing to scroll past. Wider screens: a compact
          heading over a focused panel. The panel is held under 640px wide on
          purpose: the hosted form switches to its oversized display type above
          that width, and at this width it keeps the compact, app-like scale. */}
      <section id="inquiry" className="min-h-[100svh] bg-ink pb-12 pt-[var(--header-h,76px)] sm:pb-24 sm:pt-[calc(var(--header-h,88px)+3.5rem)]">
        <div className="container-wide">
          <div className="mx-auto max-w-[600px] sm:text-center">
            <div className="flex items-center justify-between gap-4 sm:block">
              <p className="eyebrow">Your house</p>
              <a href={site.phoneHref} className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-cream sm:hidden" data-track="questionnaire_call">
                Call Us
              </a>
            </div>
            <h1 className="h-display text-lg leading-snug text-cream min-[400px]:text-xl sm:mt-4 sm:text-4xl">Tell Us About Your House</h1>
            <p className="mt-4 hidden text-base leading-relaxed text-text-secondary sm:block">
              Tell us what you have in mind, whether it’s a remodel, an addition or a new house. We’ll help figure out the next step.
            </p>
            <p className="mt-3 hidden text-sm text-text-secondary sm:block">
              Prefer to talk? <a href={site.phoneHref} className="link-underline text-cream">{site.phone}</a>
            </p>
          </div>
          <div className="-mx-5 mt-1 sm:mx-auto sm:mt-10 sm:max-w-[600px] sm:border sm:border-border-subtle sm:bg-cream/[0.02] sm:px-2 sm:pb-2 sm:pt-4">
            <DesignBuildQuestionnaire />
          </div>
        </div>
      </section>
      <section className="section-tonal section border-t border-border-subtle">
        <div className="container-wide">
          <h2 className="h-section mb-10 text-center">What Happens Next</h2>
          <WhatHappensNext />
        </div>
      </section>
    </>
  );
}
