'use client';

import { animate, motion, useMotionValue } from 'motion/react';
import { Link } from 'next-view-transitions';
import { useState } from 'react';

import type { BlogPostPreview } from '@/types/blog';

const CARD_WIDTH = 320;
const GAP = 24;
const STEP = CARD_WIDTH + GAP;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

export default function BlogSlider({ posts }: { posts: BlogPostPreview[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);

  if (posts.length === 0) return null;

  const atStart = currentIndex === 0;
  const atEnd = currentIndex >= posts.length - 1;

  function handlePrev() {
    if (atStart) return;
    const next = currentIndex - 1;
    setCurrentIndex(next);
    animate(x, Math.min(0, x.get() + STEP), {
      type: 'spring',
      stiffness: 300,
      damping: 35,
      mass: 0.8,
    });
  }

  function handleNext() {
    if (atEnd) return;
    const next = currentIndex + 1;
    setCurrentIndex(next);
    animate(x, Math.max(-(posts.length - 1) * STEP, x.get() - STEP), {
      type: 'spring',
      stiffness: 300,
      damping: 35,
      mass: 0.8,
    });
  }

  function getCardClasses(index: number): string {
    const distance = Math.abs(index - currentIndex);
    if (distance === 0) return 'scale-100 opacity-100';
    if (distance === 1) return 'scale-95 opacity-50';
    return 'scale-90 opacity-30';
  }

  return (
    <section id="blogs" className="py-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Featured</p>
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">Blogs</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={atStart}
            aria-label="Previous"
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors duration-150 hover:bg-muted${atStart ? ' pointer-events-none cursor-not-allowed opacity-40' : ''}`}
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={atEnd}
            aria-label="Next"
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors duration-150 hover:bg-muted${atEnd ? ' pointer-events-none cursor-not-allowed opacity-40' : ''}`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="relative h-70 overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex h-full flex-row gap-6"
          onPanEnd={(_, info) => {
            if (info.offset.x < -50) handleNext();
            else if (info.offset.x > 50) handlePrev();
          }}
        >
          {posts.map((post, index) => {
            const { frontmatter, slug } = post;
            const tag = frontmatter.tags?.[0] ?? frontmatter.tag ?? 'Blog';
            const num = String(index + 1).padStart(2, '0');
            const isActive = index === currentIndex;
            const cardClasses = getCardClasses(index);

            if (isActive) {
              return (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className={`block h-full w-[320px] shrink-0 transition-all duration-500 ease-in-out ${cardClasses}`}
                >
                  <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-foreground/20 bg-card p-8 ring-1 ring-border">
                    <span className="pointer-events-none absolute right-4 top-2 select-none text-7xl font-bold leading-none text-muted-foreground/10">
                      {num}
                    </span>
                    <div className="relative z-10 flex flex-col gap-2">
                      <span className="w-fit rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                        {tag}
                      </span>
                      <h3 className="line-clamp-2 text-base font-semibold leading-snug">
                        {frontmatter.title}
                      </h3>
                      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {frontmatter.description}
                      </p>
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>{formatDate(frontmatter.date)}</span>
                        {frontmatter.readTime && (
                          <>
                            <span>·</span>
                            <span>{frontmatter.readTime}</span>
                          </>
                        )}
                      </div>
                      <span className="shrink-0 text-xs font-medium text-foreground/70">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            }

            return (
              <div
                key={slug}
                className={`pointer-events-none h-full w-[320px] shrink-0 transition-all duration-500 ease-in-out ${cardClasses}`}
              >
                <div className="relative flex h-full w-full flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card p-5">
                  <span className="pointer-events-none absolute right-4 top-2 select-none text-7xl font-bold leading-none text-muted-foreground/10">
                    {num}
                  </span>
                  <div className="relative z-10 flex flex-col gap-2">
                    <span className="w-fit rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                      {tag}
                    </span>
                    <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
                      {frontmatter.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {!atStart && (
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-background to-transparent" />
        )}
        {!atEnd && (
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-linear-to-l from-background to-transparent" />
        )}
      </div>
    </section>
  );
}
