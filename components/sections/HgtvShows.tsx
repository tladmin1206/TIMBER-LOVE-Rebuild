import Link from "next/link";
import VideoBg from "@/components/ui/VideoBg";
import { hgtvShows } from "@/lib/content/home";
export default function HgtvShows() {
  return (
    <section
      className="media-card bg-ink section"
      aria-labelledby="hgtv-shows-heading"
    >
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">As Seen on HGTV</p>
            <h2 id="hgtv-shows-heading" className="h-section mt-4">
              Boise Boys + Outgrown
            </h2>
          </div>
          <Link
            href="/the-boise-boys/"
            className="link-underline py-3 text-xs uppercase tracking-widest"
          >
            Our HGTV Story →
          </Link>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {hgtvShows.map((show, i) => (
            <article key={show.videoId}>
              <div className="relative aspect-video overflow-hidden">
                <VideoBg
                  videoId={show.videoId}
                  poster={show.poster}
                  overlay=""
                  fit="contain"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <h3 className="h-card">{show.title}</h3>
                <Link
                  href={i === 0 ? "/shows/#boise-boys-episodes" : "/shows/#outgrown-episodes"}
                  className="inline-flex min-h-11 items-center text-xs uppercase tracking-widest underline underline-offset-4"
                >
                  See Every Episode →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
