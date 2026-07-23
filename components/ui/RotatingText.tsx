'use client';

import { useEffect, useState } from 'react';

/** Cycles through phrases with a soft fade: mirrors the live hero sub-headline. */
export default function RotatingText({
  words,
  interval = 2400,
  className = '',
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (words.length < 2) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((v) => (v + 1) % words.length);
        setShow(true);
      }, 350);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span
      className={`inline-block transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'} ${className}`}
      aria-live="polite"
    >
      {words[i]}
    </span>
  );
}
