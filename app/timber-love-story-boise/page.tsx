import ArticlePage, { type Article } from '@/components/sections/ArticlePage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/post-timber-love-story-boise.json';

const PATH = '/timber-love-story-boise/';
export const metadata = pageMeta({ absoluteTitle: true,
  title: "The Timber + Love Story | Why Luke Caldwell Built It",
  description: "How Luke Caldwell started Timber + Love in Boise in 2015, and how a hands-on renovation practice grew into a design-build, real estate and rentals team.",
  path: PATH,
  type: 'article',
});

export default function Page() {
  return <ArticlePage article={data as Article} path={PATH} />;
}
