import Reveal from '@/components/ui/Reveal';

/**
 * Expectation-setting strip shown directly above a major form.
 *
 * "What happens after I submit this?" is the last question someone asks before
 * abandoning a form, and it was previously answered only on a separate process
 * page most visitors never reach. Stating it inline measurably reduces
 * abandonment, and costs nothing to be honest about.
 */
const DEFAULT_STEPS = [
  {
    step: '01',
    title: 'Our Team Reviews Your Inquiry',
    body: 'A member of our team reads every inquiry personally. We will reach out to learn more about your goals.',
  },
  {
    step: '02',
    title: 'A Short Conversation',
    body: 'About twenty minutes to understand your home, your goals and your budget, and to say honestly whether we are the right team for it.',
  },
  {
    step: '03',
    title: 'A Clear Next Step',
    body: 'If it makes sense to continue, we outline scope and process in writing. If it does not, we will tell you that too.',
  },
];

export default function WhatHappensNext({
  steps = DEFAULT_STEPS,
  compact = false,
}: {
  steps?: { step: string; title: string; body: string }[];
  compact?: boolean;
}) {
  if (compact) {
    return (
      <ol className="grid gap-4 sm:grid-cols-3">
        {steps.map((s) => (
          <li key={s.step} className="border-l-2 border-border-subtle pl-4">
            <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{s.step}</p>
            <p className="mt-1 text-sm text-cream">{s.title}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal key={s.step} delay={i * 110} className="surface-card p-8">
          <div className="font-sans text-4xl tracking-brand text-cream/40">{s.step}</div>
          <h3 className="h-card mt-6">{s.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">{s.body}</p>
        </Reveal>
      ))}
    </div>
  );
}
