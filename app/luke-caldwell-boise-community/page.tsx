import ArticlePage, { type Article } from '@/components/sections/ArticlePage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/post-luke-caldwell-boise-community.json';

const PATH = '/luke-caldwell-boise-community/';
export const metadata = pageMeta({
  title: 'Building Boise, Paying It Forward: How Luke Caldwell Reinvests in the Community',
  description:
    'For Luke Caldwell, Boise is more than just a home, it’s the foundation of everything he’s built. A look at how he reinvests in the Treasure Valley community.',
  path: PATH,
  type: 'article',
  image: (data as any).heroImage,
});

export default function Page() {
  return <ArticlePage article={data as Article} path={PATH} />;
}
