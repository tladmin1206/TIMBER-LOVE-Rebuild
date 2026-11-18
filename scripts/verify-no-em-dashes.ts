/* eslint-disable no-console */
/**
 * Em dashes (U+2014) and en dashes (U+2013) are banned from this codebase and
 * from every rendered page, permanently.
 *
 * Two passes:
 *   1. Source: every .ts, .tsx, .css, .md, .json and .mdx file under app,
 *      components, lib, content and scripts. This covers copy kept in content
 *      JSON (journal posts, property descriptions) as well as UI strings such
 *      as the FAQ toggle.
 *   2. Rendered: if a production build exists (.next/server), every
 *      prerendered .html and .rsc payload is scanned too, so a dash that
 *      arrives from data or a dependency is still caught.
 *
 * Banning the characters outright, rather than only in user-facing strings, is
 * deliberate: it removes any judgement call about which strings reach a page.
 * Use a comma, colon, full stop, the word "to", or a hyphen in a number range.
 *
 * Where a dash genuinely must be matched (the narrative validator has to
 * recognise one if a model emits it), write it as an escape (\u2014 or
 * \u2013) rather than the literal character. This file follows that rule, so
 * it needs no exemption.
 *
 * Run: npx tsx scripts/verify-no-em-dashes.ts
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SOURCE_ROOTS = ['app', 'components', 'lib', 'content', 'scripts'];
const SOURCE_EXT = /\.(ts|tsx|css|md|mdx|json)$/;
const RENDERED_ROOT = join(ROOT, '.next', 'server');
const RENDERED_EXT = /\.(html|rsc|body)$/;
const DASHES = /[\u2013\u2014]/;
const NAME: Record<string, string> = { '\u2013': 'en dash', '\u2014': 'em dash' };

function walk(dir: string, ext: RegExp, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, ext, out);
    else if (ext.test(entry)) out.push(full);
  }
  return out;
}

const offenders: { file: string; line: number; kind: string; text: string }[] = [];

/**
 * A prerendered route handler is stored as `<route>.body` beside a
 * `<route>.meta` that records its headers. Some of those bodies are images
 * (the share cards under /og/), and reading JPEG bytes as text produces
 * arbitrary characters, including the occasional false em dash. Only bodies
 * that are text are copy, so only those are checked.
 */
function isBinaryBody(file: string): boolean {
  if (!file.endsWith('.body')) return false;
  const meta = file.replace(/\.body$/, '.meta');
  if (!existsSync(meta)) return false;
  try {
    const type = String(JSON.parse(readFileSync(meta, 'utf8'))?.headers?.['content-type'] ?? '');
    return type !== '' && !/^(text\/|application\/(json|xml|rss\+xml|atom\+xml|manifest\+json))/i.test(type);
  } catch {
    return false;
  }
}

function scan(files: string[]) {
  for (const file of files) {
    if (isBinaryBody(file)) continue;
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((text, i) => {
        const m = text.match(DASHES);
        if (!m) return;
        const at = m.index ?? 0;
        offenders.push({
          file: relative(ROOT, file),
          line: i + 1,
          kind: NAME[m[0]],
          text: text.slice(Math.max(0, at - 40), at + 40).trim(),
        });
      });
  }
}

for (const root of SOURCE_ROOTS) {
  const dir = join(ROOT, root);
  if (existsSync(dir)) scan(walk(dir, SOURCE_EXT));
}
let renderedChecked = false;
if (existsSync(RENDERED_ROOT)) {
  scan(walk(RENDERED_ROOT, RENDERED_EXT));
  renderedChecked = true;
}

const scope = renderedChecked ? 'source and rendered pages' : 'source (no build found, rendered pages skipped)';
if (offenders.length === 0) {
  console.log(`\n  PASS  no em or en dashes in ${scope}\n`);
  process.exit(0);
}

console.log(`\n  FAIL  ${offenders.length} em or en dash(es) found in ${scope}. Use a comma, colon, full stop, "to", or a hyphen in a number range.\n`);
for (const o of offenders) console.log(`        ${o.file}:${o.line}  [${o.kind}]  ${o.text}`);
console.log('');
process.exit(1);
