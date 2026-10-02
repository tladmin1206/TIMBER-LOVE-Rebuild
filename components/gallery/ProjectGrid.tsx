'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { projectFilters, filterProjects, type ProjectFilterKey } from '@/lib/content/projects';

type FilterKey = ProjectFilterKey;

// Alternate styles and settings in the complete collection, so neighboring
// developments do not dominate the first screen.
const editorialOrder = [
  'promise-lane-spanish-modern', 'central-rim', 'north-end-gem',
  'promise-lane-contemporary', 'stucco-in-time', 'the-chalet',
  'the-darla-house', 'due-for-a-raze', 'promise-lane-modern-farmhouse',
  'the-firehouse', 'kualoa-beach-house', 'casa-de-boise',
];

export default function ProjectGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initial = (searchParams.get('filter') as FilterKey) || 'all';
  const [active, setActive] = useState<FilterKey>(
    projectFilters.some((f) => f.key === initial) ? initial : 'all'
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    setActive(projectFilters.some((f) => f.key === initial) ? initial : 'all');
  }, [initial]);

  const select = (key: FilterKey) => {
    setActive(key);
    // Preserve filter state in the URL without a full page reload.
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (key === 'all') params.delete('filter');
    else params.set('filter', key);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  /**
   * Arrow-key navigation, required by the tablist pattern this markup claims.
   * Without it a keyboard user could reach the first tab and then only leave
   * the group, never move within it: the role promised behaviour the component
   * did not implement. Focus follows selection, which is the correct variant
   * here because switching filters is instant and has no cost.
   */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = projectFilters.length - 1;
    const current = projectFilters.findIndex((f) => f.key === active);
    let next = -1;
    if (e.key === 'ArrowRight') next = current === last ? 0 : current + 1;
    else if (e.key === 'ArrowLeft') next = current === 0 ? last : current - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    select(projectFilters[next].key as FilterKey);
    tabRefs.current[next]?.focus();
  };

  const visible = filterProjects(active).sort((a, b) => editorialOrder.indexOf(a.slug) - editorialOrder.indexOf(b.slug));

  return (
    <div>
      {/* Filter tabs */}
      <div role="tablist" aria-label="Filter projects" onKeyDown={onKeyDown} className="flex flex-wrap gap-2">
        {projectFilters.map((f, i) => {
          const on = active === f.key;
          return (
            <button
              key={f.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`project-tab-${f.key}`}
              aria-selected={on}
              aria-controls="project-results"
              /* Roving tabindex: the group is one tab stop, and arrow keys move
                 within it. */
              tabIndex={on ? 0 : -1}
              onClick={() => select(f.key as FilterKey)}
              className={`min-h-[40px] border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-[color,background-color,border-color,transform] duration-300 ease-out active:scale-[0.97] active:duration-75 ${
                on ? 'border-accent bg-accent-soft text-cream' : 'border-border-subtle text-text-secondary hover:border-cream hover:text-cream'
              }`}
            >
              {f.label}
              <span className="ml-2 text-text-muted">{filterProjects(f.key).length}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-text-secondary" role="status">
        {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        {active === 'all' ? ' across our portfolio' : ` in ${projectFilters.find((f) => f.key === active)?.label}`}
      </p>

      {/* Project cards.
          Keying the grid on the active filter remounts it, so the incoming set
          fades in as one group instead of cards mutating in place, which read
          as a glitch when both the count and the order changed. The fade is
          260ms and carries no delay: the content is present on the first frame
          and only its opacity is animated, so nothing is withheld from a
          reader. Under reduced motion the global rule collapses it to an
          instant swap. */}
      <div
        key={active}
        id="project-results"
        role="tabpanel"
        aria-labelledby={`project-tab-${active}`}
        className="mt-8 grid animate-fadeInFast gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {visible.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}/`}
            className="group card-interactive flex flex-col overflow-hidden"
            data-track={`project_${p.slug}`}
          >
            <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.cover}
                alt={`${p.title}: ${p.category} in ${p.location}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex min-h-10 flex-wrap content-start items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.16em] text-accent">
                <span>{p.category}</span>
                <span className="text-text-muted">·</span>
                <span className="text-text-muted">{p.location}</span>
              </div>
              <h3 className="h-card mt-3">{p.title}</h3>
              {p.hgtv && <p className="mt-2 text-xs uppercase tracking-[0.14em] text-text-muted">{p.hgtv}</p>}
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{p.summary}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs uppercase tracking-[0.16em] text-cream">
                View Project
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}

        {/* Empty state: says what happened, and offers a way out rather than
            leaving the visitor at a dead end. Inside the panel so it fades in
            with everything else. */}
        {visible.length === 0 && (
          <div className="surface-card p-10 text-center md:col-span-2" role="status">
            <p className="h-card">Nothing Here Yet</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
              We have not published a project in this category yet. The rest of our work is worth a look in the
              meantime.
            </p>
            <button type="button" onClick={() => select('all')} className="btn-secondary mt-6">
              View All Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
