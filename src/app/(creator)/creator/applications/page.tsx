import { getSession } from "@/lib/auth/session";
import { applicationService } from "@/services/application.service";
import { EmptyState } from "@/components/ui/states";

export default async function CreatorApplicationsPage() {
  const session = await getSession();
  const apps = session ? applicationService.listByCreator(session.user.id) : [];
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold">Applications</h1>
      {apps.length ? (
        <div className="grid gap-4">
          {apps.map((item) => (
            <article key={item.id} className="card p-5">
              <p className="badge">{item.status}</p>
              <h2 className="mt-2 text-xl font-semibold">{item.projectTitle}</h2>
              <p className="mt-2 text-sm text-muted">{item.coverNote}</p>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No applications" body="Apply to an open project to see it here." />
      )}
    </div>
  );
}
