import { userService } from "@/services/user.service";
import { projectService } from "@/services/project.service";

export default function AdminHomePage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold">Admin</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="card p-5">
          <p className="text-sm text-muted">Users</p>
          <p className="mt-2 text-3xl font-semibold">{userService.list().length}</p>
        </article>
        <article className="card p-5">
          <p className="text-sm text-muted">Projects</p>
          <p className="mt-2 text-3xl font-semibold">{projectService.list().length}</p>
        </article>
        <article className="card p-5">
          <p className="text-sm text-muted">Reports</p>
          <p className="mt-2 text-3xl font-semibold">1</p>
        </article>
      </div>
    </div>
  );
}
