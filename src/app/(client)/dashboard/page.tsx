import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { notificationService } from "@/services/notification.service";
import { projectService } from "@/services/project.service";

export default async function ClientDashboardPage() {
  const session = await getSession();
  const projects = session ? projectService.listByOwner(session.user.id) : [];
  const notes = session ? notificationService.list(session.user.id) : [];

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Client overview</h1>
        <p className="mt-2 text-muted">Briefs, matches, and conversations in one place.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="card p-5">
          <p className="text-sm text-muted">Projects</p>
          <p className="mt-2 text-3xl font-semibold">{projects.length}</p>
        </article>
        <article className="card p-5">
          <p className="text-sm text-muted">Notifications</p>
          <p className="mt-2 text-3xl font-semibold">{notes.length}</p>
        </article>
        <article className="card p-5">
          <p className="text-sm text-muted">Next step</p>
          <Link href="/dashboard/projects/new" className="mt-3 inline-flex btn btn-primary">
            New project
          </Link>
        </article>
      </div>
    </div>
  );
}
