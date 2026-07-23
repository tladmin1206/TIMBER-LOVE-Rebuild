/* eslint-disable no-console */
/**
 * Service-layer checks: service area, enrichment degradation, and CRM mapping.
 * Spec Part II §§ 4.2, 4.3, 9.
 *
 * Run: npx tsx scripts/verify-planner-services.ts
 */
import { bandFor, distanceMiles, qualify, SERVICE_AREA } from '../lib/planner/property/serviceArea';
import { __clearEnrichmentCache, enrichProperty, type PropertyProvider } from '../lib/planner/property/enrich';
import { customFields, opportunityFor, tagsFor, toE164, isConfigured, syncToGhl } from '../lib/planner/crm/ghl';
import type { Estimate, PlannerAnswers, PropertyFacts } from '../lib/planner/types';

let failures = 0;
function check(name: string, cond: boolean, detail = '') {
  if (cond) console.log(`  PASS  ${name}`);
  else {
    failures += 1;
    console.log(`  FAIL  ${name}${detail ? `: ${detail}` : ''}`);
  }
}

console.log('\nService area (§ 4.2)');
{
  check('origin coordinates are numeric', Number.isFinite(SERVICE_AREA.origin.lat) && Number.isFinite(SERVICE_AREA.origin.lng),
    JSON.stringify(SERVICE_AREA.origin));

  // Meridian is ~10 miles from downtown Boise; Twin Falls is ~120.
  const meridian = qualify({ lat: 43.6121, lng: -116.3915 });
  const twinFalls = qualify({ lat: 42.5558, lng: -114.4701 });

  check('a nearby suburb qualifies as core', meridian.band === 'core', `${meridian.miles} mi`);
  check('a distant city falls outside', twinFalls.band === 'outside', `${twinFalls.miles} mi`);
  check('band boundaries are inclusive at the edge', bandFor(SERVICE_AREA.coreMiles) === 'core' && bandFor(SERVICE_AREA.extendedMiles) === 'extended');
  check('distance is symmetric', Math.abs(
    distanceMiles({ lat: 43.6, lng: -116.2 }, { lat: 43.7, lng: -116.3 }) -
    distanceMiles({ lat: 43.7, lng: -116.3 }, { lat: 43.6, lng: -116.2 })
  ) < 1e-9);
}

console.log('\nEnrichment degrades rather than fails (§ 4.3)');
{
  const input = { formattedAddress: '1234 W Boise Ave, Boise, ID', lat: 43.6, lng: -116.22 };

  (async () => {
    __clearEnrichmentCache();
    const none = await enrichProperty(input, []);
    check('no configured provider still returns a usable result', none.source === 'NONE');
    check('service area is resolved even with no provider', none.facts.serviceAreaBand === 'core');

    __clearEnrichmentCache();
    const thrower: PropertyProvider = {
      name: 'ATTOM',
      async lookup() {
        throw new Error('provider down');
      },
    };
    const failed = await enrichProperty(input, [thrower]);
    check('a throwing provider does not propagate', failed.source === 'NONE');

    __clearEnrichmentCache();
    const empty: PropertyProvider = { name: 'ESTATED', async lookup() { return null; } };
    const good: PropertyProvider = {
      name: 'ATTOM',
      async lookup() {
        return { yearBuilt: 1961, finishedSqFt: 2340 };
      },
    };
    const chained = await enrichProperty(input, [empty, good]);
    check('falls through to the next provider', chained.source === 'ATTOM' && chained.facts.yearBuilt === 1961);

    __clearEnrichmentCache();
    let calls = 0;
    const counted: PropertyProvider = {
      name: 'ATTOM',
      async lookup() {
        calls += 1;
        return { yearBuilt: 1990 };
      },
    };
    await enrichProperty(input, [counted]);
    await enrichProperty(input, [counted]);
    check('repeat lookups are cached', calls === 1, `${calls} provider calls`);

    runCrmChecks();
  })();
}

function runCrmChecks() {
  console.log('\nCRM mapping (§ 9)');

  const answers: PlannerAnswers = {
    mode: 'A',
    projectType: 'kitchen',
    scopeLevel: 'reimagine',
    finishTier: 'elevated',
    goals: ['function', 'value'],
    timeline: 'asap',
  };
  const property: PropertyFacts = {
    serviceAreaBand: 'core',
    enrichmentSource: 'ATTOM',
    yearBuilt: 1961,
    finishedSqFt: 2340,
    estimatedValue: 620_000,
    historicReviewRequired: true,
  };
  const estimate = {
    outcome: 'ok',
    range: { low: 185_000, mid: 270_000, high: 320_000 },
    confidence: { label: 'Good' },
    overImprovement: true,
    belowMinimum: false,
  } as unknown as Estimate;

  const fields = customFields(answers, property, estimate, { sessionId: 'sess-1' });
  check('exactly twenty promoted fields', Object.keys(fields).length === 20, `${Object.keys(fields).length}`);
  check('range midpoint is promoted for opportunity value', fields.planner_range_mid === 270_000);
  check('session id is promoted as the reconciliation key', fields.planner_session_id === 'sess-1');

  const tags = tagsFor(answers, property, estimate);
  check('band tag reflects the midpoint', tags.includes('band-250-500k'), tags.join(','));
  check('over-improvement is tagged', tags.includes('flag-over-improvement'));
  check('historic overlay is tagged', tags.includes('flag-historic'));
  check('service area is tagged', tags.includes('area-core'));

  const oppty = opportunityFor({ firstName: 'Dana', lastName: 'Reyes', email: 'd@e.com', phone: '2085550142' }, answers, estimate, 'Boise');
  check('opportunity is named per spec', oppty.name === 'Reyes: kitchen: Boise', oppty.name);
  check('opportunity value is the midpoint', oppty.monetaryValue === 270_000);

  check('phone normalises to E.164', toE164('(208) 555-0142') === '+12085550142', toE164('(208) 555-0142'));
  check('already-prefixed numbers are preserved', toE164('1-208-555-0142') === '+12085550142');
  check('empty phone yields empty string', toE164('') === '');

  check('unconfigured CRM reports as unconfigured', isConfigured() === false);

  syncToGhl({
    contact: { firstName: 'Dana', lastName: 'Reyes', email: 'd@e.com', phone: '2085550142' },
    answers,
    property,
    estimate,
    sessionId: 'sess-1',
    fullPayloadJson: '{}',
  }).then((r) => {
    check('unconfigured sync skips rather than throwing', r.status === 'skipped');
    console.log(`\n${failures === 0 ? 'All checks passed.' : `${failures} check(s) failed.`}\n`);
    process.exit(failures === 0 ? 0 : 1);
  });
}
