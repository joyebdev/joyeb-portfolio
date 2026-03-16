'use client';

import { projects } from '@/config/Projects';
import { cn } from '@/lib/utils';
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
import { memo, useCallback, useEffect, useRef, useState } from 'react';

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

type ProjectCardVariant = 'default' | 'reel';

const CARD_ACCENT = '#4ADE80';
const REEL_CARD_BACKGROUNDS = ['#1a2018', '#1a1824'] as const;
const WHEEL_SWITCH_THRESHOLD = 40;
const TOUCH_SWIPE_THRESHOLD = 50;
const SWITCH_COOLDOWN_MS = 700;

const toProjectCardData = (project: (typeof projects)[number], index: number): ProjectCardData => {
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
};

const projectCards: ProjectCardData[] = projects.map((project, index) =>
  toProjectCardData(project, index),
);

const featuredProjects = [projects[0], projects[1]];
const featuredProjectCards: ProjectCardData[] = featuredProjects
  .filter((project): project is (typeof projects)[number] => Boolean(project))
  .map((project, index) => toProjectCardData(project, index));

const ActionButton = memo(function ActionButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}): React.JSX.Element {
  const baseClassName =
    'flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-black/10 bg-black/[0.02] px-4 py-2.5 text-sm text-foreground transition-all duration-200 dark:border-white/20 dark:bg-transparent dark:text-white';

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
      className={`${baseClassName} hover:border-black/15 hover:bg-black/4 dark:hover:border-white/30 dark:hover:bg-white/5`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
});

