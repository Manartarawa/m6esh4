import { ProjectCard } from "@/components/ui/project-card";
import { projectService } from "@/services/project.service";

export default function CreatorProjectsPage() {
  const projects = projectService.list().filter((project) => project.status === "OPEN");
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold">Open projects</h1>
      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
