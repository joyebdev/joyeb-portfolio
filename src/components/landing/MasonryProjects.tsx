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
  return (
    <section
      id="projects"
      className="flex w-full flex-col items-center px-4 py-16 md:py-24"
    >
      <div className="flex w-full flex-col items-center">
        <div className="mb-10 flex flex-col items-center gap-1 text-center">
          <p className="text-muted-foreground text-sm">Featured</p>
          <h2 className="text-3xl font-bold md:text-4xl">My Work</h2>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-col gap-5">
          {featuredProjects.map((project, index) => {
            const category = getCategory(project);
            return (
              <motion.div
                key={project.title}
                className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] transition-all duration-300 hover:-translate-y-1 hover:border-[#4ADE80]/50 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  index === 0
                    ? { duration: 0.4, delay: 0.3 }
                    : { duration: 0.4, delay: 0.4 }
                }
              >
                {/* Project number badge */}
                <div className="absolute top-3 left-3 z-10 rounded-md bg-black/60 px-2 py-1 backdrop-blur-sm">
                  <span className="font-mono text-xs text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Image area */}
                <div className="relative h-45 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Category tag */}
                <div className="mx-4 mt-3 inline-flex w-fit rounded-full border border-[#4ADE80]/30 bg-[#4ADE80]/10 px-3 py-1 text-xs font-medium text-[#4ADE80]">
                  {category}
                </div>

                {/* Title */}
                <h3 className="mx-4 mt-2 text-base font-bold text-white">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mx-4 mt-1 mb-3 line-clamp-2 text-xs leading-relaxed text-white/50">
                  {project.description}
                </p>

                {/* Buttons row */}
                <div className="mx-4 mt-auto mb-4 flex gap-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent py-2.5 text-xs font-medium text-white/70 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Site</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent py-2.5 text-xs font-medium text-white/70 transition-all duration-200 hover:border-white/30 hover:bg-white/5 hover:text-white"
                    >
                      <GithubIcon className="h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </motion.div>
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
