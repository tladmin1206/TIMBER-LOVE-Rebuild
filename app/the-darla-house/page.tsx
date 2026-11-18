import PropertyPage, { type PropertyContent } from '@/components/sections/PropertyPage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/the-darla-house.json';

export const metadata = pageMeta({
  title: 'The Darla House',
  description:
    'This cozy and modern cottage is the perfect spot to stay in the North End. A renovated, bright and happy home includes stainless steel appliances, stylish decor, and original character.',
  path: '/the-darla-house/',
});

export default function Page() {
  return <PropertyPage data={data as PropertyContent} />;
}
