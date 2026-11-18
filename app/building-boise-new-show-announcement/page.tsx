import ArticlePage, { type Article } from '@/components/sections/ArticlePage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/post-building-boise-new-show-announcement.json';

const PATH = '/building-boise-new-show-announcement/';
export const metadata = pageMeta({
  title: 'Luke Caldwell and Clint Robertson Reunite for Building Boise: New Independent Series',
  description:
    'For immediate release: Luke Caldwell and Clint Robertson reunite for Building Boise, a new independent series. Get the inside scoop.',
  path: PATH,
  type: 'article',
});

export default function Page() {
  return <ArticlePage article={data as Article} path={PATH} />;
}
