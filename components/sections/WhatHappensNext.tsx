import PhotoCard from '@/components/ui/PhotoCard';
import Reveal from '@/components/ui/Reveal';

/** Sets expectations near the inquiry form without adding more required fields. */
const DEFAULT_STEPS = [
  {
    step: '01',
    image: '/editorial/team-studio.webp',
    position: 'center 82%',
    contain: false,
    title: 'Someone reads it',
    body: 'A person on our team reads every inquiry and reaches out to learn more.',
  },
  {
    step: '02',
    image: '/editorial/luke-denim.webp',
    position: 'center 30%',
    contain: false,
    title: 'A short conversation',
    body: 'We talk about your house, your goals and your budget, and tell you if we\'re a fit.',
  },
  {
    step: '03',
    image: '/editorial/concrete-entry.webp',
    position: 'center',
    contain: false,
    title: 'A Clear Next Step',
    body: 'If it makes sense to continue, we outline scope and process in writing. If it does not, we will tell you that too.',
  },
];

export default function WhatHappensNext({
  steps = DEFAULT_STEPS,
  compact = false,
}: {
  steps?: { step: string; title: string; body: string; image?: string; contain?: boolean; position?: string }[];
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
    <div className="grid gap-6 lg:grid-cols-3">
      {steps.map((s, i) => (
        <Reveal key={s.step} delay={i * 110} className="h-full">
          <PhotoCard image={s.image || DEFAULT_STEPS[i % DEFAULT_STEPS.length].image} contain={s.contain} imagePosition={s.position || 'center'}>
          <div className="step-num">{s.step}</div>
          <h3 className="h-card mt-3">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{s.body}</p>
          </PhotoCard>
        </Reveal>
      ))}
    </div>
  );
}
