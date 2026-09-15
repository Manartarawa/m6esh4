import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { projectService } from "@/services/project.service";
import { ProjectCard } from "@/components/ui/project-card";
import { EmptyState } from "@/components/ui/states";

export default async function ClientProjectsPage() {
  const session = await getSession();
  const projects = session ? projectService.listByOwner(session.user.id) : [];

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Your projects</h1>
        <Link href="/dashboard/projects/new" className="btn btn-primary">
          New project
        </Link>
      </div>
      {projects.length ? (
        <div className="grid gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState title="No projects yet" body="Create a brief to start matching with creators." />
      )}
    </div>
  );
}
