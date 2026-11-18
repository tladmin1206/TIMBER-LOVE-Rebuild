import ArticlePage, { type Article } from '@/components/sections/ArticlePage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/post-timber-love-story-boise.json';

const PATH = '/timber-love-story-boise/';
export const metadata = pageMeta({
  title: 'The Real Story Behind Timber + Love: What We’ve Built and Why It Matters',
  description:
    'Every successful venture has a compelling origin story, and Timber + Love is no exception. The narrative of this prominent Boise design + build company.',
  path: PATH,
  type: 'article',
});

export default function Page() {
  return <ArticlePage article={data as Article} path={PATH} />;
}
