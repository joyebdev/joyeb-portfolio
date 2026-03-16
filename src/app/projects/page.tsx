import ProjectList from '@/components/projects/ProjectList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Joyeb Kothiya',
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground transition-colors">
      <ProjectList />
    </main>
  );
}
