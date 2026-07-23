import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import darla from '@/content/the-darla-house.json';
import firehouse from '@/content/the-firehouse.json';
import chinamans from '@/content/chinamans-beach-house.json';
import chalet from '@/content/chalet.json';

type Card = { name: string; location: string; href: string; image: string; blurb: string; booking?: string };

const rentals: Card[] = [
  {
    name: 'The Firehouse',
    location: 'Boise',
    href: '/the-firehouse/',
    image: (firehouse as any).hero?.image || (firehouse as any).gallery?.[0],
    blurb: 'A one-of-a-kind renovated firehouse in Boise’s historic North End, featured on HGTV’s Boise Boys.',
    booking: (firehouse as any).details?.bookingUrl,
  },
  {
    name: 'The Chalet',
    location: 'McCall',
    href: '/timber-and-love-chalet/',
    image: (chalet as any).hero?.image || (chalet as any).gallery?.[0],
    blurb: 'A charming cabin redesigned by Luke Caldwell and the Timber and Love team, an inviting mountain retreat.',
    booking: (chalet as any).details?.bookingUrl,
  },
  {
    name: 'Beach House',
    location: 'Hawaii',
    href: '/chinamans-ocean-front-beach-house/',
    image: (chinamans as any).hero?.image || (chinamans as any).gallery?.[0],
    blurb: 'A luxury Oahu beach home with breathtaking views and direct beach access.',
    booking: (chinamans as any).details?.bookingUrl,
  },
  {
    name: 'The Darla House',
    location: 'Boise',
    href: '/the-darla-house/',
    image: (darla as any).hero?.image || (darla as any).gallery?.[0],
    blurb: 'A cozy, modern North End cottage that is bright, happy, and full of original character.',
    booking: (darla as any).details?.bookingUrl,
  },
];

export default function RentalsGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {rentals.map((r, i) => (
        <Reveal key={r.href} delay={i * 90}>
          <Link href={r.href} className="group card-interactive block overflow-hidden bg-surface/40">
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-7">
              <h3 className="h-card">{r.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream/60">{r.location}</p>
              <p className="mt-3 text-sm leading-relaxed text-body">{r.blurb}</p>
              <span className="mt-5 inline-block text-xs uppercase tracking-[0.16em] text-cream link-underline">View Details →</span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
