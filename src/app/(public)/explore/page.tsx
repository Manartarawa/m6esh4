import { Marketplace } from "@/features/marketplace/marketplace";
import { creatorService } from "@/services/creator.service";
import { projectService } from "@/services/project.service";
import { behanceService } from "@/services/behance.service";

export default function ExplorePage() {
  return (
    <div className="grid gap-6">
      <div>
        <p className="badge">Marketplace</p>
        <h1 className="mt-3 text-3xl font-semibold">Explore MESH</h1>
        <p className="mt-2 text-muted">Creators and open briefs in one place.</p>
      </div>
      <Marketplace
        kind="explore"
        creators={creatorService.list()}
        projects={projectService.list()}
        portfolioItems={behanceService.listSyncedProjects()}
      />
    </div>
  );
}
