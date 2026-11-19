import DesignBuildQuestionnaire from '@/components/forms/DesignBuildQuestionnaire';
import WhatHappensNext from '@/components/sections/WhatHappensNext';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Start Your Design + Build Project',
  description: 'Planning a custom home or remodel in Boise? Tell Timber + Love about your project, lot, and timeline to start the design and build conversation.',
  path: '/design-and-build-questionnaire/',
});

export default function Page() {
  return (
    <>
      {/* The questionnaire is the page. It sits directly on the ink, centred
          and unboxed, which is how the form is designed to be seen: it draws
          its own white type and Next button on a transparent ground. */}
      <section id="inquiry" className="bg-ink pb-16 pt-[calc(var(--header-h,88px)+2rem)] sm:pb-24 sm:pt-[calc(var(--header-h,88px)+4.5rem)]">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Let’s Work Together</p>
            <h1 className="h-page mt-4">Tell Us About Your Project</h1>
            <p className="text-lead mx-auto mt-4 max-w-xl sm:mt-5">
              A beautiful home starts with a conversation. Share what you have in mind, whether it’s a remodel, an addition, or a new home. Our team will help you find the next step.
            </p>
            <p className="mt-4 text-sm text-text-secondary">
              Prefer to talk? <a href={site.phoneHref} className="link-underline text-cream">{site.phone}</a>
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl border-t border-border-subtle pt-2 sm:mt-14 sm:pt-4">
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
