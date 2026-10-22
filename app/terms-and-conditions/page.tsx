import BlockRenderer, { type Block } from '@/components/ui/BlockRenderer';
import { pageMeta } from '@/lib/seo';
import data from '@/content/terms.json';

// Canonical, correctly-spelled route. The old misspelled URL /terms-conditons/
// returns 301 here (see middleware.ts).
export const metadata = pageMeta({
  title: 'Terms & Conditions',
  description: 'Timber + Love terms and conditions of use.',
  path: '/terms-and-conditions/',
  noindex: true,
});

export default function Page() {
  return (
    <article className="section-tonal pb-24 pt-36 sm:pt-44">
      <div className="container-tl max-w-3xl">
        <h1 className="h-section">{(data as any).title || 'Terms & Conditions'}</h1>
        <div className="mt-10">
          <BlockRenderer blocks={(data as any).blocks as Block[]} />
        </div>
      </div>
    </article>
  );
}
