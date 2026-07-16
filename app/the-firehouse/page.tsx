import PropertyPage, { type PropertyContent } from '@/components/sections/PropertyPage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/the-firehouse.json';

export const metadata = pageMeta({
  title: 'The Firehouse',
  description:
    'Fully renovated on HGTV’s BOISE BOYS is a unique, one of a kind old firehouse located in the historic North End. This 2nd floor apartment in the city’s oldest firehouse offers a one-of-a-kind stay.',
  path: '/the-firehouse/',
  image:
    '/wp-content/uploads/elementor/thumbs/Timber-and-Love-Home-Remodeling-Contractors-HGTVs-Boise-Boys-Firehouse-Exterior-scaled-qlx6vv5lswz85ffmsvzz7jgxrdrggibelftivtkllk.jpg',
});

export default function Page() {
  return <PropertyPage data={data as PropertyContent} />;
}
