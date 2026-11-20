import ArticlePage, { type Article } from '@/components/sections/ArticlePage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/post-building-boise-new-show-announcement.json';

const PATH = '/building-boise-new-show-announcement/';
export const metadata = pageMeta({ absoluteTitle: true,
  title: "Luke and Clint Reunite for Building Boise | Timber + Love",
  description: "Luke Caldwell and Clint Robertson reunite for Building Boise, an independent series on Treasure Valley renovations. Read the April 2026 announcement.",
  path: PATH,
  type: 'article',
});

export default function Page() {
  return <ArticlePage article={data as Article} path={PATH} />;
}
