import episodes from "@/content/hgtv-episodes.json";

const shows = [
  {
    name: "Boise Boys",
    id: "boise-boys-episodes",
    description:
      "Two perspectives. One shared love of home. Revisit every transformation, from the first Boise projects to the Father’s Day special.",
  },
  {
    name: "Outgrown",
    id: "outgrown-episodes",
    description:
      "More room for the life already happening at home. Follow Luke and Clint as they help families reimagine the places they love.",
  },
];

export default function HgtvEpisodeCatalog() {
  return (
    <>
      {shows.map((show, index) => {
        const collection = episodes.filter((episode) => episode.show === show.name);
        const seasons = [...new Set(collection.map((episode) => episode.season))];
        const groups = [
          ...seasons.map((season) => ({
            title: `Season ${season}`,
            id: `${show.id}-season-${season}`,
            episodes: collection.filter((episode) => episode.season === season && episode.episode < 100),
          })),
          {
            title: "Specials",
            id: `${show.id}-specials`,
            episodes: collection.filter((episode) => episode.episode >= 100),
          },
        ].filter((group) => group.episodes.length > 0);

        return (
          <section
            key={show.id}
            id={show.id}
            aria-labelledby={`${show.id}-heading`}
            className={`section scroll-mt-28 border-t border-border-subtle ${index === 0 ? "bg-bg-primary" : "section-tonal"}`}
          >
            <div className="container-wide">
              <div className="max-w-3xl">
                <p className="eyebrow">The Complete HGTV Collection</p>
                <h2 id={`${show.id}-heading`} className="h-section mt-4">{show.name}</h2>
                <p className="text-lead mt-5">{show.description}</p>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  {collection.length} {show.name === "Boise Boys" ? "episodes, including the special" : "episodes"}.
                  {" "}Choose an episode for viewing options on Apple TV.
                </p>
              </div>
              <nav aria-label={`${show.name} seasons`} className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                {groups.map((group) => (
                  <a key={group.id} href={`#${group.id}`} className="inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.14em] underline underline-offset-8">
                    {group.title} <span className="text-text-muted">{group.episodes.length}</span>
                  </a>
                ))}
                <a href={`#${shows[index === 0 ? 1 : 0].id}`} className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.14em] text-text-secondary">
                  Browse {shows[index === 0 ? 1 : 0].name} →
                </a>
              </nav>

              {groups.map((group) => (
                <div key={group.id} id={group.id} className="mt-14 scroll-mt-28">
                  <h3 className="mb-8 border-b border-border-subtle pb-5 text-lg tracking-[0.08em]">{group.title}</h3>
                  <div className="grid gap-x-7 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
                    {group.episodes.map((episode) => (
                      <article key={episode.id} data-episode={episode.id}>
                        <a
                          href={episode.watchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Viewing options for ${show.name}: ${episode.title} on Apple TV (opens in a new tab)`}
                          className="group flex h-full flex-col"
                        >
                          <div className="aspect-video overflow-hidden bg-black">
                            {/* Preserve the complete source artwork, including faces. */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={episode.image}
                              alt={`${show.name}: ${episode.title} episode artwork`}
                              width={episode.width}
                              height={episode.height}
                              loading="lazy"
                              className="h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-80"
                            />
                          </div>
                          <p className="eyebrow mt-5 !text-[10px]">
                            {episode.episode >= 100 ? "Father’s Day Special" : `Season ${episode.season} · Episode ${episode.episode}`}
                          </p>
                          <h4 className="mt-3 text-xl font-normal leading-snug group-hover:underline group-hover:underline-offset-4">{episode.title}</h4>
                          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{episode.description}</p>
                          <p className="mt-4 text-xs text-text-muted">First aired {episode.airDate}</p>
                          <span className="mt-auto inline-flex min-h-11 items-end gap-3 pt-5 text-xs uppercase tracking-[0.14em]">Watch Episode <span aria-hidden="true">↗</span></span>
                        </a>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
