'use client';

import { projects } from '@/config/Projects';
import GithubIcon from '@/components/svgs/Github';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

const featuredProjects = [projects[0], projects[1]].filter(
  (project): project is (typeof projects)[number] => Boolean(project),
);

function getCategory(project: (typeof projects)[number]): string {
  return project.technologies.length > 1
    ? `${project.technologies[0]?.name} / ${project.technologies[1]?.name}`
    : (project.technologies[0]?.name ?? 'Web Project');
}

export function ProjectsVerticalFeed() {
  const visibleProjects = featuredProjects;

  return (
    <section
      id="projects"
      className="flex w-full flex-col items-center py-16 md:py-24"
    >
      <div className="w-full">
        <div className="mb-10 flex flex-col items-center gap-1 text-center">
          <p className="text-muted-foreground text-sm">Featured</p>
          <h2 className="text-3xl font-bold md:text-4xl">My Work</h2>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-y-auto py-3">
          {visibleProjects.map((project, index) => {
            const category = getCategory(project);

            return (
              <div key={project.title} className="mx-auto w-full max-w-[380px]">
                <motion.div
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A] transition-all duration-300 hover:-translate-y-1 hover:border-[#4ADE80]/50 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    index === 0
                      ? { duration: 0.4, delay: 0.3 }
                      : { duration: 0.4, delay: 0.4 }
                  }
                >
                  <div className="absolute top-3 left-3 z-10 rounded-md bg-black/60 px-2 py-1 backdrop-blur-sm">
                    <span className="font-mono text-xs font-medium text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="relative h-[200px] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-3 mx-4 inline-flex items-center rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-3 py-1">
                    <span className="text-xs font-medium text-[#4ADE80]">
                      {category}
                    </span>
                  </div>

                  <h3 className="mt-2 mx-4 text-lg leading-snug font-bold text-white">
                    {project.title}
                  </h3>

                  <p className="mt-1 mx-4 mb-4 line-clamp-2 text-sm leading-relaxed text-white/50">
                    {project.description}
                  </p>

                  <div className="mt-auto mx-4 mb-4 flex items-center gap-3">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent py-2.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Live Site</span>
                      </a>
                    ) : null}

                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent py-2.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
                      >
                        <GithubIcon className="h-4 w-4" />
                        <span>GitHub</span>
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            href="/projects"
            className="text-muted-foreground flex items-center gap-1 text-sm transition-colors hover:text-white"
          >
            View All Projects
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function MasonryProjects() {
  return <ProjectsVerticalFeed />;
}
