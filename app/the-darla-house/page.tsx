import PropertyPage, { type PropertyContent } from '@/components/sections/PropertyPage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/the-darla-house.json';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Darla House | North End Boise Cottage Rental | Timber + Love",
  description: "The Darla House is a bright North End Boise cottage for up to 4 guests, renovated by the Timber + Love team. See photos, amenities and check your dates.",
  path: '/the-darla-house/',
});

export default function Page() {
  return <PropertyPage data={data as PropertyContent} />;
}
