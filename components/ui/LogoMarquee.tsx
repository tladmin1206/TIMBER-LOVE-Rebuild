'use client';

type Logo = { src: string; alt: string };

/** Infinite horizontal marquee of press logos (pauses on hover). */
export default function LogoMarquee({ logos }: { logos: Logo[] }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="group relative overflow-hidden">
      <div className="flex w-max animate-marquee items-center gap-14 group-hover:[animation-play-state:paused]">
        {doubled.map((l, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={l.src}
            alt={l.alt}
            className="h-8 w-auto shrink-0 object-contain opacity-70 transition hover:opacity-100 sm:h-10"
            loading="lazy"
            aria-hidden={i >= logos.length}
          />
        ))}
      </div>
    </div>
  );
}
