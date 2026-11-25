import SiteImage from '@/components/ui/SiteImage';
import { projectStories } from '@/lib/content/project-stories';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import Gallery from '@/components/ui/Gallery';
import Cta from '@/components/ui/Cta';
import Reveal from '@/components/ui/Reveal';
import { pageMeta } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { projects, getProject, relatedProjects } from '@/lib/content/projects';
import ClosingCta from '@/components/sections/ClosingCta';
import { closingCta } from '@/lib/content/closing';
import TrustBar from '@/components/sections/TrustBar';
import ProofSection from '@/components/sections/ProofSection';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Search titles: the project name plus what it is and where, in the
// Keyword | Benefit | Brand form. Names alone told searchers nothing.
const SEO_TITLES: Record<string, string> = {
  'promise-lane-spanish-modern': 'Spanish Modern Custom Home in Idaho | Timber + Love',
  'promise-lane-modern-farmhouse': 'Modern Farmhouse Custom Home in Idaho | Timber + Love',
  'promise-lane-contemporary': 'Butterfly Roof Contemporary Home in Idaho | Timber + Love',
  'casa-de-boise': 'Casa De Boise | Whole-Home Remodel on HGTV | Timber + Love',
  'the-firehouse': 'Firehouse Renovation in Boise | Boise Boys | Timber + Love',
  'central-rim': 'Central Rim Home Remodel in Boise | Timber + Love',
  'stucco-in-time': 'Stucco in Time | Boise Boys Home Remodel | Timber + Love',
  'due-for-a-raze': 'Due for a Raze | Boise Boys Home Remodel | Timber + Love',
  'north-end-gem': 'North End Gem | Historic Boise Home Remodel | Timber + Love',
  'the-darla-house': 'Darla House Cottage Renovation in Boise | Timber + Love',
  'the-chalet': 'Chalet Cabin Renovation in New Meadows | Timber + Love',
  'kualoa-beach-house': 'Kualoa Beach House Renovation on Oahu | Timber + Love',
};

// Search descriptions where the on-page summary runs past ~160 characters.
const SEO_DESCRIPTIONS: Record<string, string> = {
  'promise-lane-contemporary':
    'A new contemporary home under a butterfly roof, with charcoal siding and warm wood outside and oxblood paneling and green marble inside.',
  'north-end-gem':
    'A colorful North End Boise house with a curved porch, green kitchen cabinets, exposed brick and a sunroom full of plants. See the photos.',
  'the-firehouse':
    'A historic Boise firehouse we turned into a home on HGTV’s Boise Boys. Original character, modern inside. See the photos.',
  'promise-lane-spanish-modern':
    'A custom home we built from the ground up, with white stucco, arched windows and doors, light oak and natural stone.',
};

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = getProject(params.slug);
  if (!project) return pageMeta({ title: 'Project', description: '', path: `/projects/${params.slug}/`, noindex: true });
  return pageMeta({
    absoluteTitle: !!SEO_TITLES[project.slug],
    title: SEO_TITLES[project.slug] ?? project.title,
    description: SEO_DESCRIPTIONS[project.slug] ?? project.summary,
    path: `/projects/${project.slug}/`,
  });
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = getProject(params.slug);
  if (!project) notFound();

  const related = relatedProjects(project.slug);
  const story = projectStories[project.slug];
  // Closing band photograph: a main living space where the set has one,
  // otherwise the second frame. The last gallery frame is usually a back yard.
  const closingImage =
    project.gallery.find((g) => /great-room|living|kitchen/i.test(g.src) && g.src !== project.cover)?.src ??
    project.gallery[1]?.src ??
    project.cover;

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Work', path: '/timber-and-love-gallery/' },
          { name: project.title, path: `/projects/${project.slug}/` },
        ])}
      />
      <PageHero eyebrow={project.category} title={project.title} image={project.cover} height="tall">
        <Cta href="/design-and-build-questionnaire/" variant="primary">Tell Us About Your House</Cta>
        <Link href="/timber-and-love-gallery/" className="btn-secondary btn-on-media">See All Houses</Link>
      </PageHero>

      <TrustBar />

      {/* At a glance + story */}
      <section className="bg-bg-primary section">
        <div className="container-wide grid gap-12 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <p className="eyebrow">About This Project</p>
            <h2 className="h-section mt-4">{project.scope} in {project.location}</h2>
            <p className="text-lead mt-6">{project.summary}</p>
            {project.stayHref && (
              <p className="mt-6 text-sm text-text-secondary">
                This property is now available as a vacation rental.{' '}
                <Link href={project.stayHref} className="text-cream link-underline">View the stay</Link>.
              </p>
            )}
          </Reveal>

          <Reveal delay={100} className="surface-card h-max p-6">
            <p className="field-label">At a Glance</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-border-subtle pb-3">
                <dt className="text-text-muted">Type</dt>
                <dd className="text-right text-cream">{project.category}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border-subtle pb-3">
                <dt className="text-text-muted">Location</dt>
                <dd className="text-right text-cream">{project.location}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border-subtle pb-3">
                <dt className="text-text-muted">Scope</dt>
                <dd className="text-right text-cream">{project.scope}</dd>
              </div>
              {project.style && (
                <div className="flex justify-between gap-4 border-b border-border-subtle pb-3">
                  <dt className="text-text-muted">Style</dt>
                  <dd className="text-right text-cream">{project.style}</dd>
                </div>
              )}
              {project.hgtv && (
                <div className="flex justify-between gap-4">
                  <dt className="text-text-muted">Featured On</dt>
                  <dd className="text-right text-cream">{project.hgtv}</dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>
      </section>

      {story && <section className="section-tonal section border-t border-border-subtle"><div className="container-wide">
        <p className="eyebrow">Up close</p><h2 className="h-section mt-4">A closer look at the house</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">{[['The idea', story.idea], ['What you\'ll notice', story.response], ['The finished house', story.result]].map(([title, body]) => <div key={title} className="border-t border-border-subtle pt-6"><h3 className="h-card-sm">{title}</h3><p className="mt-4 text-sm leading-relaxed text-text-secondary">{body}</p></div>)}</div>
        {project.materials && <div className="mt-10 border-t border-border-subtle pt-6"><p className="field-label">Materials and Finishes</p><p className="mt-4 text-sm leading-relaxed text-text-secondary">{project.materials.join(' · ')}</p></div>}
        {project.hgtv && <Link href="/shows/#hgtv-library" className="link-underline mt-7 inline-flex min-h-11 items-center text-sm">Find the Episode in Our HGTV Collection →</Link>}
      </div></section>}

      {/* Full gallery */}
      <section className={`border-t border-border-subtle section ${project.designStory ? 'bg-bg-primary' : 'section-tonal'}`}>
        <div className="container-wide">
          <Reveal className="mb-10">
            <p className="eyebrow">The Space</p>
            <h2 className="h-section mt-4">Look inside</h2>
          </Reveal>
          <Gallery images={project.gallery} columns={3} />
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="section-tonal section-tight">
          <div className="container-wide">
            <Reveal className="mb-8">
              <p className="eyebrow">More Work</p>
              <h2 className="h-section mt-4">Related Projects</h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/projects/${r.slug}/`} className="group card-interactive block overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <SiteImage src={r.cover} alt={`${r.title}: ${r.category}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="h-card">{r.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-text-muted">{r.category} · {r.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}


      <ClosingCta {...closingCta.projectDetail} image={closingImage} />
    </>
  );
}
