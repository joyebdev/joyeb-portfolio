import { ProjectsVerticalFeed } from '@/components/landing/MasonryProjects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Joyeb Kothiya',
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-[#0D0D0D]">
      <ProjectsVerticalFeed mode="page" />
    </main>
  );
}
