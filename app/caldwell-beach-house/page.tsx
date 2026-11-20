import PropertyPage from '@/components/sections/PropertyPage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/caldwell-beach-house.json';

export const metadata = pageMeta({ absoluteTitle: true,
  title: "Caldwell Beach House | Ka'a'awa Oahu Rental | Timber + Love",
  description: "The Caldwell Beach House in Kaʻaʻawa, Oahu sleeps 11 with 4 bedrooms and 2 baths, with ocean and mountain views. See photos and check availability.",
  path: '/caldwell-beach-house/',
});

export default function Page() {
  return <PropertyPage data={data} />;
}
