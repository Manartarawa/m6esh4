import { getSession } from "@/lib/auth/session";
import { applicationService } from "@/services/application.service";
import { notificationService } from "@/services/notification.service";

export default async function CreatorDashboardPage() {
  const session = await getSession();
  const apps = session ? applicationService.listByCreator(session.user.id) : [];
  const notes = session ? notificationService.list(session.user.id) : [];

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Creator overview</h1>
        <p className="mt-2 text-muted">Applications, portfolio, and incoming briefs.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="card p-5">
          <p className="text-sm text-muted">Applications</p>
          <p className="mt-2 text-3xl font-semibold">{apps.length}</p>
        </article>
        <article className="card p-5">
          <p className="text-sm text-muted">Notifications</p>
          <p className="mt-2 text-3xl font-semibold">{notes.length}</p>
        </article>
      </div>
    </div>
  );
}
