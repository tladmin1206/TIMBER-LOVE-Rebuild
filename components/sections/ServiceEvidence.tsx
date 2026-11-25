import SiteImage from '@/components/ui/SiteImage';
import Link from 'next/link';

/** Evidence belongs to the service it actually describes. No implied investor or cash-sale outcomes, and no client quote without a source. */
export default function ServiceEvidence({ service }: { service: 'realty' | 'cash' | 'invest' }) {
  if (service === 'realty') {
    return (
      <section className="bg-bg-primary section">
        <div className="container-wide max-w-3xl">
          <p className="eyebrow">Timber + Love Realty</p>
          <h2 className="h-section mt-4">Client stories</h2>
          <p className="text-lead mt-5">Client stories for the realty team are on the realty site.</p>
          <a href="https://timberandloverealty.com/reviews/" className="btn-secondary mt-7" data-track="realty_reviews">Read Realty Client Stories ↗</a>
        </div>
      </section>
    );
  }
  return <section className="section-tonal section"><div className="container-wide grid items-center gap-10 lg:grid-cols-2">
    <Link href={service === 'cash' ? '/projects/north-end-gem/' : '/projects/promise-lane-contemporary/'} className="block overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}<SiteImage sizes="(min-width: 1024px) 50vw, 100vw" src={service === 'cash' ? '/projects/north-end-gem/sunroom.webp' : '/projects/promise-ln-5142/5142-promise-ln-great-room.jpg'} alt={service === 'cash' ? 'Restored sunroom at the North End Gem' : 'Great room in the contemporary custom home on Promise Lane'} loading="lazy" className="aspect-[4/3] w-full object-cover" />
    </Link>
    <div><p className="eyebrow">See the work</p><h2 className="h-section mt-4">{service === 'cash' ? 'We\'ve renovated a lot of tired old houses' : 'Here\'s a house we built'}</h2><p className="text-lead mt-5">{service === 'cash' ? 'Here\'s one we did. When you ask for an offer, the cash-buying team looks at your own house and your own situation.' : 'Look at it, then ask us about any specific deal: the project details, the structure, the risks and what\'s available now.'}</p><p className="mt-4 text-sm text-text-secondary">{service === 'cash' ? 'A renovation example is not a promise about your offer amount or closing date.' : 'A finished home demonstrates the work. It does not establish investment performance or future returns.'}</p><Link href={service === 'cash' ? '/projects/north-end-gem/' : '/projects/promise-lane-contemporary/'} className="btn-secondary mt-7">See This Project</Link></div>
  </div></section>;
}
