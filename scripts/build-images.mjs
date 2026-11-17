// Pre-renders responsive WebP renditions of every photograph in public/.
//
// Why this exists: the site used Next's on-demand image optimizer
// (/_next/image), which resizes a photograph the first time a browser asks for
// a given width. On the autoscale deployment some of those first-time requests
// never completed, and every later request for the same size then waited on the
// stuck one, so that photograph showed as an empty box for every visitor.
// Renditions made here are ordinary static files: nothing is resized while a
// visitor waits, so there is nothing to hang.
//
// Runs as part of `npm run build`. Output goes to public/_r/<width>/<original
// path>.webp and is not committed. It is incremental: a rendition is only
// rebuilt when its source photograph is newer.
import { readdir, stat, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';

export const WIDTHS = [384, 640, 828, 1200, 1920];
const ROOT = path.resolve('public');
const OUT = path.join(ROOT, '_r');
const SOURCE_DIRS = ['brand', 'editorial', 'external', 'projects', 'rentals', 'shows', 'video-posters', 'wp-content'];
const IMAGE = /\.(jpe?g|png|webp)$/i;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (IMAGE.test(entry.name)) out.push(full);
  }
  return out;
}

async function render(source) {
  const rel = path.relative(ROOT, source).split(path.sep).join('/');
  const sourceTime = (await stat(source)).mtimeMs;
  let made = 0;
  for (const width of WIDTHS) {
    const target = path.join(OUT, String(width), `${rel}.webp`);
    if (existsSync(target) && (await stat(target)).mtimeMs >= sourceTime) continue;
    await mkdir(path.dirname(target), { recursive: true });
    // Never enlarge: a photograph narrower than the requested width is
    // re-encoded at its own size, so every width always has a file.
    await sharp(source, { failOn: 'none' })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(target);
    made++;
  }
  return made;
}

const started = Date.now();
sharp.concurrency(1);
const sources = (await Promise.all(SOURCE_DIRS.map((d) => path.join(ROOT, d)).filter(existsSync).map(walk))).flat();
let made = 0;
let failed = 0;
let next = 0;
const workers = Array.from({ length: Math.max(2, Math.min(8, os.cpus().length)) }, async () => {
  while (next < sources.length) {
    const source = sources[next++];
    try {
      made += await render(source);
    } catch (error) {
      failed++;
      console.error(`  could not render ${path.relative(ROOT, source)}: ${error.message}`);
    }
  }
});
await Promise.all(workers);
console.log(`images: ${sources.length} photographs, ${made} renditions written, ${failed} failed, ${((Date.now() - started) / 1000).toFixed(1)}s`);
// A photograph that cannot be rendered would be a broken image in production,
// so the build stops rather than publishing one.
if (failed) process.exit(1);
