import BlockRenderer, { type Block } from '@/components/ui/BlockRenderer';
import { pageMeta } from '@/lib/seo';
import data from '@/content/privacy-policy.json';

export const metadata = pageMeta({
  title: 'Privacy Policy',
  description: 'Timber and Love privacy policy — how we collect, use, and protect your information.',
  path: '/privacy-policy/',
  noindex: true,
});

export default function Page() {
  return (
    <article className="bg-bg-primary pb-24 pt-36 sm:pt-44">
      <div className="container-tl max-w-3xl">
        <h1 className="h-section">{(data as any).title || 'Privacy Policy'}</h1>
        <div className="mt-10">
          <BlockRenderer blocks={(data as any).blocks as Block[]} />
        </div>
      </div>
    </article>
  );
}
