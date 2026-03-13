import { getPublishedBlogPosts } from '@/lib/blog';
import { Link } from 'next-view-transitions';

import { BlogCard } from '../blog/BlogCard';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Button } from '../ui/button';

export default function Blog() {
  const posts = getPublishedBlogPosts();

  return (
    <section id="blogs">
      <Container className="mt-16 md:mt-20">
        <SectionHeading subHeading="Featured" heading="Blogs" />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              index={index}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="w-full sm:w-auto">
            <Link href="/#blogs">Show all blogs</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
