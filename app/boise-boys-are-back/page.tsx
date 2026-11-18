import ArticlePage, { type Article } from '@/components/sections/ArticlePage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/post-boise-boys-are-back.json';

const PATH = '/boise-boys-are-back/';
export const metadata = pageMeta({
  title: 'The Boise Boys are Back',
  description:
    'Boise Boys are back with a new free streaming show! Luke and Clint return with design tips, home tutorials, and exciting transformations. Get the inside scoop now!',
  path: PATH,
  type: 'article',
});

export default function Page() {
  return <ArticlePage article={data as Article} path={PATH} />;
}
