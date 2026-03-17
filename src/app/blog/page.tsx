import { BlogPageClient } from './BlogPageClient';
import { getAllTags, getPublishedBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Blogs — Joyeb Kothiya',
  description: 'Thoughts, tutorials, and insights on engineering and programming.',
};

export default function BlogPage() {
  const posts = getPublishedBlogPosts();
  const tags = getAllTags();

  return (
    <Suspense fallback={<div>Loading blogs...</div>}>
      <BlogPageClient initialPosts={posts} initialTags={tags} />
    </Suspense>
  );
}
