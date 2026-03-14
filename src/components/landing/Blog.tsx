'use client';

import Container from '@/components/common/Container';
import type { BlogPostPreview } from '@/types/blog';
import { animate, motion, useMotionValue } from 'motion/react';
import { Link } from 'next-view-transitions';
import { useCallback, useEffect, useRef, useState } from 'react';

const CARD_WIDTH = 340;
const MOBILE_CARD_WIDTH = 260;
const GAP = 24;
const FRAME_PADDING = 24;
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
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 16 16"
      fill="none"
    >
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
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 16 16"
      fill="none"
    >
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frameWidth, setFrameWidth] = useState(800);
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH);
  const x = useMotionValue(0);

  const safePosts = posts ?? [];
  const totalPosts = safePosts.length;
  const step = cardWidth + GAP;
  const innerFrameWidth = Math.max(frameWidth - FRAME_PADDING * 2, 0);
  const atStart = currentIndex === 0;
  const atEnd = currentIndex === totalPosts - 1;

  const getCenteredX = useCallback(
    (index: number) => -(index * step) + (innerFrameWidth / 2 - cardWidth / 2),
    [step, innerFrameWidth, cardWidth],
  );

  useEffect(() => {
    const updateMeasurements = () => {
      const measuredWidth = frameRef.current?.offsetWidth ?? 800;
      setFrameWidth(measuredWidth);
      setCardWidth(window.innerWidth < 640 ? MOBILE_CARD_WIDTH : CARD_WIDTH);
    };

    updateMeasurements();
    window.addEventListener('resize', updateMeasurements);
    return () => window.removeEventListener('resize', updateMeasurements);
  }, []);

  useEffect(() => {
    if (totalPosts === 0) {
      x.set(0);
      return;
    }

    const clampedIndex = Math.max(0, Math.min(currentIndex, totalPosts - 1));
    if (clampedIndex !== currentIndex) {
      setCurrentIndex(clampedIndex);
      return;
    }

    x.set(getCenteredX(clampedIndex));
  }, [currentIndex, totalPosts, getCenteredX, x]);

  const goToIndex = useCallback(
    (index: number) => {
      if (totalPosts === 0) return;
      const clampedIndex = Math.max(0, Math.min(index, totalPosts - 1));
      setCurrentIndex(clampedIndex);
      animate(x, getCenteredX(clampedIndex), SPRING_CONFIG);
    },
    [getCenteredX, totalPosts, x],
  );

  const handlePrev = useCallback(() => {
    if (atStart) return;
    goToIndex(currentIndex - 1);
  }, [atStart, currentIndex, goToIndex]);

  const handleNext = useCallback(() => {
    if (atEnd) return;
    goToIndex(currentIndex + 1);
  }, [atEnd, currentIndex, goToIndex]);

  const handlePanEnd = useCallback(
    (_event: unknown, info: { offset: { x: number } }) => {
      if (info.offset.x < -50) handleNext();
      if (info.offset.x > 50) handlePrev();
    },
    [handleNext, handlePrev],
  );

  if (totalPosts === 0) {
    return null;
  }

  return (
    <section id="blogs" className="py-20">
      <Container>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Featured</p>
            <h2 className="text-2xl font-bold">Blogs</h2>
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(totalPosts).padStart(2, '0')}
          </p>
        </div>

        <div
          ref={frameRef}
          className="relative mx-auto h-[280px] w-full max-w-[616px] overflow-hidden rounded-3xl border border-border bg-card/30 p-6 md:h-[320px] md:max-w-[776px]"
        >
          <button
            type="button"
            onClick={handlePrev}
            disabled={atStart}
            aria-label="Previous blog"
            className={`absolute left-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors duration-150 hover:bg-muted ${atStart ? 'pointer-events-none opacity-0' : ''}`}
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={atEnd}
            aria-label="Next blog"
            className={`absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors duration-150 hover:bg-muted ${atEnd ? 'pointer-events-none opacity-0' : ''}`}
          >
            <ChevronRight />
          </button>

          <motion.div
            style={{ x }}
            className="flex h-full flex-row gap-6"
            onPanEnd={handlePanEnd}
          >
            {safePosts.map((post, index) => {
              const { frontmatter, slug } = post;
              const tag = frontmatter.tags?.[0] ?? frontmatter.tag ?? 'Blog';
              const number = String(index + 1).padStart(2, '0');
              const distance = Math.abs(index - currentIndex);
              const isActive = distance === 0;
              const isAdjacent = distance === 1;
              const stateClass = isActive
                ? 'scale-100 opacity-100'
                : isAdjacent
                  ? 'scale-95 opacity-50'
                  : 'scale-90 opacity-0';

              if (isActive) {
                return (
                  <Link
                    key={slug}
                    href={`/blog/${slug}`}
                    className={`block h-full w-[260px] shrink-0 transition-all duration-500 ease-in-out sm:w-[340px] ${stateClass}`}
                  >
                    <article className="relative flex h-full flex-col rounded-2xl border border-foreground/20 bg-card p-7 ring-1 ring-border">
                      <span className="absolute right-4 top-3 select-none text-7xl font-bold text-muted-foreground/10">
                        {number}
                      </span>

                      <span className="w-fit rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                        {tag}
                      </span>

                      <h3 className="mt-2 line-clamp-2 text-base font-semibold">
                        {frontmatter.title}
                      </h3>

                      <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                        {frontmatter.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                          <span>{formatDate(frontmatter.date)}</span>
                          {frontmatter.readTime && (
                            <>
                              <span>•</span>
                              <span>{frontmatter.readTime}</span>
                            </>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium">
                          Read
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              }

              return (
                <div
                  key={slug}
                  className={`pointer-events-none h-full w-[260px] shrink-0 transition-all duration-500 ease-in-out sm:w-[340px] ${stateClass}`}
                >
                  <article className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                    <span className="absolute right-4 top-3 select-none text-7xl font-bold text-muted-foreground/10">
                      {number}
                    </span>

                    <span className="w-fit rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                      {tag}
                    </span>

                    <h3 className="mt-2 line-clamp-2 text-base font-semibold">
                      {frontmatter.title}
                    </h3>
                  </article>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          {safePosts.map((post, index) => {
            const active = index === currentIndex;
            return (
              <button
                key={post.slug}
                type="button"
                aria-label={`Go to blog ${index + 1}`}
                onClick={() => goToIndex(index)}
                className={`transition-all duration-300 ${
                  active
                    ? 'h-2 w-4 rounded-full bg-foreground'
                    : 'h-2 w-2 rounded-full bg-muted-foreground/30'
                }`}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
