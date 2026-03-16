'use client';

import GithubIcon from '@/components/svgs/Github';
import { projects } from '@/config/Projects';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

function getCategory(project: (typeof projects)[number]): string {
  return project.technologies.length > 1
    ? `${project.technologies[0]?.name} / ${project.technologies[1]?.name}`
    : (project.technologies[0]?.name ?? 'Web Project');
}

function getProjectSlug(project: (typeof projects)[number]): string {
  if (project.projectDetailsPageSlug?.trim()) {
    return project.projectDetailsPageSlug.trim();
  }

  return project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function ProjectList() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => {
        const category = getCategory(project);
        const projectHref = `/projects/${getProjectSlug(project)}`;

        return (
          <div key={project.title} className="w-full">
            <Link
              href={projectHref}
              className="block w-full"
              aria-label={`Open ${project.title}`}
            >
              <motion.article
                className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A] transition-all duration-300 hover:-translate-y-1 hover:border-[#4ADE80]/50 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="absolute top-3 left-3 z-10 rounded-md bg-black/60 px-2 py-1 backdrop-blur-sm">
                  <span className="font-mono text-xs font-medium text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="relative h-50 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mx-4 mt-3 inline-flex items-center rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-3 py-1">
                  <span className="text-xs font-medium text-[#4ADE80]">
                    {category}
                  </span>
                </div>

                <h3 className="mx-4 mt-2 text-lg leading-snug font-bold text-white">
                  {project.title}
                </h3>

                <p className="mx-4 mt-1 mb-4 line-clamp-2 text-sm leading-relaxed text-white/50">
                  {project.description}
                </p>

                <div className="relative z-20 mx-4 mt-auto mb-4 flex items-center gap-3">
                  {project.link ? (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        window.open(
                          project.link,
                          '_blank',
                          'noopener,noreferrer',
                        );
                      }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent py-2.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Site</span>
                    </button>
                  ) : null}

                  {project.github ? (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        window.open(
                          project.github,
                          '_blank',
                          'noopener,noreferrer',
                        );
                      }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent py-2.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
                    >
                      <GithubIcon className="h-4 w-4" />
                      <span>GitHub</span>
                    </button>
                  ) : null}
                </div>
              </motion.article>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
