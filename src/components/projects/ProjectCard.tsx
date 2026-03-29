'use client';

import { TechStackPills } from '@/components/projects/TechStackPills';
import { projects } from '@/config/Projects';
import { ExternalLink, FileText, Github } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { TypographyBanner } from './TypographyBanner';

function getCategory(project: (typeof projects)[number]): string {
  return project.technologies.length > 1
    ? `${project.technologies[0]?.name} / ${project.technologies[1]?.name}`
    : (project.technologies[0]?.name ?? 'Web Project');
}

const actionBtnClass =
  'flex flex-1 min-w-0 items-center justify-center gap-2 rounded-xl bg-black/5 px-3 py-2.5 text-xs font-medium text-black/70 transition-all duration-200 hover:bg-black/10 hover:text-black dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white';

export function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const category = getCategory(project);
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)] dark:bg-[#0D0D0D]">

      <TypographyBanner title={project.title} theme={project.theme} />

      <div className="space-y-3 p-4">
        <div className="inline-flex w-fit items-center rounded-full bg-[#4ADE80]/10 px-3 py-1">
          <span className="text-xs font-medium text-[#4ADE80]">{category}</span>
        </div>


        {/* Title is now in TypographyBanner */}

        <p className="line-clamp-2 text-xs leading-relaxed text-black/60 dark:text-white/50">
          {project.description}
        </p>

        <TechStackPills items={project.techStack} className="mt-3" />

        <div className="flex flex-wrap gap-2 pt-1">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={actionBtnClass}
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              <span>Live</span>
            </a>
          ) : null}

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={actionBtnClass}
            >
              <Github className="h-4 w-4 shrink-0" />
              <span>GitHub</span>
            </a>
          ) : null}

          <Link
            href={`/projects/${project.slug}`}
            className={`${actionBtnClass} ring-1 ring-black/10 dark:ring-white/15`}
          >
            <FileText className="h-4 w-4 shrink-0" />
            <span>Details</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
