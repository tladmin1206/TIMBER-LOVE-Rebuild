import Link from 'next/link';
import { clientReviews } from '@/lib/content/home';

/** Evidence belongs to the service it actually describes. No implied investor or cash-sale outcomes. */
export default function ServiceEvidence({ service }: { service: 'realty' | 'cash' | 'invest' }) {
  if (service === 'realty') {
    const review = clientReviews.find(r => r.role === 'Real Estate Client')!;
    return <section className="bg-bg-primary section"><div className="container-wide grid gap-10 lg:grid-cols-2"><div><p className="eyebrow">Real Estate Client</p><h2 className="h-section mt-4">Local Guidance, Personally Felt</h2><a href="https://timberandloverealty.com/reviews/" className="btn-secondary mt-7" data-track="realty_reviews">Read Realty Client Stories ↗</a></div><figure className="border-l border-cream/40 pl-7"><blockquote className="text-lead">“{review.quote}”</blockquote><figcaption className="mt-6 text-sm text-text-secondary">{review.name} · {review.role}</figcaption></figure></div></section>;
  }
  return <section className="section-tonal section"><div className="container-wide grid items-center gap-10 lg:grid-cols-2">
    <Link href={service === 'cash' ? '/projects/north-end-gem/' : '/projects/promise-lane-contemporary/'} className="block overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}<img src={service === 'cash' ? '/projects/north-end-gem/sunroom.webp' : '/projects/promise-ln-5142/5142-promise-ln-great-room.jpg'} alt={service === 'cash' ? 'Restored sunroom at the North End Gem' : 'Great room in the contemporary custom home on Promise Lane'} loading="lazy" className="aspect-[4/3] w-full object-cover" />
    </Link>
    <div><p className="eyebrow">Experience You Can Explore</p><h2 className="h-section mt-4">{service === 'cash' ? 'A Team That Understands a Home’s Potential' : 'Get to Know the Work Behind the Team'}</h2><p className="text-lead mt-5">{service === 'cash' ? 'Our portfolio shows how the team approaches existing homes, from architectural character to finished details. When you request an offer, the cash-buying team reviews your own property and situation.' : 'Explore a completed custom home to understand the team’s design and construction experience. For a specific investment, ask for the project details, structure, risks, and current availability.'}</p><p className="mt-4 text-sm text-text-secondary">{service === 'cash' ? 'A renovation example is not a promise about your offer amount or closing date.' : 'A finished home demonstrates the work. It does not establish investment performance or future returns.'}</p><Link href={service === 'cash' ? '/projects/north-end-gem/' : '/projects/promise-lane-contemporary/'} className="btn-secondary mt-7">Explore This Project</Link></div>
  </div></section>;
}
