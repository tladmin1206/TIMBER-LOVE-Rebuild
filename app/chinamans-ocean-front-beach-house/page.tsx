import PropertyPage, { type PropertyContent } from '@/components/sections/PropertyPage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/chinamans-beach-house.json';

export const metadata = pageMeta({
  title: 'Chinaman’s Ocean Front Beach House',
  description:
    'Freshly renovated in 2020, this luxury beach home with its one of a kind location offers breathtaking views nestled in between Kualoa Ranch (Jurassic Park, Lost) and the ocean.',
  path: '/chinamans-ocean-front-beach-house/',
  image: '/wp-content/uploads/elementor/thumbs/1-Oceanfront-Oahu-vacation-rental-exterior-with-direct-beach-access-rgjhwedjsazed2vr554cd77qfepsllrqm6lqzj428o.png',
});

export default function Page() {
  return <PropertyPage data={data as PropertyContent} />;
}
