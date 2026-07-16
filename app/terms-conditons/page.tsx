import BlockRenderer, { type Block } from '@/components/ui/BlockRenderer';
import { pageMeta } from '@/lib/seo';
import data from '@/content/terms.json';

// Note: slug intentionally matches the original WordPress URL "/terms-conditons/"
// (misspelled on the live site) to preserve existing links and SEO.
export const metadata = pageMeta({
  title: 'Terms & Conditions',
  description: 'Timber and Love terms and conditions of use.',
  path: '/terms-conditons/',
  noindex: true,
});

export default function Page() {
  return (
    <article className="bg-ink pb-24 pt-36 sm:pt-44">
      <div className="container-tl max-w-3xl">
        <h1 className="h-display text-4xl sm:text-5xl">{(data as any).title || 'Terms & Conditions'}</h1>
        <div className="mt-10">
          <BlockRenderer blocks={(data as any).blocks as Block[]} />
        </div>
      </div>
    </article>
  );
}
