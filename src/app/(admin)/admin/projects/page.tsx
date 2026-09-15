import { ProjectCard } from "@/components/ui/project-card";
import { projectService } from "@/services/project.service";
import { behanceService } from "@/services/behance.service";
import { updateBehancePresentationAction } from "@/app/actions/portfolio";

export default function AdminProjectsPage() {
  const behanceProjects = behanceService.listManageableProjects();
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold">All projects</h1>
      <div className="grid gap-4">
        {projectService.list().map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <section className="grid gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Behance projects</h2>
          <p className="mt-1 text-sm text-muted">Feature, hide, or order imported work for the homepage.</p>
        </div>
        {behanceProjects.map((project) => (
          <article key={project.id} className="card grid gap-3 p-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm text-muted">{project.category}</p>
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-muted">{project.isFeatured ? `Featured #${project.featuredOrder ?? 0}` : "Explore"} · {project.isVisible === false ? "Hidden" : "Visible"}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <form action={updateBehancePresentationAction}>
                <input type="hidden" name="projectId" value={project.id} />
                <input type="hidden" name="operation" value={project.isFeatured ? "unfeature" : "feature"} />
                <button className="btn btn-secondary" type="submit">{project.isFeatured ? "Remove featured" : "Make featured"}</button>
              </form>
              <form action={updateBehancePresentationAction}>
                <input type="hidden" name="projectId" value={project.id} />
                <input type="hidden" name="operation" value={project.isVisible === false ? "show" : "hide"} />
                <button className="btn btn-secondary" type="submit">{project.isVisible === false ? "Show" : "Hide"}</button>
              </form>
              {project.isFeatured ? (
                <form action={updateBehancePresentationAction} className="flex gap-2">
                  <input type="hidden" name="projectId" value={project.id} />
                  <input type="hidden" name="operation" value="order" />
                  <input className="input w-20" name="featuredOrder" type="number" min="0" defaultValue={project.featuredOrder ?? 0} aria-label={`Featured order for ${project.title}`} />
                  <button className="btn btn-secondary" type="submit">Set order</button>
                </form>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