const ProjectCard = memo(function ProjectCard({
  title,
  description,
  category,
  imageUrl,
  liveUrl,
  githubUrl,
  technologies,
  variant = 'default',
}: ProjectCardData & {
  variant?: ProjectCardVariant;
}): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isReel = variant === 'reel';
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
    <div ref={cardRef} className={cn('mx-auto w-full', isReel ? 'max-w-none' : 'max-w-lg')}>
      <motion.div style={{ y: cardY }} className={cn(isReel && 'h-full')}>
        <motion.div
          className={cn(
            'group relative w-full overflow-hidden rounded-[1.35rem] border bg-white/70 backdrop-blur-xl transition-all duration-300 supports-backdrop-filter:bg-white/75 dark:bg-white/6 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:supports-backdrop-filter:bg-white/8',
            isReel
              ? 'h-full border-black/12 p-2.5 shadow-[0_24px_70px_rgba(15,23,42,0.12)] dark:border-white/14'
              : 'border-black/8 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:border-white/10',
          )}
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
            className="pointer-events-none absolute inset-0 rounded-[1.35rem] border border-black/10 dark:border-white/12"
            style={{ opacity: borderOpacity, scale: borderScale }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[1.35rem] border border-[#4ADE80]/20"
            style={{ opacity: accentOpacity }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-px rounded-[1.25rem] bg-linear-to-br from-white/75 via-white/30 to-transparent dark:from-white/10 dark:via-white/4"
          />

          <article
            className={cn(
              'relative overflow-hidden rounded-[1.05rem] border border-black/8 bg-white/95 dark:border-[#2A2A2A] dark:bg-[#1A1A1A]',
              isReel && 'flex h-full flex-col border-black/10 dark:border-white/12',
            )}
          >
            <motion.div
              className={cn(
                'relative overflow-hidden rounded-t-[1.05rem] bg-slate-100 dark:bg-[#0D0D0D]',
                isReel ? 'h-72 sm:h-80 lg:h-88' : 'h-60 sm:h-64',
              )}
              style={{ scale: imageScale }}
            >
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-950/10 dark:to-[#1A1A1A]/20" />
            </motion.div>

            <div className={cn('space-y-4 p-5', isReel && 'flex flex-1 flex-col p-5 sm:p-6')}>
              <div className="inline-flex items-center rounded-full border border-[#4ADE80]/20 bg-[#4ADE80]/10 px-3 py-1">
                <span className="text-xs text-[#4ADE80]">{category}</span>
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {title}
              </h3>

              <p
                className={cn(
                  'text-sm leading-relaxed text-slate-600 dark:text-white/60',
                  isReel ? 'line-clamp-3 sm:line-clamp-4' : 'line-clamp-2',
                )}
              >
                {description}
              </p>

              <div className={cn(isReel && 'mt-auto space-y-4')}>
                <div className="flex items-center gap-2">
                  {technologies.slice(0, 3).map((technology, iconIndex) => (
                    <span
                      key={`${title}-${technology.name}-${iconIndex}`}
                      title={technology.name}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-black/10 bg-slate-100 text-slate-700 [&_img]:h-3.5 [&_img]:w-3.5 [&_svg]:h-3.5 [&_svg]:w-3.5 dark:border-white/15 dark:bg-black/20 dark:text-white"
                    >
                      {technology.icon}
                    </span>
                  ))}
                </div>

                <div className="h-px bg-black/8 dark:bg-[#2A2A2A]" />

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
            </div>
          </article>
        </motion.div>
      </motion.div>
    </div>
  );
});

ActionButton.displayName = 'ActionButton';
ProjectCard.displayName = 'ProjectCard';

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
    <div className="relative mx-auto min-h-[80vh] w-full overflow-visible rounded-[1.75rem] border border-transparent px-1 pb-10 pt-8 sm:px-2 sm:pb-12 sm:pt-10 lg:min-h-[85vh]">
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

const ReelProjectCard = memo(function ReelProjectCard({
  project,
  cardBgColor,
}: {
  project: ProjectCardData;
  cardBgColor: string;
}) {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-white/10"
      style={{ backgroundColor: cardBgColor }}
    >
      <div className="relative flex-[1.2] overflow-hidden rounded-t-xl">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
        />
        <div
          className="absolute bottom-0 left-0 h-10 w-full"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, ${cardBgColor})`,
          }}
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-3 md:p-4">
        <div className="space-y-2">
          <p className="font-mono text-[10px] tracking-[0.18em] text-white/30">
            {project.number}
          </p>
          <h3 className="text-sm font-semibold text-white md:text-base">{project.title}</h3>
          <p className="hidden line-clamp-2 text-[11px] text-white/50 min-[420px]:block">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-white/90 transition-colors hover:text-white"
            >
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80]/80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
              </span>
              <span>Live Site</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs font-medium text-white/40">
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span>Live Site</span>
            </span>
          )}

          <div className="hidden items-center gap-1.5 min-[420px]:flex">
            {project.technologies.slice(0, 4).map((technology, iconIndex) => (
              <span
                key={`${project.title}-${technology.name}-${iconIndex}`}
                title={technology.name}
                className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-white [&_img]:h-3 [&_img]:w-3 [&_svg]:h-3 [&_svg]:w-3"
              >
                {technology.icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
});

ReelProjectCard.displayName = 'ReelProjectCard';

function ProjectReel({ items }: { items: ProjectCardData[] }) {
  const reelRef = useRef<HTMLDivElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const reelItems = items.slice(0, 2);

  const lockScroll = useCallback(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.dataset.scrollY = String(scrollY);
  }, []);

  const unlockScroll = useCallback(() => {
    const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
  }, []);

  const startDebounce = useCallback(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      debounceRef.current = null;
    }, SWITCH_COOLDOWN_MS);
  }, []);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!isLocked) {
        return;
      }

      event.preventDefault();

      if (debounceRef.current) {
        return;
      }

      if (event.deltaY > WHEEL_SWITCH_THRESHOLD && activeCard === 0) {
        setActiveCard(1);
        unlockScroll();
        setIsLocked(false);
        startDebounce();
      } else if (event.deltaY < -WHEEL_SWITCH_THRESHOLD && activeCard === 1) {
        setActiveCard(0);
        startDebounce();
      }
    },
    [activeCard, isLocked, startDebounce, unlockScroll],
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (!isLocked) {
        return;
      }

      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    },
    [isLocked],
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!isLocked || touchStartYRef.current === null) {
        return;
      }

      if (debounceRef.current) {
        touchStartYRef.current = null;
        return;
      }

      const endY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const distance = endY - touchStartYRef.current;

      if (distance < -TOUCH_SWIPE_THRESHOLD && activeCard === 0) {
        setActiveCard(1);
        unlockScroll();
        setIsLocked(false);
        startDebounce();
      } else if (distance > TOUCH_SWIPE_THRESHOLD && activeCard === 1) {
        setActiveCard(0);
        startDebounce();
      }

      touchStartYRef.current = null;
    },
    [activeCard, isLocked, startDebounce, unlockScroll],
  );

  useEffect(() => {
    const reelSection = reelRef.current;

    if (!reelSection || reelItems.length < 2) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveCard(0);
          lockScroll();
          setIsLocked(true);
          return;
        }

        unlockScroll();
        setIsLocked(false);
        setActiveCard(0);
      },
      {
        threshold: 0.85,
      },
    );

    observer.observe(reelSection);

    return () => {
      observer.disconnect();
      unlockScroll();
    };
  }, [lockScroll, reelItems.length, unlockScroll]);

  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const section = reelRef.current;
    if (!section) {
      return;
    }

    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchEnd, handleTouchStart, handleWheel, isLocked]);

  useEffect(() => {
    return () => {
      unlockScroll();
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [unlockScroll]);

  return (
    <div ref={reelRef} className="relative mx-auto w-full max-w-3xl">
      <div className="relative overflow-hidden rounded-4xl border border-black/10 bg-linear-to-b from-black/3 via-transparent to-transparent p-3 shadow-[0_28px_80px_rgba(15,23,42,0.12)] dark:border-white/12 dark:from-white/4">
        <div className="pointer-events-none absolute inset-x-3 top-3 z-10 h-16 rounded-t-3xl bg-linear-to-b from-background/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 h-20 rounded-b-3xl bg-linear-to-t from-background/95 to-transparent" />

        <div
          className="relative h-[70vh] min-h-136 max-h-192 overflow-hidden rounded-[1.55rem] p-3 md:p-4 sm:h-[74vh]"
        >
          {reelItems.map((project, index) => (
            <motion.div
              key={project.number}
              className="absolute inset-0"
              initial={false}
              animate={{
                y:
                  index < activeCard
                    ? '-100%'
                    : index > activeCard
                      ? '100%'
                      : '0%',
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              style={{ zIndex: index === activeCard ? 2 : 1 }}
            >
              <ReelProjectCard
                project={project}
                cardBgColor={REEL_CARD_BACKGROUNDS[index] ?? REEL_CARD_BACKGROUNDS[1]}
              />
            </motion.div>
          ))}
        </div>

        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-1 transition-all duration-500',
            isLocked ? 'opacity-100' : 'opacity-0',
          )}
        >
          <div className="flex items-center gap-1.5">
            {reelItems.map((project, index) => (
              <span
                key={`${project.number}-dot`}
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-all duration-500',
                  activeCard === index ? 'bg-white' : 'bg-white/30',
                )}
              />
            ))}
          </div>
          <p
            className={cn(
              'text-[10px] text-white/30 transition-all duration-500',
              activeCard === 0 ? 'opacity-100' : 'opacity-0',
            )}
          >
            scroll to see next project
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProjectsVerticalFeed({ mode }: { mode: FeedMode }) {
  const visibleProjects = mode === 'homepage' ? featuredProjectCards : projectCards;

  if (mode === 'page') {
    return (
      <section className="min-h-screen bg-background px-4 pb-12 pt-20 text-foreground transition-colors sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 space-y-4">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              Featured Projects
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">
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
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
          My Works
        </h2>
        <p className="text-base font-medium text-secondary sm:text-lg">Featured Work</p>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg lg:text-xl">
          Custom websites and apps crafted for real businesses, each focused on fast
          performance, clean user flows, and modern visual storytelling.
        </p>
      </div>

      <ProjectReel items={visibleProjects} />

      <div className="flex justify-center">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
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
