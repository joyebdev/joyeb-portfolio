'use client';

import { projects } from '@/config/Projects';
import { ExternalLink, Github, PlayCircle } from 'lucide-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

type FeedMode = 'homepage' | 'page';

type ProjectCardData = {
  number: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  technologies: { name: string; icon: React.ReactNode }[];
};

const CARD_ACCENT = '#4ADE80';

const projectCards: ProjectCardData[] = projects.map((project, index) => {
  const category =
    project.technologies.length > 0
      ? project.technologies
          .slice(0, 2)
          .map((technology) => technology.name)
          .join(' / ')
      : 'Web Project';

  return {
    number: String(index + 1).padStart(2, '0'),
    title: project.title,
    description: project.description,
    category,
    imageUrl: project.image,
    liveUrl: project.live || project.link,
    githubUrl: project.github || '',
    technologies: project.technologies,
  };
});

function ActionButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const baseClassName =
    'flex-1 flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm text-white transition-all duration-200';

  if (!href) {
    return (
      <div className={`${baseClassName} cursor-not-allowed opacity-50`} aria-disabled="true">
        {icon}
        <span>{label}</span>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClassName} hover:border-white/30 hover:bg-white/5`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function ProjectCard({
  title,
  description,
  category,
  imageUrl,
  liveUrl,
  githubUrl,
  technologies,
}: ProjectCardData) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.92', 'end 0.08'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.35,
  });

  const cardY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [0, 0, 0] : [28, 0, -18],
  );
  const borderOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.5, 0.8, 1],
    prefersReducedMotion ? [0.12, 0.12, 0.12, 0.12, 0.12] : [0.06, 0.12, 0.28, 0.12, 0.06],
  );
  const accentOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.5, 0.8, 1],
    prefersReducedMotion ? [0.04, 0.04, 0.04, 0.04, 0.04] : [0, 0.04, 0.18, 0.04, 0],
  );
  const borderScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.985, 1, 0.99],
  );
  const imageScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [1.03, 1, 1.015],
  );

  return (
    <div ref={cardRef} className="mx-auto w-full max-w-lg">
      <motion.div style={{ y: cardY }}>
        <motion.div
          className="group relative w-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/6 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 supports-backdrop-filter:bg-white/8"
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  y: -8,
                  boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px ${CARD_ACCENT}`,
                }
          }
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[1.35rem] border border-white/12"
            style={{ opacity: borderOpacity, scale: borderScale }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[1.35rem] border border-[#4ADE80]/20"
            style={{ opacity: accentOpacity }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-px rounded-[1.25rem] bg-linear-to-br from-white/10 via-white/4 to-transparent"
          />

          <article className="relative overflow-hidden rounded-[1.05rem] border border-[#2A2A2A] bg-[#1A1A1A]">
            <motion.div
              className="relative h-60 overflow-hidden rounded-t-[1.05rem] bg-[#0D0D0D] sm:h-64"
              style={{ scale: imageScale }}
            >
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#1A1A1A]/20" />
            </motion.div>

            <div className="space-y-4 p-5">
              <div className="inline-flex items-center rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/10 px-3 py-1">
                <span className="text-xs text-[#4ADE80]">{category}</span>
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>

              <p className="line-clamp-2 text-sm leading-relaxed text-white/60">{description}</p>

              <div className="flex items-center gap-2">
                {technologies.slice(0, 3).map((technology, iconIndex) => (
                  <span
                    key={`${title}-${technology.name}-${iconIndex}`}
                    title={technology.name}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-black/20 [&_img]:h-3.5 [&_img]:w-3.5 [&_svg]:h-3.5 [&_svg]:w-3.5"
                  >
                    {technology.icon}
                  </span>
                ))}
              </div>

              <div className="h-px bg-[#2A2A2A]" />

              <div className="flex gap-3">
                <ActionButton
                  href={liveUrl}
                  icon={<PlayCircle className="h-4 w-4" />}
                  label="Live Preview"
                />
                <ActionButton
                  href={githubUrl}
                  icon={<Github className="h-4 w-4" />}
                  label={githubUrl ? 'Source Code' : 'Private'}
                />
              </div>
            </div>
          </article>
        </motion.div>
      </motion.div>
    </div>
  );
}

function StackedProjectCard({
  project,
  index,
  total,
}: {
  project: ProjectCardData;
  index: number;
  total: number;
}) {
  const stackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start 0.96', 'end 0.04'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.5,
  });

  const remainingCards = Math.max(total - index - 1, 0);
  const liftDistance = Math.min(remainingCards * 28 + 12, 220);
  const settleScale = Math.max(1 - remainingCards * 0.008, 0.95);
  const settleOpacity = Math.max(1 - remainingCards * 0.02, 0.86);

  const stackY = useTransform(
    smoothProgress,
    [0, 0.45, 0.78, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [36, 0, -liftDistance * 0.35, -liftDistance],
  );
  const stackScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [1, 1, settleScale],
  );
  const stackOpacity = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.92, 1, settleOpacity],
  );

  return (
    <div
      ref={stackRef}
      className="sticky top-24 w-full pb-7 sm:top-28 sm:pb-9"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{
          y: stackY,
          scale: stackScale,
          opacity: stackOpacity,
          transformOrigin: 'top center',
        }}
      >
        <ProjectCard {...project} />
      </motion.div>
    </div>
  );
}

function ProjectCardList({
  items,
  stacked = false,
}: {
  items: ProjectCardData[];
  stacked?: boolean;
}) {
  if (!stacked) {
    return (
      <div className="flex flex-col items-center gap-6">
        {items.map((project) => (
          <ProjectCard key={project.number} {...project} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full overflow-visible rounded-[1.75rem] border border-transparent px-1 pb-10 pt-8 sm:px-2 sm:pb-12 sm:pt-10">
      {items.map((project, index) => (
        <StackedProjectCard
          key={project.number}
          project={project}
          index={index}
          total={items.length}
        />
      ))}
    </div>
  );
}

export function ProjectsVerticalFeed({ mode }: { mode: FeedMode }) {
  const visibleProjects =
    mode === 'homepage' ? projectCards.slice(0, 2) : projectCards;

  if (mode === 'page') {
    return (
      <section className="min-h-screen bg-[#0D0D0D] px-4 pb-12 pt-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Featured Projects
            </h1>
            <p className="max-w-2xl text-base text-white/60 sm:text-lg">
              A collection of professional web development projects showcasing modern
              design and full-stack capabilities.
            </p>
          </div>

          <ProjectCardList items={visibleProjects} stacked />
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="mt-20 space-y-8">
      <div className="space-y-3 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">My Works</h2>
        <p className="text-base font-medium text-secondary sm:text-lg">Featured Work</p>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Custom websites and apps crafted for real businesses, each focused on fast
          performance, clean user flows, and modern visual storytelling.
        </p>
      </div>

      <ProjectCardList items={visibleProjects} stacked />

      <div className="flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
        >
          View all projects
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

export default function MasonryProjects() {
  return <ProjectsVerticalFeed mode="homepage" />;
}
