import { ProjectCard } from '@/components/projects/ProjectCard';
import SectionHeading from '@/components/common/SectionHeading';
import { projects } from '@/config/Projects';

export default function MyWorkSection() {
  return (
    <section id="my-work" className="mt-16 md:mt-20">
      <div className="flex flex-col items-center justify-center mt-8">
        <h2 className="text-3xl font-bold text-center whitespace-pre-line">
          My Work{"\n"}Projects
        </h2>
      </div>
      <div className="mx-auto mt-8 w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
