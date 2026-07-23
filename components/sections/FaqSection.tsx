import FAQ, { type FaqItem } from '@/components/ui/FAQ';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/ui/Reveal';
import { faqSchema } from '@/lib/schema';

/**
 * Objection-handling FAQ block, positioned just before the closing CTA.
 *
 * Emits FAQPage structured data alongside the visible accordion so the same
 * answers are eligible for rich results: these pages compete on exactly the
 * questions being answered here.
 */
export default function FaqSection({
  items,
  eyebrow = 'Common Questions',
  title = 'Before You Reach Out',
  background = 'bg-bg-primary',
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  background?: string;
}) {
  if (!items?.length) return null;

  return (
    <section className={`${background} section border-t border-border-subtle`} aria-labelledby="faq-heading">
      <JsonLd schema={faqSchema(items)} />
      <div className="container-wide">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="faq-heading" className="h-section mt-4">
            {title}
          </h2>
        </Reveal>
        <FAQ items={items} />
      </div>
    </section>
  );
}
