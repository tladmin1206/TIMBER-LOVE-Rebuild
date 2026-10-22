import Link from 'next/link';
import RentalComparison from '@/components/sections/RentalComparison';
import { pageMeta } from '@/lib/seo';
export const metadata = pageMeta({ title: 'Compare Vacation Homes', description: 'Compare five Timber + Love vacation homes in Boise, New Meadows near McCall, and Oahu. Filter by destination and group size, then check your dates.', path: '/vacation-rentals/' });
export default function Page() {
  return <section className="bg-bg-primary pb-24 pt-32 sm:pt-40"><div className="container-wide">
    <Link href="/stay-with-us/" className="eyebrow link-underline">Stay With Us</Link>
    <h1 className="h-page mt-5 max-w-4xl">Find Your Place to Stay</h1>
    <p className="text-lead mt-6 mb-10 max-w-2xl">Five distinctive homes. Choose your setting and group size, compare the details, then check your dates with the booking host.</p>
    <RentalComparison />
    <div className="mt-16 border-t border-border-subtle pt-8"><h2 className="h-card">A Question Before You Book?</h2><p className="text-lead mt-4">Our team can help point you toward the right home.</p><Link href="/contact/#general" className="btn-secondary mt-6">Ask About a Stay</Link></div>
  </div></section>;
}
