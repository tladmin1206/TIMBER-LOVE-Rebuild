import PropertyPage, { type PropertyContent } from '@/components/sections/PropertyPage';
import { pageMeta } from '@/lib/seo';
import data from '@/content/chalet.json';

export const metadata = pageMeta({
  title: 'Timber + Love Chalet',
  description:
    'This charming cabin, redesigned and styled by Luke Caldwell from HGTV’s Boise Boys along with his Timber + Love team, offers an inviting retreat ideal for your next getaway.',
  path: '/timber-and-love-chalet/',
  image: '/wp-content/uploads/elementor/thumbs/Timber-and-Love-Home-Remodeling-Company-Timber-and-Love-Chalet-Exterior-Front-scaled-qlxe87bq7cefx2g1qwgu3vy9h4uj5u66rw5rr02csg.jpg',
});

export default function Page() {
  return <PropertyPage data={data as PropertyContent} />;
}
