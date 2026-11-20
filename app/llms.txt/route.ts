import { site, pathways } from '@/lib/site';
import { projects } from '@/lib/content/projects';
import { rentals } from '@/lib/content/rentals';
import { journalPosts } from '@/lib/content/journal';
import { SERVICE_CITIES } from '@/lib/schema';

// Plain-language summary for AI assistants, built from the same content files
// as the pages so it never drifts from the site.
export const dynamic = 'force-static';

export function GET() {
  const u = (path: string) => `${site.url}${path}`;
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.name} is a design-build firm in Boise, Idaho, founded in ${site.founded} and led by Luke Caldwell of HGTV's Boise Boys. It designs and builds custom homes and luxury remodels across the Treasure Valley, and connects clients to affiliated real estate, cash offer, investment and vacation rental services.`,
    '',
    `- Business name: ${site.gbpName} (brand mark: ${site.name})`,
    `- Address: ${site.address.full}`,
    `- Hours: ${site.hours.label}`,
    `- Phone: ${site.phone}`,
    `- Email: ${site.email}`,
    `- Service area: ${SERVICE_CITIES.join(', ')} (Idaho)`,
    '',
    '## Services',
    ...pathways.map((p) => `- [${p.title}](${u(p.href)}): ${p.blurb}`),
    `- [Our design-build process](${u('/our-process/')}): what happens at each step, from consultation to final walkthrough.`,
    `- [Financing a project](${u('/financing/')}): common ways homeowners pay for a remodel or custom home.`,
    `- [Start a project](${u('/design-and-build-questionnaire/')}): the design-build questionnaire.`,
    '',
    '## Projects',
    ...projects.map((p) => `- [${p.title}](${u(`/projects/${p.slug}/`)}): ${p.summary}`),
    '',
    '## Vacation rentals',
    ...rentals.map((r) => `- [${r.name}](${u(r.href)}): ${r.destination}. ${r.facts.replace(/ · /g, ', ')}. ${r.blurb}`),
    '',
    '## About and media',
    `- [About ${site.name}](${u('/about/')})`,
    `- [Luke Caldwell FAQ](${u('/luke-caldwell-faq/')})`,
    `- [Boise Boys and Outgrown episodes](${u('/shows/')})`,
    `- [Homes from HGTV's Boise Boys](${u('/the-boise-boys/')})`,
    `- [Reviews](${u('/reviews/')})`,
    `- [Contact](${u('/contact/')})`,
    '',
    '## Journal',
    ...journalPosts.map((p) => `- [${p.title}](${u(p.href)}): ${p.excerpt}`),
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
