'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { projects } from '@/config/Projects';
import SectionHeading from '@/components/common/SectionHeading';
import ArrowUpRight from '@/components/svgs/ArrowUpRight';

export default function MasonryProjects() {
  return (
    <section id="projects" className="py-14 sm:py-20">
      {/* Header */}
      <div className="mb-10 flex items-end justify-between gap-4 sm:mb-12">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Featured</p>
          <SectionHeading subHeading="" heading="Projects" />
        </div>
        <span className="hidden text-sm text-muted-foreground sm:inline">
          {projects.length} projects
        </span>
      </div>

      {/* Single column list */}
      <div className="flex flex-col gap-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <Link
          href="/contact"
          className="group flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:text-foreground sm:w-auto sm:px-8"
        >
          Let's work together
          <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </Link>
      </div>
    </section>
  );
}

interface CardProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectCard({ project, index }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-30px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 16 }
      }
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-border/60 sm:flex-row"
    >
      {/* Left: Screenshot image */}
      <div
        className="relative h-44 w-full shrink-0 overflow-hidden border-b border-border bg-muted sm:h-auto sm:w-56 sm:border-r sm:border-b-0"
      >
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const t = e.currentTarget as HTMLImageElement;
              t.style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Right: Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-3 sm:p-4">
        {/* Top: index + title + description */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground leading-snug">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-muted-foreground/50 ml-2 shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Bottom: tech icons + live link */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          {/* Tech icons */}
          <div className="flex items-center gap-1.5">
            {project.technologies?.slice(0, 3).map((tech, i) => (
              <div
                key={i}
                title={tech.name}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted [&>img]:h-3 [&>img]:w-3 [&>svg]:h-3 [&>svg]:w-3 sm:[&>img]:h-3.5 sm:[&>img]:w-3.5 sm:[&>svg]:h-3.5 sm:[&>svg]:w-3.5"
              >
                {tech.icon}
              </div>
            ))}
          </div>

          {/* Live site link */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground sm:text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
              Live Site
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover/link:translate-x-px group-hover/link:-translate-y-px transition-transform duration-150"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
