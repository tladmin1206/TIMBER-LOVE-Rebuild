import SiteImage from '@/components/ui/SiteImage';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import { rentals } from '@/lib/content/rentals';

export default function RentalsGrid() {
  return (
    <div className="space-y-14 sm:space-y-20">
      {(['Idaho', 'Hawaii'] as const).map((region) => (
        <div key={region} id={`${region.toLowerCase()}-properties`} className="scroll-mt-24">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3 border-b border-border-subtle pb-5">
            <h3 className="h-card">{region === 'Idaho' ? 'Boise + McCall' : 'Oahu, Hawaii'}</h3>
            <p className="text-sm text-text-secondary">{region === 'Idaho' ? 'City stays and a mountain escape' : 'Two oceanfront homes in Kaʻaʻawa'}</p>
          </div>
          <div className={`grid gap-7 ${region === 'Idaho' ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {rentals.filter((r) => r.region === region).map((r, i) => (
              <Reveal key={r.href} delay={i * 90} className="h-full">
                <Link href={r.href} className="group card-interactive flex h-full flex-col overflow-hidden bg-surface/40">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <SiteImage sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" src={r.image} alt={`${r.name} in ${r.destination}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-xs uppercase tracking-[0.18em] text-text-muted">{r.destination}</p>
                    <h4 className="h-card mt-3">{r.name}</h4>
                    {r.facts && <p className="mt-3 text-sm text-text-secondary">{r.facts}</p>}
                    <p className="mt-3 text-sm leading-relaxed text-body">{r.blurb}</p>
                    <span className="mt-auto pt-6 text-xs uppercase tracking-[0.16em] text-cream">See This Stay <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
