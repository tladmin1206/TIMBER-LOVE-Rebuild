'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { projects, projectFilters, type ProjectTag } from '@/lib/content/projects';

type FilterKey = 'all' | ProjectTag;

export default function ProjectGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initial = (searchParams.get('filter') as FilterKey) || 'all';
  const [active, setActive] = useState<FilterKey>(
    projectFilters.some((f) => f.key === initial) ? initial : 'all'
  );

  const select = (key: FilterKey) => {
    setActive(key);
    // Preserve filter state in the URL without a full page reload.
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (key === 'all') params.delete('filter');
    else params.set('filter', key);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const visible = active === 'all' ? projects : projects.filter((p) => p.tags.includes(active as ProjectTag));

  return (
    <div>
      {/* Filter tabs */}
      <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {projectFilters.map((f) => {
          const on = active === f.key;
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={on}
              onClick={() => select(f.key)}
              className={`border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                on ? 'border-accent bg-accent-soft text-cream' : 'border-border-subtle text-text-secondary hover:border-cream hover:text-cream'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Project cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2" aria-live="polite">
        {visible.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}/`}
            className="group block overflow-hidden border border-border-subtle"
            data-track={`project_${p.slug}`}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.cover}
                alt={`${p.title} — ${p.category} in ${p.location}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.16em] text-accent">
                <span>{p.category}</span>
                <span className="text-text-muted">·</span>
                <span className="text-text-muted">{p.location}</span>
              </div>
              <h3 className="h-display mt-3 text-2xl">{p.title}</h3>
              {p.hgtv && <p className="mt-2 text-xs uppercase tracking-[0.14em] text-text-muted">{p.hgtv}</p>}
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{p.summary}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cream">
                View Project
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-8 text-sm text-text-muted">No projects match this filter yet.</p>
      )}
    </div>
  );
}
