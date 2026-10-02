import PropertyPage from '@/components/sections/PropertyPage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/caldwell-beach-house.json';

export const metadata = pageMeta({
  title: 'The Caldwell Beach House',
  description: 'Explore The Caldwell Beach House in Kaʻaʻawa, Oahu: 4 bedrooms, 2 bathrooms, and space for 11 guests. View photos and check availability.',
  path: '/caldwell-beach-house/',
  image: data.hero.image,
});

export default function Page() {
  return <PropertyPage data={data} />;
}
