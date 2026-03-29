import Container from '@/components/common/Container';
import ArrowLeft from '@/components/svgs/ArrowLeft';
import { TechStackPills } from '@/components/projects/TechStackPills';
import { projects, getProjectBySlug } from '@/config/Projects';
import { siteConfig } from '@/config/Meta';
import type { Metadata } from 'next';
import { TypographyBanner } from '@/components/projects/TypographyBanner';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: 'Project' };
  }
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.description,
      url: `${siteConfig.url}/projects/${slug}`,
      images: [{ url: project.image, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const actionBtnClass =
    'inline-flex items-center justify-center gap-2 rounded-xl bg-black/5 px-4 py-2.5 text-sm font-medium text-black/80 transition-colors hover:bg-black/10 hover:text-black dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white';

  return (
    <Container className="min-h-screen px-4 py-12 sm:py-16">
      <Link
        href="/#my-work"
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>

      <article className="mx-auto max-w-4xl space-y-10">
        <div className="mb-8">
          <TypographyBanner title={project.title} theme={project.theme} />
        </div>

        {/* Overview Section */}
        {project.fullDescription && (
          <section className="mt-10 space-y-3">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="text-white/70 leading-relaxed">
              {project.fullDescription}
            </p>
          </section>
        )}

        {/* Features Section */}
        {project.features && project.features.length > 0 && (
          <section className="mt-10 space-y-3">
            <h2 className="text-xl font-semibold">Features</h2>
            <ul className="list-disc list-inside text-white/70 space-y-1">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Challenges Section */}
        {project.challenges && (
          <section className="mt-10 space-y-3">
            <h2 className="text-xl font-semibold">Challenges</h2>
            <p className="text-white/70 leading-relaxed">
              {project.challenges}
            </p>
          </section>
        )}

        {/* Solutions Section */}
        {project.solutions && (
          <section className="mt-10 space-y-3">
            <h2 className="text-xl font-semibold">Solutions</h2>
            <p className="text-white/70 leading-relaxed">
              {project.solutions}
            </p>
          </section>
        )}
      </article>
    </Container>
  );
}
