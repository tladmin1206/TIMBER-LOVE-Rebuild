import ArticlePage, { type Article } from '@/components/sections/ArticlePage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/post-luke-caldwell-faq.json';

const PATH = '/luke-caldwell-faq/';
export const metadata = pageMeta({
  title: 'About Luke Caldwell — Frequently Asked Questions',
  description:
    'Answers to the most frequently asked questions about Luke Caldwell of HGTV’s Boise Boys and the Timber and Love team.',
  path: PATH,
  type: 'article',
  image: (data as any).heroImage,
});

export default function Page() {
  return <ArticlePage article={data as Article} path={PATH} />;
}
