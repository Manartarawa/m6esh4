import { syncBehancePortfolioAction } from "@/app/actions/portfolio";
import { EmptyState } from "@/components/ui/states";
import { getSession } from "@/lib/auth/session";
import { creatorService } from "@/services/creator.service";
import { behanceService } from "@/services/behance.service";

export default async function CreatorPortfolioPage() {
  const session = await getSession();
  const creator = session ? creatorService.getByUserId(session.user.id) : null;
  const items = creator?.portfolio.filter((item) => item.isActive !== false) ?? [];
  const connection = session ? behanceService.getConnection(session.user.id) : null;
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Behance sync</p>
          <h1 className="mt-2 text-3xl font-semibold">Portfolio</h1>
          <p className="mt-2 text-muted">Your published Behance projects appear here automatically.</p>
        </div>
        <form action={syncBehancePortfolioAction}>
          <input type="hidden" name="behanceUrl" value={creator?.profile.behanceUrl ?? ""} />
          <button className="btn btn-secondary" type="submit" disabled={!creator?.profile.behanceUrl}>
            Sync Behance
          </button>
        </form>
      </div>
      {connection ? (
        <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="text-sm font-semibold">Behance connected</p>
            <p className="text-sm text-muted">{connection.url}</p>
          </div>
          {connection.lastSyncedAt ? (
            <p className="text-sm text-muted">Last sync {new Date(connection.lastSyncedAt).toLocaleString("en-US")}</p>
          ) : null}
        </div>
      ) : null}
      {items.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="card p-5">
              <div className="mb-4 flex h-36 items-end rounded-2xl bg-surface-muted p-4">
                <span className="badge">{item.source === "BEHANCE" ? "Behance import" : "MESH"}</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                {item.classifications?.[0] ? (
                  <span className="badge">{item.classifications[0].confidence}% match</span>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.classifications?.map((classification) => (
                  <span key={classification.category} className="badge">
                    {classification.category} {classification.confidence}%
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                {item.tags?.map((tag) => <span key={tag}>#{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="Portfolio is empty" body="Add case studies to improve match quality." />
      )}
    </div>
  );
}
