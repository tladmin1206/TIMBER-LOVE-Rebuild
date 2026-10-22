"use client";
import SiteImage from '@/components/ui/SiteImage';
import { useEffect, useRef, useState } from "react";
import type Player from "@vimeo/player";

/**
 * Container-sized background video. The Vimeo iframe stays out of the page
 * until the visitor clicks Play film, so the embed does not set cookies on
 * load. A successful iframe load is still not proof of playback.
 */
export default function VideoBg({
  videoId,
  poster,
  overlay = "bg-ink/55",
  priority = false,
  fit = "cover",
  position = "center",
}: {
  videoId: string;
  poster: string;
  overlay?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  position?: "center" | "top";
}) {
  const container = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const player = useRef<Player | null>(null);
  const [load, setLoad] = useState(false);
  const [activated, setActivated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [ratio, setRatio] = useState(16 / 9);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    change();
    media.addEventListener("change", change);
    const el = container.current;
    if (!el) return;
    const resize = new ResizeObserver(([entry]) =>
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }),
    );
    resize.observe(el);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    });
    observer.observe(el);
    return () => {
      resize.disconnect();
      observer.disconnect();
      media.removeEventListener("change", change);
    };
  }, []);
  useEffect(() => {
    if (activated && !reduced) setLoad(true);
  }, [activated, reduced]);
  useEffect(() => {
    if (!load || reduced || !frame.current) return;
    let alive = true;
    let instance: Player | undefined;
    setReady(false);
    import("@vimeo/player").then(({ default: VimeoPlayer }) => {
      if (!alive || !frame.current) return;
      instance = new VimeoPlayer(frame.current);
      player.current = instance;
      const playback = () => {
        if (alive) setReady(true);
      };
      instance.on("playing", playback);
      instance.on("timeupdate", playback);
      instance.on("error", () => {
        if (alive) setReady(false);
      });
      instance
        .ready()
        .then(async () => {
          const dimensions = await Promise.all([
            instance!.getVideoWidth(),
            instance!.getVideoHeight(),
          ]);
          if (alive && dimensions[1]) setRatio(dimensions[0] / dimensions[1]);
        })
        .catch(() => {
          if (alive) setReady(false);
        });
    });
    return () => {
      alive = false;
      player.current = null;
      instance?.destroy().catch(() => {});
    };
  }, [load, reduced, videoId]);
  useEffect(() => {
    const instance = player.current;
    if (!instance) return;
    if (!visible || reduced) instance.pause().catch(() => {});
    else instance.play().catch(() => {});
  }, [visible, reduced, ready]);
  const width =
    fit === "contain"
      ? Math.min(size.width, size.height * ratio)
      : Math.max(size.width, size.height * ratio);
  return (
    <>
      <div
        ref={container}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden bg-ink"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <SiteImage sizes="100vw"
          src={poster}
          alt=""
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          style={{ objectPosition: position }}
          className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
        />
        {load && !reduced && (
          <iframe
            ref={frame}
            src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1`}
            title="Decorative background film"
            tabIndex={-1}
            allow="autoplay; fullscreen"
            style={{ width, height: width / ratio, opacity: ready ? 1 : 0 }}
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 border-0 transition-opacity duration-700 ${position === 'top' ? 'top-0' : 'top-1/2 -translate-y-1/2'}`}
          />
        )}
        <div className={`pointer-events-none absolute inset-0 ${overlay}`} />
      </div>
      {!activated && !reduced && (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="absolute right-3 top-[var(--header-h,88px)] z-20 inline-flex min-h-11 items-center border border-cream/80 bg-ink/80 px-4 text-[11px] uppercase tracking-[0.14em] text-cream"
        >
          Play film
        </button>
      )}
    </>
  );
}
