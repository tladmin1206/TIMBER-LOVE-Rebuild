// CI only: screenshots of the Hero (home page) and StatStrip (about page) at
// small mobile widths. Requires the built app running on BASE_URL.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
const out = process.env.OUT_DIR || 'screenshots';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
for (const width of [320, 375]) {
  const page = await browser.newPage({ viewport: { width, height: 800 }, reducedMotion: 'reduce' });
  await page.goto(`${base}/`, { waitUntil: 'networkidle' });
  const hero = page.locator('section').filter({ has: page.locator('h1') }).first();
  await hero.screenshot({ path: `${out}/hero-${width}x800.png` });
  await page.goto(`${base}/about/`, { waitUntil: 'networkidle' });
  const strip = page.locator('section[aria-label="Track record"]').first();
  await strip.scrollIntoViewIfNeeded();
  await strip.screenshot({ path: `${out}/statstrip-${width}x800.png` });
  await page.close();
}
await browser.close();
