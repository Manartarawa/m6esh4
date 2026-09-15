import Link from "next/link";
import { formatBudget } from "@/lib/utils";
import type { PortfolioItem, Project } from "@/types/domain";

export function ProjectCard({ project }: { project: Project | PortfolioItem }) {
  const behanceProject = "source" in project && project.source === "BEHANCE" ? project : null;
  const meshProject = "status" in project ? project : null;
  const isBehance = Boolean(behanceProject);
  const summary = "summary" in project ? project.summary : project.description;
  const classifications = "classifications" in project ? project.classifications : undefined;
  const skills = "skills" in project ? project.skills.map((skill) => skill.name) : project.tags ?? [];
  const content = (
    <div className="card block overflow-hidden p-5">
      {"coverUrl" in project && project.coverUrl ? (
        <img src={project.coverUrl} alt="" className="mb-4 h-44 w-full rounded-2xl object-cover" />
      ) : "imageUrl" in project && project.imageUrl ? (
        <img src={project.imageUrl} alt="" className="mb-4 h-44 w-full rounded-2xl object-cover" />
      ) : null}
      <div className="flex flex-wrap gap-2">
        <span className="badge">{project.category}</span>
        {classifications?.[0]?.subcategory ? <span className="badge">{classifications[0].subcategory}</span> : null}
      </div>
      <h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-muted">{summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="badge">
            {skill}
          </span>
        ))}
      </div>
      {isBehance ? <span className="btn btn-secondary mt-4 inline-flex">View project</span> : (
        <p className="mt-4 text-sm text-muted">
          {meshProject ? `${formatBudget(meshProject.budgetMin, meshProject.budgetMax)} · ${meshProject.status}` : null}
        </p>
      )}
    </div>
  );

  return isBehance ? (
    <Link href={behanceProject?.sourceUrl ?? "#"} target="_blank" rel="noreferrer">{content}</Link>
  ) : (
    <Link href={`/project/${project.id}`}>{content}</Link>
  );
}
