import PropertyPage, { type PropertyContent } from '@/components/sections/PropertyPage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/the-firehouse.json';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "The Firehouse Boise Rental | As Seen on HGTV | Timber + Love",
  description: "Stay in The Firehouse, a historic North End Boise firehouse renovated on HGTV's Boise Boys. Sleeps 6 with 3 bedrooms and 2 baths. Check dates and book.",
  path: '/the-firehouse/',
});

export default function Page() {
  return <PropertyPage data={data as PropertyContent} />;
}
