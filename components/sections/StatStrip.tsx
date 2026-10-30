import StatCounter from '@/components/ui/StatCounter';
import Reveal from '@/components/ui/Reveal';
import { stats } from '@/lib/content/home';

/**
 * Brand track record as a standalone strip.
 *
 * The same figures appear in the homepage hero, but there they compete with the
 * headline while a visitor is still orienting. Repeating them on the pages
 * where someone is actually weighing a decision is where they do the work.
 */
export default function StatStrip({
  eyebrow = 'Track Record',
  title,
  background = 'bg-bg-secondary',
}: {
  eyebrow?: string;
  title?: string;
  background?: string;
}) {
  return (
    <section className={`${background} section-tight border-y border-border-subtle`} aria-label="Track record">
      <div className="container-wide">
        {title && (
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="h-section mt-4">{title}</h2>
          </Reveal>
        )}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} align="center" {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
