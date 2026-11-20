import JsonLd from '@/components/JsonLd';
import { personSchema } from '@/lib/schema';
import ArticlePage, { type Article } from '@/components/sections/ArticlePage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/post-luke-caldwell-faq.json';

const PATH = '/luke-caldwell-faq/';
export const metadata = pageMeta({ absoluteTitle: true,
  title: "Luke Caldwell FAQ | HGTV Boise Boys Designer | Timber + Love",
  description: "Who is Luke Caldwell? Answers about the HGTV Boise Boys designer, his Timber + Love design-build firm, his design philosophy and what he is working on now.",
  path: PATH,
  type: 'article',
});

export default function Page() {
  return (
    <>
      <JsonLd schema={personSchema} />
      <ArticlePage article={data as Article} path={PATH} />
    </>
  );
}
