import PropertyPage, { type PropertyContent } from '@/components/sections/PropertyPage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/chinamans-beach-house.json';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Kualoa Beach House | Oceanfront Oahu Rental | Timber + Love",
  description: "The Kualoa Beach House is an oceanfront Oahu rental between Kualoa Ranch and the Pacific, sleeping 8 with 3 bedrooms. See photos and check your dates.",
  path: '/kualoa-beach-house/',
});

export default function Page() {
  return <PropertyPage data={data as PropertyContent} />;
}
