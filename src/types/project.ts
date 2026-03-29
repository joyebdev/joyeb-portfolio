import type { ReactNode } from 'react';

export interface Project {
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  features: string[];
  techStack: string[];
  challenges?: string;
  solutions?: string;
  image: string;
  video?: string;
  link: string;
  technologies: { name: string; icon: ReactNode }[];
  github?: string;
  live: string;
  theme?: 'green' | 'blue' | 'purple' | 'orange' | 'neutral';
}

export interface ProjectCaseStudyFrontmatter {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  timeline: string;
  role: string;
  team?: string;
  status: 'completed' | 'in-progress' | 'archived';
  featured: boolean;
  challenges?: string[];
  learnings?: string[];
  isPublished: boolean;
}

export interface ProjectCaseStudy {
  slug: string;
  frontmatter: ProjectCaseStudyFrontmatter;
  content: string;
}

export interface ProjectCaseStudyPreview {
  slug: string;
  frontmatter: ProjectCaseStudyFrontmatter;
}
