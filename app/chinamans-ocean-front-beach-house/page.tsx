import PropertyPage, { type PropertyContent } from '@/components/sections/PropertyPage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/chinamans-beach-house.json';

export const metadata = pageMeta({
  title: 'The Kualoa Beach House',
  description:
    'Freshly renovated in 2020, this luxury beach home with its one of a kind location offers breathtaking views nestled in between Kualoa Ranch (Jurassic Park, Lost) and the ocean.',
  path: '/chinamans-ocean-front-beach-house/',
});

export default function Page() {
  return <PropertyPage data={data as PropertyContent} />;
}
