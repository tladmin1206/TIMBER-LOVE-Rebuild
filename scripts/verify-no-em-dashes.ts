/* eslint-disable no-console */
/**
 * Em dashes are banned from this codebase, permanently.
 *
 * Banning the character outright, rather than only in user-facing strings, is
 * deliberate: it removes any judgement call about which strings reach a page,
 * and it means a stray dash can never be introduced by a copy edit and slip
 * through unnoticed.
 *
 * Where a dash genuinely must be matched (the narrative validator has to
 * recognise one if a model emits it), write it as the escape — rather than
 * the literal character.
 *
 * Run: npx tsx scripts/verify-no-em-dashes.ts
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const ROOTS = ['app', 'components', 'lib', 'content', 'scripts'];
const EXT = /\.(ts|tsx|css|md|json)$/;
const EM_DASH = '—';

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXT.test(entry)) out.push(full);
  }
  return out;
}

const offenders: { file: string; line: number; text: string }[] = [];

for (const root of ROOTS) {
  let files: string[];
  try {
    files = walk(join(ROOT, root));
  } catch {
    continue; // optional directory
  }
  for (const file of files) {
    // This file necessarily contains the character it is looking for.
    if (file.endsWith('verify-no-em-dashes.ts')) continue;
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((text, i) => {
        if (text.includes(EM_DASH)) {
          offenders.push({ file: relative(ROOT, file), line: i + 1, text: text.trim().slice(0, 90) });
        }
      });
  }
}

if (offenders.length === 0) {
  console.log('\n  PASS  no em dashes anywhere in the codebase\n');
  process.exit(0);
}

console.log(`\n  FAIL  ${offenders.length} em dash(es) found. Use a comma, colon, or full stop instead.\n`);
for (const o of offenders) console.log(`        ${o.file}:${o.line}  ${o.text}`);
console.log('');
process.exit(1);
