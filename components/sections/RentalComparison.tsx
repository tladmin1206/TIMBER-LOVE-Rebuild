'use client';
import SiteImage from '@/components/ui/SiteImage';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { rentals } from '@/lib/content/rentals';
import { trackEvent } from '@/lib/analytics';

export default function RentalComparison() {
  const [region, setRegion] = useState('all');
  const [guests, setGuests] = useState(1);
  useEffect(() => {
    const read = () => { const q = new URLSearchParams(location.search); setRegion(['Idaho', 'Hawaii'].includes(q.get('destination') || '') ? q.get('destination')! : 'all'); setGuests(Math.min(11, Math.max(1, Number(q.get('guests')) || 1))); };
    read(); window.addEventListener('popstate', read); return () => window.removeEventListener('popstate', read);
  }, []);
  const change = (destination: string, count: number) => {
    setRegion(destination); setGuests(count);
    const url = new URL(location.href); url.searchParams.delete('destination'); url.searchParams.delete('guests');
    if (destination !== 'all') url.searchParams.set('destination', destination);
    if (count > 1) url.searchParams.set('guests', String(count));
    history.pushState(null, '', url); trackEvent('rental_filter', { destination, guests: count });
  };
  const results = rentals.filter(r => (region === 'all' || region === r.region) && r.guests >= guests);
  return <>
    <div className="flex flex-wrap items-end gap-x-4 gap-y-3 border-y border-border-subtle py-6 sm:gap-5">
      <label className="min-w-0 flex-1 text-sm sm:flex-none">Destination<select value={region} onChange={e => change(e.target.value, guests)} className="mt-2 block min-h-12 w-full border border-cream/30 bg-ink px-4 text-base sm:w-52"><option value="all">All destinations</option><option>Idaho</option><option>Hawaii</option></select></label>
      <label className="min-w-0 flex-1 text-sm sm:flex-none">Your group<select value={guests} onChange={e => change(region, Number(e.target.value))} className="mt-2 block min-h-12 w-full border border-cream/30 bg-ink px-4 text-base sm:w-44">{Array.from({length:11}, (_, i) => <option key={i} value={i+1}>{i+1} {i === 0 ? 'guest' : 'guests'}</option>)}</select></label>
      <p role="status" aria-live="polite" className="w-full text-sm text-text-secondary sm:w-auto sm:py-3">{results.length} {results.length === 1 ? 'home' : 'homes'} for your trip</p>
      {(region !== 'all' || guests !== 1) && <button onClick={() => change('all', 1)} className="link-underline min-h-12 text-sm">Reset filters</button>}
    </div>
    <div className="mt-10 grid items-stretch gap-7 md:grid-cols-2 xl:grid-cols-3">
      {results.map(r => <article key={r.href} className="flex flex-col overflow-hidden border border-border-subtle bg-surface/40">
        <Link href={r.href} data-track="property_view" className="group block overflow-hidden" aria-label={`Explore ${r.name}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}<SiteImage sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" src={r.image} alt={`${r.name} in ${r.destination}`} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </Link>
        <div className="flex flex-1 flex-col p-6"><p className="eyebrow !text-[10px]">{r.destination}</p><h2 className="h-card-sm mt-3"><Link href={r.href}>{r.name}</Link></h2><p className="mt-4 text-sm text-cream">{r.facts}</p><p className="mt-4 text-sm leading-relaxed text-text-secondary">{r.blurb}</p>
          <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6"><Link href={r.href} className="link-underline inline-flex min-h-11 items-center text-sm" data-track="property_view">Explore the Home</Link><a href={r.bookingUrl} target="_blank" rel="noopener noreferrer" data-track="booking_handoff" data-external="true" className="link-underline inline-flex min-h-11 items-center text-sm">Check Dates ↗</a></div>
        </div>
      </article>)}
    </div>
    {results.length === 0 && <div className="py-16 text-center"><h2 className="h-card">No homes match this group and destination.</h2><p className="mt-4 text-text-secondary">Try another destination or a smaller group size.</p><button onClick={() => change('all', 1)} className="btn-secondary mt-6">See All Five Homes</button></div>}
    <p className="mt-8 max-w-3xl text-sm leading-relaxed text-text-muted">Availability, rates, fees, and house rules are confirmed by each booking host. Please review the home’s access notes and sleeping arrangements before booking.</p>
  </>;
}
