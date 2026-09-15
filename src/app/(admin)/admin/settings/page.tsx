import { appConfig } from "@/config/app";
import { syncBehanceAdminAction } from "@/app/actions/portfolio";
import { behanceService } from "@/services/behance.service";
import { creatorService } from "@/services/creator.service";
import { getSession } from "@/lib/auth/session";
import { requireRole } from "@/lib/auth/roles";

export default async function AdminSettingsPage({ searchParams }: { searchParams: Promise<{ sync?: string }> }) {
  const session = await getSession();
  requireRole(session?.user.role, ["ADMIN"]);
  const params = await searchParams;
  const creator = creatorService.list().find((item) => item.profile.behanceUrl);
  const syncStatus = creator ? behanceService.getSyncStatus(creator.user.id) : null;
  return (
    <div className="grid max-w-xl gap-6">
      <div className="card grid gap-4 p-6">
        <h1 className="text-3xl font-semibold">Platform settings</h1>
        <p>App: {appConfig.name}</p>
        <p className="text-sm text-muted">Payments: {appConfig.features.payments ? "on" : "off"}</p>
        <p className="text-sm text-muted">Live AI: {appConfig.features.liveAi ? "on" : "off"}</p>
        <div className="flex flex-wrap gap-2">
          {appConfig.categories.map((category) => <span key={category} className="badge">{category}</span>)}
        </div>
      </div>
      <div className="card grid gap-4 p-6">
        <div>
          <h2 className="text-xl font-semibold">Behance sync</h2>
          <p className="mt-1 text-sm text-muted">Sync the configured creator account without exposing API credentials.</p>
        </div>
        <p className="text-sm text-muted">Account: {creator?.profile.behanceUrl ?? "Not configured"}</p>
        {syncStatus?.lastSyncedAt ? <p className="text-sm text-muted">Last synced: {new Date(syncStatus.lastSyncedAt).toLocaleString("en-US")}</p> : null}
        {syncStatus?.error ? <p className="text-sm text-danger">Last sync failed: {syncStatus.error}</p> : null}
        {params.sync === "success" ? <p className="text-sm text-success">Behance sync completed.</p> : null}
        {params.sync === "error" ? <p className="text-sm text-danger">Behance sync failed. Existing projects were kept.</p> : null}
        <form action={syncBehanceAdminAction}>
          <button className="btn btn-primary" type="submit" disabled={!creator?.profile.behanceUrl}>Sync Behance Now</button>
        </form>
      </div>
    </div>
  );
}
