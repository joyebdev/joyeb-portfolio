'use client';

import type { BlogPostPreview } from '@/types/blog';
import { animate, motion, useMotionValue } from 'motion/react';
import { Link } from 'next-view-transitions';
import { useCallback, useEffect, useRef, useState } from 'react';

const GAP = 24;
const SPRING_CONFIG = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 35,
  mass: 0.8,
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ChevronLeft() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none">
      <path
        d="M10 12L6 8l4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type BlogProps = {
  posts: BlogPostPreview[];
};

export default function Blog({ posts }: BlogProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameWidth, setFrameWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);

  const safePosts = posts as BlogPostPreview[];
  const totalPosts = safePosts.length;
  const activeCardWidth = frameWidth * (isMobile ? 0.7 : 0.6);
  const sideCardWidth = Math.max((frameWidth - activeCardWidth - GAP * 2) / 2, 0);
  const step = sideCardWidth + GAP;
  const atStart = currentIndex === 0;
  const atEnd = currentIndex === totalPosts - 1;

  const getXForIndex = useCallback(
    (index: number) =>
      frameWidth / 2 - activeCardWidth / 2 - (sideCardWidth + GAP) - index * step,
    [frameWidth, activeCardWidth, sideCardWidth, step],
  );

  const clampX = useCallback(
    (value: number) => {
      if (totalPosts <= 1) return getXForIndex(0);
      const maxX = getXForIndex(0);
      const minX = getXForIndex(totalPosts - 1);
      return Math.max(minX, Math.min(maxX, value));
    },
    [getXForIndex, totalPosts],
  );

  useEffect(() => {
    const updateMeasurements = () => {
      setFrameWidth(frameRef.current?.offsetWidth ?? 800);
      setIsMobile(window.innerWidth < 768);
    };

    updateMeasurements();
    window.addEventListener('resize', updateMeasurements);
    return () => window.removeEventListener('resize', updateMeasurements);
  }, []);

  useEffect(() => {
    if (totalPosts === 0 || frameWidth === 0) {
      x.set(0);
      return;
    }

    const clampedIndex = Math.max(0, Math.min(currentIndex, totalPosts - 1));
    if (clampedIndex !== currentIndex) {
      setCurrentIndex(clampedIndex);
      return;
    }

    x.set(clampX(getXForIndex(clampedIndex)));
  }, [clampX, currentIndex, frameWidth, getXForIndex, totalPosts, x]);

  const goToIndex = useCallback(
    (index: number) => {
      if (totalPosts === 0) return;
      const clampedIndex = Math.max(0, Math.min(index, totalPosts - 1));
      setCurrentIndex(clampedIndex);
      animate(x, clampX(getXForIndex(clampedIndex)), SPRING_CONFIG);
    },
    [clampX, getXForIndex, totalPosts, x],
  );

  const handlePrev = useCallback(() => {
    if (atStart) return;
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    animate(x, clampX(x.get() + step), SPRING_CONFIG);
  }, [atStart, clampX, step, x]);

  const handleNext = useCallback(() => {
    if (atEnd) return;
    setCurrentIndex((prev) => Math.min(totalPosts - 1, prev + 1));
    animate(x, clampX(x.get() - step), SPRING_CONFIG);
  }, [atEnd, clampX, step, totalPosts, x]);

  const handlePanEnd = useCallback(
    (_event: unknown, info: { offset: { x: number } }) => {
      if (info.offset.x < -50) handleNext();
      if (info.offset.x > 50) handlePrev();
    },
    [handleNext, handlePrev],
  );

  if (totalPosts === 0) return null;

  return (
    <section id="blogs" className="mt-16 md:mt-20">
      <div className="flex flex-col items-center justify-center gap-1 mb-8 text-center">
        <p className="text-sm text-muted-foreground">Featured</p>
        <h2 className="text-3xl font-bold">Blogs</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {String(currentIndex + 1).padStart(2, '0')} /{' '}
          {String(totalPosts).padStart(2, '0')}
        </p>
      </div>

      <div
        ref={frameRef}
        className="h-[378px] md:h-[416px] rounded-2xl md:rounded-3xl border border-border bg-card/30 p-5 md:p-8 relative overflow-hidden w-full"
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={atStart}
          aria-label="Previous blog"
          className={`absolute left-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors duration-150 hover:bg-muted ${
            atStart ? 'opacity-0 pointer-events-none' : ''
          }`}
        >
          <ChevronLeft />
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={atEnd}
          aria-label="Next blog"
          className={`absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors duration-150 hover:bg-muted ${
            atEnd ? 'opacity-0 pointer-events-none' : ''
          }`}
        >
          <ChevronRight />
        </button>

        <motion.div
          style={{ x }}
          className="flex h-full flex-row gap-6"
          onPanEnd={handlePanEnd}
        >
          <div className="h-full shrink-0" style={{ width: sideCardWidth }} />

          {safePosts.map((post, index) => {
            const { frontmatter, slug } = post;
            const number = String(index + 1).padStart(2, '0');
            const tag = frontmatter.tags?.[0] ?? frontmatter.tag ?? 'Blog';
            const isActive = index === currentIndex;
            const isAdjacent = Math.abs(index - currentIndex) === 1;
            const opacity = isActive ? 1 : isAdjacent ? 0.4 : 0;
            const shiftX =
              index === currentIndex - 1
                ? -sideCardWidth / 2
                : index === currentIndex + 1
                  ? sideCardWidth / 2
                  : 0;

            if (isActive) {
              return (
                <motion.div
                  key={slug}
                  className="h-full shrink-0"
                  animate={{
                    width: activeCardWidth,
                    opacity,
                    scale: 1,
                    x: shiftX,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                >
                  <Link href={`/blog/${slug}`} className="block h-full w-full">
                    <article className="bg-card rounded-2xl p-7 h-full border border-foreground/20 relative flex w-full flex-col">
                      <span className="absolute top-3 right-4 text-7xl font-bold text-muted-foreground/10 select-none">
                        {number}
                      </span>

                      <span className="text-xs px-2.5 py-0.5 rounded-full border border-border text-muted-foreground bg-muted/50 w-fit">
                        {tag}
                      </span>

                      <h3 className="text-base font-semibold line-clamp-2 mt-2">
                        {frontmatter.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
                        {frontmatter.description}
                      </p>

                      <div className="border-t border-border pt-3 mt-auto flex justify-between items-center">
                        <div className="text-xs text-muted-foreground/70 flex items-center gap-1.5">
                          <span>{formatDate(frontmatter.date)}</span>
                          {frontmatter.readTime && (
                            <>
                              <span>•</span>
                              <span>{frontmatter.readTime}</span>
                            </>
                          )}
                        </div>

                        <span className="text-xs font-medium flex items-center gap-1">
                          Read
                          <span>→</span>
                          <svg
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M3 8h10M9 4l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={slug}
                className="h-full shrink-0 pointer-events-none"
                animate={{
                  width: sideCardWidth,
                  opacity,
                  scale: 0.9,
                  x: shiftX,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              >
                <article className="bg-card rounded-2xl p-5 h-full border border-border relative flex w-full flex-col">
                  <span className="absolute top-3 right-4 text-5xl font-bold text-muted-foreground/10 select-none">
                    {number}
                  </span>

                  <span className="text-xs px-2.5 py-0.5 rounded-full border border-border text-muted-foreground bg-muted/50 w-fit">
                    {tag}
                  </span>

                  <h3 className="text-base font-semibold line-clamp-2 mt-2">
                    {frontmatter.title}
                  </h3>
                </article>
              </motion.div>
            );
          })}

          <div className="h-full shrink-0" style={{ width: sideCardWidth }} />
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-4">
        {safePosts.map((post, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={post.slug}
              type="button"
              aria-label={`Go to blog ${index + 1}`}
              onClick={() => goToIndex(index)}
              className={isActive ? 'w-4 h-2 rounded-full bg-foreground transition-all duration-300' : 'w-2 h-2 rounded-full bg-muted-foreground/30 transition-all duration-300'}
            />
          );
        })}
      </div>
    </section>
  );
}
