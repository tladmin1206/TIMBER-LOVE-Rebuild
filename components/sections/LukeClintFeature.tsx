import Link from "next/link";
import { lukeClintChannel } from "@/lib/content/shows";
export default function LukeClintFeature() {
  return (
    <section
      className="section-tonal section"
      aria-labelledby="luke-clint-heading"
    >
      <div className="container-wide grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Link href="/shows/" aria-label="Discover Luke and Clint">
          {/* Preserve the official artwork's full composition on every screen. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/editorial/luke-clint.webp"
            alt="Luke and Clint on a demolition site, with the Luke and Clint show wordmark"
            width={1600}
            height={990}
            loading="lazy"
            className="h-auto w-full"
          />
        </Link>
        <div>
          <p className="eyebrow">The Story Continues</p>
          <h2 id="luke-clint-heading" className="h-section mt-4">
            Luke &amp; Clint
          </h2>
          <p className="mt-4 text-sm uppercase tracking-[.16em] text-text-muted">
            New stories. The same two guys.
          </p>
          <p className="text-lead mt-6">
            You know the homes. Now come along for what happens next. Luke
            Caldwell and Clint Robertson bring their love of renovation, design,
            and a good laugh to their own YouTube show.
          </p>
          <p className="text-lead mt-4">
            From the team behind Boise Boys and Outgrown, it is another way to
            get to know the people and imagination behind the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={lukeClintChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Watch on YouTube ↗
            </a>
            <Link href="/shows/" className="btn-secondary">
              Explore the Shows
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
