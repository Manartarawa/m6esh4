import { matchingService } from "@/services/matching.service";
import { projectService } from "@/services/project.service";
import { EmptyState } from "@/components/ui/states";
import Link from "next/link";

export default function MatchPage() {
  const project = projectService.getById("pr-aurora");
  const matches = project ? matchingService.forProject(project.id) : [];

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Creative Match</h1>
        <p className="mt-2 text-muted">
          Scores creators against skills, category, style, budget, availability, experience, and portfolio relevance.
        </p>
      </div>
      {matches.length ? (
        <div className="grid gap-4">
          {matches.map((match) => (
            <Link key={match.creatorId} href={`/creator/${match.username}`} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{match.creatorName}</h2>
                  <p className="text-sm text-muted">{match.category}</p>
                  <p className="mt-2 text-sm text-muted">{match.reasons.join(" · ")}</p>
                </div>
                <p className="text-3xl font-semibold">{match.score}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState title="No matches" body="Create a project to generate recommendations." />
      )}
    </div>
  );
}
