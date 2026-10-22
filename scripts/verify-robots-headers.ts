/**
 * Production hosts must not send X-Robots-Tag: noindex.
 * A build that sets both FORCE_NOINDEX and REPLIT_DEPLOYMENT must refuse.
 *
 * Run: npx tsx scripts/verify-robots-headers.ts
 */
import assert from 'node:assert/strict';
import { assertIndexableProductionBuild, robotsHeaderRules, xRobotsTag } from '../lib/robots-headers.mjs';

assert.equal(xRobotsTag('timberandlove.com', '/'), null);
assert.equal(xRobotsTag('www.timberandlove.com', '/'), null);
assert.equal(xRobotsTag('TIMBERANDLOVE.COM', '/design-and-build/'), null);
assert.equal(xRobotsTag('www.timberandlove.com:443', '/contact/'), null);
assert.equal(xRobotsTag('timberandlove.com', '/the-boise-boys/'), null);

assert.match(xRobotsTag('timberandlove.replit.app', '/') || '', /noindex/);
assert.match(xRobotsTag('localhost', '/') || '', /noindex/);
assert.match(xRobotsTag('preview.example.com', '/design-and-build/') || '', /noindex/);

assert.match(xRobotsTag('timberandlove.com', '/', { FORCE_NOINDEX: '1' }) || '', /noindex/);
assert.match(xRobotsTag('www.timberandlove.com', '/', { FORCE_NOINDEX: '1' }) || '', /noindex/);

assert.match(xRobotsTag('timberandlove.com', '/admin/') || '', /noindex/);
assert.match(xRobotsTag('www.timberandlove.com', '/admin/estimates/') || '', /noindex/);

const productionRules = robotsHeaderRules({});
const unconditional = productionRules.filter((rule) => rule.source === '/:path*' && !rule.missing);
assert.equal(unconditional.length, 0, 'production config must not noindex every host');

const gated = productionRules.find((rule) => rule.missing);
const missing = gated?.missing?.[0];
assert.ok(gated, 'production config keeps a host gate');
assert.ok(missing, 'production config names the host pattern');
const hostPattern = new RegExp(`^${missing.value}$`);
assert.equal(hostPattern.test('timberandlove.com'), true);
assert.equal(hostPattern.test('www.timberandlove.com'), true);
assert.equal(hostPattern.test('timberandlove.replit.app'), false);
assert.equal(gated.headers.some((header) => /noindex/i.test(header.value)), true);

const forced = robotsHeaderRules({ FORCE_NOINDEX: '1' });
assert.equal(forced.length, 1);
assert.equal(forced[0].missing, undefined);
assert.match(forced[0].headers[0].value, /noindex/);

assert.throws(
  () => assertIndexableProductionBuild({ FORCE_NOINDEX: '1', REPLIT_DEPLOYMENT: '1' }),
  /FORCE_NOINDEX=1 together with REPLIT_DEPLOYMENT=1/,
);
assert.doesNotThrow(() => assertIndexableProductionBuild({ FORCE_NOINDEX: '1' }));
assert.doesNotThrow(() => assertIndexableProductionBuild({ REPLIT_DEPLOYMENT: '1' }));
assert.doesNotThrow(() => assertIndexableProductionBuild({}));

console.log('\n  PASS  timberandlove.com and www send no X-Robots-Tag noindex; deployment noindex build is refused\n');
