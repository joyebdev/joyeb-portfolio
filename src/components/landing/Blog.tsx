import { getPublishedBlogPosts } from '@/lib/blog';

import BlogSlider from './BlogSlider';

export default function Blog() {
  const posts = getPublishedBlogPosts();
  return <BlogSlider posts={posts} />;
}
