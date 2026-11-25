import Link from 'next/link';
import RentalComparison from '@/components/sections/RentalComparison';
import { pageMeta } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
export const metadata = pageMeta({ absoluteTitle: true, title: "Compare Vacation Homes | Boise, McCall, Oahu | Timber + Love", description: 'Compare five Timber + Love vacation homes in Boise, New Meadows near McCall, and Oahu. Filter by destination and group size, then check your dates.', path: '/vacation-rentals/' });
export default function Page() {
  return <>
    <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Vacation Rentals', path: '/stay-with-us/' }, { name: 'Compare Vacation Homes', path: '/vacation-rentals/' }])} />
    <section className="bg-bg-primary pb-24 pt-32 sm:pt-40"><div className="container-wide">
    <Link href="/stay-with-us/" className="eyebrow link-underline">Stay With Us</Link>
    <h1 className="h-page mt-5 max-w-4xl">Compare Vacation Homes in Boise, McCall and Oahu</h1>
    <p className="text-lead mt-6 mb-10 max-w-2xl">Five homes. Pick a place and a group size, compare them, then check dates with the booking host.</p>
    <RentalComparison />
    <div className="mt-16 border-t border-border-subtle pt-8"><h2 className="h-card">Question before you book?</h2><p className="text-lead mt-4">We can point you to the right house.</p><Link href="/contact/#general" className="btn-secondary mt-6">Ask About a Stay</Link></div>
  </div></section>
  </>;
}
