'use client';
import { useEffect, useState } from 'react';
import episodes from '@/content/hgtv-episodes.json';
import ContainedImage from '@/components/ui/ContainedImage';
import { trackEvent } from '@/lib/analytics';

export default function HgtvEpisodeCatalog() {
  const [show, setShow] = useState('all');
  const [season, setSeason] = useState('all');
  useEffect(() => {
    const read = () => {
      const q = new URLSearchParams(location.search);
      const selected = q.get('show');
      const fromHash = location.hash.startsWith('#outgrown-episodes') ? 'Outgrown' : location.hash.startsWith('#boise-boys-episodes') ? 'Boise Boys' : 'all';
      setShow(fromHash !== 'all' ? fromHash : selected === 'Boise Boys' || selected === 'Outgrown' ? selected : 'all');
      setSeason(['1','2','specials'].includes(q.get('season') || '') ? q.get('season')! : 'all');
    };
    read(); window.addEventListener('popstate', read); window.addEventListener('hashchange', read);
    return () => {window.removeEventListener('popstate', read); window.removeEventListener('hashchange', read);};
  }, []);
  const change = (nextShow: string, nextSeason: string) => {
    setShow(nextShow); setSeason(nextSeason);
    const url = new URL(location.href); url.hash = 'hgtv-library';
    url.searchParams.delete('show'); url.searchParams.delete('season');
    if (nextShow !== 'all') url.searchParams.set('show', nextShow);
    if (nextSeason !== 'all') url.searchParams.set('season', nextSeason);
    history.pushState(null, '', url);
    trackEvent('episode_filter', { show: nextShow, season: nextSeason });
  };
  const collection = episodes.filter(e => show === 'all' || e.show === show);
  const seasons = [...new Set(collection.filter(e => e.episode < 100).map(e => e.season))].sort();
  const results = collection.filter(e => season === 'all' || (season === 'specials' ? e.episode >= 100 : e.season === Number(season) && e.episode < 100));
  return <section id="hgtv-library" className="bg-bg-primary section scroll-mt-28 border-t border-border-subtle">
    <div className="container-wide">
      <span id="boise-boys-episodes" className="block scroll-mt-28" /><span id="outgrown-episodes" className="block scroll-mt-28" />
      <p className="eyebrow">The Complete HGTV Collection</p><h2 className="h-section mt-4">Find Your Next Episode</h2>
      <p className="text-lead mt-5 max-w-3xl">Every Boise Boys and Outgrown episode, including the Father’s Day special. Filter the collection and follow an episode for viewing options on Apple TV.</p>
      <div className="mt-9 flex flex-wrap items-end gap-x-4 gap-y-3 border-y border-border-subtle py-6 sm:gap-5">
        <label className="min-w-0 flex-1 text-sm sm:flex-none">Show<select value={show} onChange={e => change(e.target.value, 'all')} className="mt-2 block min-h-12 w-full border border-cream/30 bg-ink px-4 text-base sm:w-52"><option value="all">Both shows</option><option>Boise Boys</option><option>Outgrown</option></select></label>
        <label className="min-w-0 flex-1 text-sm sm:flex-none">Season<select value={season} onChange={e => change(show, e.target.value)} className="mt-2 block min-h-12 w-full border border-cream/30 bg-ink px-4 text-base sm:w-44"><option value="all">All seasons</option>{seasons.map(s => <option key={s} value={s}>Season {s}</option>)}{collection.some(e => e.episode >= 100) && <option value="specials">Specials</option>}</select></label>
        <p role="status" aria-live="polite" className="w-full text-sm text-text-secondary sm:w-auto sm:py-3">{results.length} of {episodes.length} episodes</p>
        {(show !== 'all' || season !== 'all') && <button onClick={() => change('all','all')} className="link-underline min-h-12 text-sm">Show all episodes</button>}
      </div>
      <div className="mt-10 grid gap-x-7 gap-y-8 md:mt-12 md:grid-cols-2 md:gap-y-12 xl:grid-cols-3">
        {results.map(episode => <article key={episode.id} data-episode={episode.id}>
          <a href={episode.watchUrl} target="_blank" rel="noopener noreferrer" data-track="episode_watch_options" data-external="true" className="group grid h-full grid-cols-[42%_minmax(0,1fr)] items-start gap-x-4 md:flex md:flex-col md:items-stretch" aria-label={`Viewing options for ${episode.show}: ${episode.title} on Apple TV (opens in a new tab)`}>
            <div className="relative aspect-video w-full overflow-hidden bg-black"><ContainedImage src={episode.image} alt={`${episode.show}: ${episode.title} episode artwork`} sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 45vw" className="transition-opacity group-hover:opacity-80" /></div>
            {/* Phones: a compact row, artwork beside the copy, so 31 episodes
                scan as a list. From md the wrapper dissolves into a card. */}
            <div className="min-w-0 md:contents">
            <p className="eyebrow !text-[10px] md:mt-5">{episode.show} · {episode.episode >= 100 ? 'Special' : `S${episode.season} · E${episode.episode}`}</p>
            <h3 className="mt-1.5 text-base leading-snug group-hover:underline md:mt-3 md:text-xl">{episode.title}</h3>
            <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-text-secondary md:mt-3 md:line-clamp-none md:text-sm">{episode.description}</p>
            <p className="mt-2 text-xs text-text-muted md:mt-4">First aired {episode.airDate}</p>
            <span className="mt-2 inline-flex items-end gap-3 text-[11px] uppercase tracking-[.14em] md:mt-auto md:min-h-11 md:pt-5 md:text-xs">Watch Episode ↗</span>
            </div>
          </a>
        </article>)}
      </div>
      {!results.length && <p className="py-12 text-lead">No episodes match these filters. Choose another season or show all episodes.</p>}
    </div>
  </section>;
}
