import { Marketplace } from "@/features/marketplace/marketplace";
import { projectService } from "@/services/project.service";
import { behanceService } from "@/services/behance.service";

export default function ProjectsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="mt-2 text-muted">Open briefs looking for the right creative fit.</p>
      </div>
      <Marketplace kind="projects" projects={projectService.list()} portfolioItems={behanceService.listSyncedProjects()} />
    </div>
  );
}
