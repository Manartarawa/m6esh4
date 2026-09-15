import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ui/project-card";
import { EmptyState } from "@/components/ui/states";
import { applicationService } from "@/services/application.service";
import { matchingService } from "@/services/matching.service";
import { projectService } from "@/services/project.service";
import { formatBudget } from "@/lib/utils";
import Link from "next/link";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projectService.getById(id);
  if (!project) notFound();
  const related = projectService.list({ category: project.category }).filter((item) => item.id !== project.id);
  const matches = matchingService.forProject(project.id).slice(0, 3);
  const apps = applicationService.listByProject(project.id);

  return (
    <div className="grid gap-8">
      <section className="card p-6 md:p-8">
        <p className="badge">{project.category}</p>
        <h1 className="mt-3 text-4xl font-semibold">{project.title}</h1>
        <p className="mt-2 text-lg text-muted">{project.summary}</p>
        <p className="mt-4 max-w-3xl whitespace-pre-wrap">{project.brief}</p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted">
          <span>{formatBudget(project.budgetMin, project.budgetMax)}</span>
          <span>{project.status}</span>
          <span>Posted by {project.ownerName}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.skills.map((skill) => (
            <span key={skill.id} className="badge">
              {skill.name}
            </span>
          ))}
        </div>
      </section>
      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Suggested matches</h2>
        {matches.length ? (
          <div className="grid gap-3 md:grid-cols-3">
            {matches.map((match) => (
              <Link key={match.creatorId} href={`/creator/${match.username}`} className="card p-5">
                <p className="text-sm text-muted">{match.category}</p>
                <h3 className="mt-1 font-semibold">{match.creatorName}</h3>
                <p className="mt-2 text-2xl font-semibold">{match.score}%</p>
                <p className="mt-2 text-sm text-muted">{match.reasons[0]}</p>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState title="No matches yet" body="Matching will appear once creators are scored." />
        )}
      </section>
      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Applications</h2>
        {apps.length ? (
          <div className="grid gap-3">
            {apps.map((item) => (
              <article key={item.id} className="card p-5">
                <p className="font-semibold">{item.creatorName}</p>
                <p className="mt-2 text-sm text-muted">{item.coverNote}</p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No applications" body="Creators can apply from their dashboard." />
        )}
      </section>
      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold">Related projects</h2>
        {related.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <ProjectCard key={item.id} project={item} />
            ))}
          </div>
        ) : (
          <EmptyState title="No related projects" body="More briefs in this category will show here." />
        )}
      </section>
    </div>
  );
}
