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

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return pageMeta({ title: 'Project', description: '', path: `/projects/${params.slug}/`, noindex: true });
  return pageMeta({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}/`,
    image: project.cover,
  });
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const related = relatedProjects(project.slug);

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
        <Cta href="/design-and-build-questionnaire/" variant="primary">Start Your Project</Cta>
        <Link href="/timber-and-love-gallery/" className="btn-secondary">All Projects</Link>
      </PageHero>

      <TrustBar />

      {/* At a glance + story */}
      <section className="bg-bg-primary section">
        <div className="container-wide grid gap-12 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <p className="eyebrow">About This Project</p>
            <h2 className="h-section mt-4">{project.scope} in {project.location}</h2>
            <p className="text-lead mt-6">{project.summary}</p>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Designed and built by the Timber and Love in-house team, this project reflects our warm, modern approach to
              Boise homes, with design and construction coordinated under one roof from concept through completion.
            </p>
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

      {/* Full gallery */}
      <section className="border-t border-border-subtle bg-bg-secondary section">
        <div className="container-wide">
          <Reveal className="mb-10">
            <p className="eyebrow">The Space</p>
            <h2 className="h-section mt-4">Take a Look Inside</h2>
          </Reveal>
          <Gallery images={project.gallery} columns={3} />
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="bg-bg-primary section-tight">
          <div className="container-wide">
            <Reveal className="mb-8">
              <p className="eyebrow">More Work</p>
              <h2 className="h-section mt-4">Related Projects</h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/projects/${r.slug}/`} className="group card-interactive block overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.cover} alt={`${r.title} — ${r.category}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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

      <ClosingCta {...closingCta.projectDetail} />
    </>
  );
}
