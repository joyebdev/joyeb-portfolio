import Container from '@/components/common/Container';
import About from '@/components/landing/About';
import Blog from '@/components/landing/Blog';
import Contact from '@/components/landing/Contact';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import MasonryProjects from '@/components/landing/MasonryProjects';
import { getPublishedBlogPosts } from '@/lib/blog';
import React from 'react';

export default function page() {
  const posts = getPublishedBlogPosts();

  return (
    <Container className="min-h-screen py-10 sm:py-12 md:py-16">
      <Hero />
      <MasonryProjects />
      <About />
      <Github />
      <Blog posts={posts} />
      <Contact />
    </Container>
  );
}
