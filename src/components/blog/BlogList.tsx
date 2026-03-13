import { BlogPostPreview } from '@/types/blog';

import { BlogCard } from './BlogCard';

interface BlogListProps {
  posts: BlogPostPreview[];
  className?: string;
}

export function BlogList({ posts, className = '' }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center space-y-4 text-center sm:min-h-[400px]">
        <h2 className="text-2xl font-semibold">No blog posts found</h2>
        <p className="text-muted-foreground">
          Check back later for new content!
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 ${className}`}>
      {posts.map((post, index) => (
        <BlogCard
          key={post.slug}
          post={post}
          index={index}
        />
      ))}
    </div>
  );
}
