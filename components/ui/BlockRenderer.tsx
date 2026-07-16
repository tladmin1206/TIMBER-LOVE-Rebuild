import Reveal from './Reveal';

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'h4'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'image'; src: string; text?: string };

/** Renders a long-form article / legal document from structured blocks. */
export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-tl space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} className="h-display pt-6 text-2xl sm:text-3xl">
                {b.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="pt-4 text-xl text-cream">
                {b.text}
              </h3>
            );
          case 'ul':
            return (
              <ul key={i} className="ml-5 list-disc space-y-2 text-body">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case 'image':
            return (
              <Reveal key={i} className="my-8 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt={b.text || ''} loading="lazy" className="w-full object-cover" />
              </Reveal>
            );
          case 'p':
          default:
            return (
              <p key={i} className="text-base leading-relaxed text-body">
                {(b as { text: string }).text}
              </p>
            );
        }
      })}
    </div>
  );
}
