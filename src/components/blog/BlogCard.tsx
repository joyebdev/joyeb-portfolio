import { BlogPostPreview } from '@/types/blog';
import { Link } from 'next-view-transitions';
import { memo } from 'react';

interface BlogCardProps {
  post: BlogPostPreview;
  index: number;
}

type BlogCardMeta = BlogPostPreview['frontmatter'] & {
  tag?: string;
  category?: string;
  readTime?: string;
  readingTime?: string;
  publishedAt?: string;
  excerpt?: string;
};

export const BlogCard = memo(function BlogCard({
  post,
  index,
}: BlogCardProps): React.JSX.Element {
  const meta = post.frontmatter as BlogCardMeta;
  const publishedDate = meta.date || meta.publishedAt;
  const readingTime = meta.readTime || meta.readingTime;
  const label = meta.tag || meta.category || meta.tags?.[0];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex min-h-42.5 flex-col justify-between rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:border-border/60 sm:min-h-50 sm:p-6"
    >
      <div className="flex flex-col gap-3">
        <span className="text-4xl leading-none font-bold text-muted-foreground/20 select-none sm:text-5xl">
          {String(index + 1).padStart(2, '0')}
        </span>

        {label && (
          <span className="self-start text-xs px-2.5 py-0.5 rounded-full border border-border text-muted-foreground bg-muted/50">
            {label}
          </span>
        )}

        <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-foreground/80 transition-colors duration-150 line-clamp-2">
          {meta.title}
        </h3>

        {(meta.description || meta.excerpt) && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {meta.description || meta.excerpt}
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground/70">
          {publishedDate && (
            <span>
              {new Date(publishedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
          {publishedDate && readingTime && (
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
          )}
          {readingTime && <span>{readingTime}</span>}
        </div>

        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground inline-flex items-center gap-1 transition-colors duration-150 sm:self-auto">
          Read
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-x-px group-hover:-translate-y-px transition-transform duration-150"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </span>
      </div>
    </Link>
  );
});

BlogCard.displayName = 'BlogCard';
