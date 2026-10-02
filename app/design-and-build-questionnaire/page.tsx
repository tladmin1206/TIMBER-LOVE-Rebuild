import ContactForm from '@/components/forms/ContactForm';
import WhatHappensNext from '@/components/sections/WhatHappensNext';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Start Your Design + Build Project',
  description: 'Tell the Timber and Love team about your home and your goals. Start a conversation about your Boise remodel, addition, or custom home.',
  path: '/design-and-build-questionnaire/',
});

export default function Page() {
  return (
    <>
      <section id="inquiry" className="bg-ink pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Let’s Work Together</p>
            <h1 className="h-page mt-4">Tell Us About Your Project</h1>
            <p className="text-lead mt-6 max-w-xl">
              A beautiful home starts with a conversation. Share what you have in mind, whether it’s a remodel, an addition, or a new home. Our team will help you find the next step.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/projects/promise-ln-5120/5120-promise-ln-kitchen.jpg" alt="Timber and Love custom kitchen with green millwork and natural wood" className="mt-8 hidden aspect-[4/3] w-full object-cover lg:block" />
            <p className="mt-6 text-sm text-text-secondary">
              Prefer to talk? <a href={site.phoneHref} className="link-underline text-cream">{site.phone}</a>
            </p>
          </div>
          <div className="self-start border border-border-subtle bg-panel p-6 sm:p-9 lg:mt-1">
            <h2 className="h-card">Let’s Get to Know Your Project</h2>
            <p className="mt-3 mb-7 text-sm leading-relaxed text-text-secondary">A few details are all we need to begin. There’s no commitment and no need to have everything figured out.</p>
            <ContactForm source="design-build-inquiry" defaultService="Design + Build" />
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
