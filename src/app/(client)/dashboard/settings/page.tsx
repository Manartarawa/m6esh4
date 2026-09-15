import { signOutAction } from "@/app/actions/auth";
import { getSession } from "@/lib/auth/session";

export default async function ClientSettingsPage() {
  const session = await getSession();
  return (
    <div className="card grid max-w-xl gap-4 p-6">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <p className="text-muted">{session?.user.email}</p>
      <p className="text-sm text-muted">Role: {session?.user.role}</p>
      <form action={signOutAction}>
        <button className="btn btn-secondary" type="submit">
          Sign out
        </button>
      </form>
    </div>
  );
}
