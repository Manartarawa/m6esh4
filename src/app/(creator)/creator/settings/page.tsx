import { signOutAction, updateCreatorProfileAction } from "@/app/actions/auth";
import { syncBehancePortfolioAction } from "@/app/actions/portfolio";
import { getSession } from "@/lib/auth/session";
import { creatorService } from "@/services/creator.service";

export default async function CreatorSettingsPage() {
  const session = await getSession();
  if (!session) return null;
  const creator = creatorService.getByUserId(session.user.id);

  return (
    <div className="grid max-w-2xl gap-6">
      <div className="card grid gap-4 p-6">
        <h1 className="text-3xl font-semibold">Creator settings</h1>
        <p className="text-muted">{session.user.email}</p>
      </div>

      <form action={updateCreatorProfileAction} className="card grid gap-4 p-6">
        <h2 className="text-xl font-semibold">Profile details</h2>

        <label className="grid gap-1 text-sm">
          Display name
          <input
            className="input"
            name="displayName"
            defaultValue={creator?.profile.displayName ?? ""}
            required
          />
        </label>

        <label className="grid gap-1 text-sm">
          Headline
          <input
            className="input"
            name="headline"
            defaultValue={creator?.headline ?? ""}
            maxLength={120}
          />
        </label>

        <label className="grid gap-1 text-sm">
          Bio
          <textarea
            className="input min-h-28"
            name="bio"
            defaultValue={creator?.profile.bio ?? ""}
            maxLength={500}
          />
        </label>

        <label className="grid gap-1 text-sm">
          Location
          <input className="input" name="location" defaultValue={creator?.profile.location ?? ""} />
        </label>

        <label className="grid gap-1 text-sm">
          Behance profile URL
          <input
            className="input"
            name="behanceUrl"
            type="url"
            placeholder="https://www.behance.net/yourname"
            defaultValue={creator?.profile.behanceUrl ?? ""}
          />
        </label>

        <label className="grid gap-1 text-sm">
          Hourly rate (USD)
          <input
            className="input"
            name="hourlyRate"
            type="number"
            min="1"
            defaultValue={creator?.hourlyRate ?? ""}
          />
        </label>

        <label className="grid gap-1 text-sm">
          Availability
          <input className="input" name="availability" defaultValue={creator?.availability ?? ""} />
        </label>

        <button className="btn btn-primary" type="submit">
          Save profile
        </button>
      </form>

      <form action={syncBehancePortfolioAction} className="card grid gap-4 p-6">
        <div>
          <h2 className="text-xl font-semibold">Behance Portfolio Sync</h2>
          <p className="mt-1 text-sm text-muted">
            Connect Behance and let MESH import your published projects into your MESH portfolio.
          </p>
        </div>
        <label className="grid gap-1 text-sm">
          Behance profile URL
          <input
            className="input"
            name="behanceUrl"
            type="url"
            placeholder="https://www.behance.net/yourname"
            defaultValue={creator?.profile.behanceUrl ?? ""}
            required
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn btn-primary" type="submit">
            Sync Behance projects
          </button>
          <span className="text-sm text-muted">Titles, covers, descriptions and original project links</span>
        </div>
      </form>

      <form action={signOutAction} className="card p-6">
        <button className="btn btn-secondary" type="submit">
          Sign out
        </button>
      </form>
    </div>
  );
}
