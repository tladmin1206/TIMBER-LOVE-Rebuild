import { redirect } from 'next/navigation';
import { pageMeta } from '@/lib/seo';

/**
 * Retired: permanently redirected to /investment-planner.
 *
 * The tool that lived here asked homeowners to self-diagnose construction scope
 * ("structural changes", "HVAC changes"), which is the work they are hiring us
 * to do, and then answered with ranges wide enough to alarm rather than inform
 *: labelled with a confidence it had not earned.
 *
 * The planner replaces it: one visual question instead of a fifteen-item
 * checklist, and an engine that withholds a figure rather than guess at one.
 * The route is kept so existing links, the header CTA, and the mobile bar keep
 * working.
 */
export const metadata = pageMeta({
  title: 'Design + Build Investment Planner',
  description:
    'Plan your Boise design and build project in about three minutes and see what it involves, what to expect, and what happens next.',
  path: '/estimate/',
});

export default function Page() {
  redirect('/investment-planner/');
}
