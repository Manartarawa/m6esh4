import { userService } from "@/services/user.service";

export default function AdminUsersPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold">Users</h1>
      <div className="grid gap-3">
        {userService.list().map((user) => (
          <article key={user.id} className="card flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{user.email}</p>
              <p className="text-sm text-muted">{user.role}</p>
            </div>
            <span className="badge">{user.id}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
