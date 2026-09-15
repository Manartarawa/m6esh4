import { redirect } from "next/navigation";
import { appConfig } from "@/config/app";
import { getSession } from "@/lib/auth/session";
import { parseForm, projectSchema } from "@/lib/validation";
import { projectService } from "@/services/project.service";

async function createProjectAction(formData: FormData) {
  "use server";
  const session = await getSession();
  if (!session) redirect("/sign-in");
  const parsed = parseForm(projectSchema, {
    title: formData.get("title"),
    summary: formData.get("summary"),
    brief: formData.get("brief"),
    category: formData.get("category"),
    budgetMin: formData.get("budgetMin") || undefined,
    budgetMax: formData.get("budgetMax") || undefined,
  });
  if (!parsed.success) return;
  projectService.create({
    ...parsed.data,
    ownerId: session.user.id,
    ownerName: "You",
    skills: [],
  });
  redirect("/dashboard/projects");
}

export default function NewProjectPage() {
  return (
    <form action={createProjectAction} className="card grid max-w-2xl gap-4 p-6">
      <h1 className="text-3xl font-semibold">New project</h1>
      <input className="input" name="title" placeholder="Project title" required />
      <textarea className="input min-h-24" name="summary" placeholder="Short summary" required />
      <textarea className="input min-h-40" name="brief" placeholder="Full brief" required />
      <select className="input" name="category" defaultValue={appConfig.categories[0]}>
        {appConfig.categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
      <div className="grid gap-3 md:grid-cols-2">
        <input className="input" name="budgetMin" type="number" placeholder="Budget min" />
        <input className="input" name="budgetMax" type="number" placeholder="Budget max" />
      </div>
      <button className="btn btn-primary" type="submit">
        Publish brief
      </button>
    </form>
  );
}
