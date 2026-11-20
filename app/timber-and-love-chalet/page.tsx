import PropertyPage, { type PropertyContent } from '@/components/sections/PropertyPage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/chalet.json';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Cabin Rental Near McCall | The Chalet by Timber + Love",
  description: "The Chalet is a cabin rental in New Meadows near McCall, styled by Luke Caldwell of HGTV's Boise Boys. Sleeps 10 with 3 bedrooms. Check dates and book.",
  path: '/timber-and-love-chalet/',
});

export default function Page() {
  return <PropertyPage data={data as PropertyContent} />;
}
