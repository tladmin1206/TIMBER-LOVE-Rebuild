import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { projects, relatedProjects, filterProjects } from '../lib/content/projects';
import { projectStories } from '../lib/content/project-stories';
import { rentals } from '../lib/content/rentals';
import episodes from '../content/hgtv-episodes.json';
import { pressLogos } from '../lib/content/home';
for (const p of projects) {
  assert.ok(projectStories[p.slug], `Missing project story: ${p.slug}`);
  const related = relatedProjects(p.slug);
  assert.equal(related.length, 3);
  assert.ok(related.every(r => r.slug !== p.slug));
  assert.equal(new Set(related.map(r => r.slug.startsWith('promise-lane-') ? 'promise-lane' : r.slug)).size, 3);
  assert.ok(related[0].tags.some(t => p.tags.includes(t)), `Unrelated first recommendation for ${p.slug}`);
}
const groups = ['new-home', 'remodel', 'hgtv'] as const;
const filtered = groups.flatMap(k => filterProjects(k));
assert.equal(new Set(filtered.map(p => p.slug)).size, filtered.length, 'Collections repeat the same homes');
assert.equal(episodes.length, 31); assert.equal(new Set(episodes.map(e => e.id)).size, 31);
assert.equal(rentals.length, 5); assert.ok(rentals.every(r => r.guests > 0 && r.facts && r.bookingUrl.startsWith('https:')));
const images = [...projects.flatMap(p => [p.cover, ...p.gallery.map(i => i.src)]), ...rentals.map(r => r.image), ...episodes.map(e => e.image), ...pressLogos.map(p => p.src)];
for (const image of images) assert.ok(fs.existsSync(path.join('public', image)), `Missing local image ${image}`);
const manifests = JSON.parse(fs.readFileSync('docs/legacy-media-migration.json', 'utf8'));
for (const asset of manifests.assets) assert.ok(fs.statSync(path.join('public', asset.path)).size > 0);
const config = fs.readFileSync('next.config.mjs','utf8');assert.ok(!config.includes('ASSET_ORIGIN'), 'Legacy domain loop remains');
assert.ok(!fs.readFileSync('components/forms/ContactForm.tsx','utf8').includes('Property Management'));
console.log(`Content checks passed: ${projects.length} case studies, distinct filters and related homes, ${episodes.length} episodes, ${rentals.length} comparable stays, ${manifests.assets.length} self-hosted legacy images.`);
