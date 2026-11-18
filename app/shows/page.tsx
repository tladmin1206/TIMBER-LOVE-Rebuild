import SiteImage from '@/components/ui/SiteImage';
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { episodes, lukeClintChannel } from "@/lib/content/shows";
import YouTubeVideo from "@/components/ui/YouTubeVideo";
import HgtvShows from "@/components/sections/HgtvShows";
import HgtvEpisodeCatalog from "@/components/sections/HgtvEpisodeCatalog";
import ClosingCta from "@/components/sections/ClosingCta";
import { closingCta } from "@/lib/content/closing";
export const metadata = pageMeta({
  title: "Shows + Watch",
  description:
    "Watch Luke and Clint and explore every Boise Boys and Outgrown episode, with artwork, stories, and viewing links from Timber + Love.",
  path: "/shows/",
});
export default function ShowsPage() {
  return (
    <>
      <section className="section-tonal pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div className="container-wide">
          <p className="eyebrow">Timber + Love · On Screen</p>
          <h1 className="h-page mt-4 max-w-4xl">
            Good Homes.
            <br />
            Great Stories.
          </h1>
          <nav aria-label="Browse shows" className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
            {[
              ["#episodes", "Luke and Clint"],
              ["#boise-boys-episodes", "Boise Boys"],
              ["#outgrown-episodes", "Outgrown"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.14em] underline underline-offset-8">{label}</a>
            ))}
          </nav>
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <SiteImage sizes="(min-width: 1024px) 55vw, 100vw"
                src="/editorial/luke-clint.webp"
                alt="Official Luke and Clint artwork with Luke Caldwell and Clint Robertson at a demolition site"
                width={1600}
                height={990}
                className="h-auto w-full"
              />
            </div>
            <div>
              <p className="eyebrow">Now on YouTube</p>
              <h2 className="h-section mt-4">Luke and Clint</h2>
              <p className="text-lead mt-5">
                The partnership you met on HGTV continues with new projects,
                unexpected discoveries, and plenty of laughs. Come behind the
                scenes with Luke Caldwell and Clint Robertson.
              </p>
              <div className="cta-row mt-7">
                <a href="#episodes" className="btn-primary">
                  Watch Here
                </a>
                <a
                  href={lukeClintChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  YouTube Channel ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="episodes" className="section bg-bg-primary">
        <div className="container-wide">
          <p className="eyebrow">Press Play</p>
          <h2 className="h-section mt-4">A Few Places to Begin</h2>
          <p className="text-lead mt-5 max-w-2xl">
            Watch selected episodes right here, or visit the channel for the
            complete collection and new releases.
          </p>
          <div className="mt-10 grid gap-x-8 gap-y-12 lg:grid-cols-3">
            {episodes.map((episode) => (
              <article key={episode.id}>
                <YouTubeVideo id={episode.id} title={episode.title} />
                <p className="eyebrow mt-5 !text-[10px]">{episode.category}</p>
                <h3 className="mt-3 text-lg font-normal leading-relaxed">
                  {episode.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-tonal section-tight">
        <div className="container-wide grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          <div>
            {/* Keep the complete photograph, including Luke's jump, at every width. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <SiteImage sizes="(min-width: 1024px) 50vw, 100vw"
              src="/editorial/luke-clint-jump.webp"
              alt="Luke jumps above a sofa while Clint reacts in a home they renovated"
              width={1024}
              height={485}
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
          <div>
            <p className="eyebrow">Where It Began</p>
            <h2 className="h-section mt-4">From Boise to Your Screen</h2>
            <p className="text-lead mt-5">
              Boise Boys introduced Luke and Clint’s different perspectives and
              shared love of transforming homes. Outgrown brought that same care
              to families who needed more from the homes they already loved.
            </p>
            <Link href="/the-boise-boys/" className="btn-secondary mt-6">
              Read the HGTV Story
            </Link>
          </div>
        </div>
      </section>
      <HgtvShows />
      <HgtvEpisodeCatalog />
      <section className="section-tonal section-tight">
        <div className="container-wide grid gap-6 md:grid-cols-2">
          <h2 className="h-card">Inspired by Something You Saw?</h2>
          <p className="text-lead">
            Explore the real homes behind the work, then imagine what might be
            possible in yours.{" "}
            <Link
              href="/timber-and-love-gallery/"
              className="underline underline-offset-4"
            >
              Visit our portfolio.
            </Link>
          </p>
        </div>
      </section>
      <ClosingCta {...closingCta.hgtv} />
    </>
  );
}
