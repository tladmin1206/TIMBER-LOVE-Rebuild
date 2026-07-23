import Reveal from '@/components/ui/Reveal';

export type ProcessPhase = {
  title: string;
  body: string;
  receive?: string; // what the client has at the end of this phase
};

/**
 * Vertical process timeline. A connecting hairline with accent-numbered nodes
 * gives a clear, premium sense of "here is exactly what happens next", the
 * question that most often stalls a design-build inquiry.
 */
export default function ProcessTimeline({ phases }: { phases: ProcessPhase[] }) {
  return (
    <ol className="relative mx-auto max-w-3xl">
      {/* connecting line */}
      <span aria-hidden="true" className="absolute left-[1.35rem] top-2 bottom-2 w-px bg-border-subtle sm:left-7" />
      {phases.map((p, i) => (
        <Reveal as="li" key={p.title} delay={i * 60} className="relative flex gap-5 pb-10 last:pb-0 sm:gap-8">
          <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-primary text-sm text-accent sm:h-14 sm:w-14">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="pt-1.5 sm:pt-2.5">
            <h3 className="h-card-sm sm:text-xl">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.body}</p>
            {p.receive && (
              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-text-muted">
                <span className="text-accent">You leave with:</span> {p.receive}
              </p>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
