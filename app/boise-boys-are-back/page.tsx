import ArticlePage, { type Article } from '@/components/sections/ArticlePage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/post-boise-boys-are-back.json';

const PATH = '/boise-boys-are-back/';
export const metadata = pageMeta({ absoluteTitle: true,
  title: "The Boise Boys Are Back | Luke and Clint's New Show",
  description: "The Boise Boys are back: in 2024 Luke Caldwell and Clint Robertson returned with a free streaming show of design tips and home transformations. Read the story.",
  path: PATH,
  type: 'article',
});

export default function Page() {
  return <ArticlePage article={data as Article} path={PATH} />;
}
