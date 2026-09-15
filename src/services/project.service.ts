import { projects } from "@/lib/data/mock";
import { slugify } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types/domain";

export const projectService = {
  list(filters?: { category?: string; query?: string; status?: ProjectStatus }) {
    return projects.filter((project) => {
      const categoryOk = !filters?.category || project.category === filters.category;
      const statusOk = !filters?.status || project.status === filters.status;
      const queryOk =
        !filters?.query ||
        `${project.title} ${project.summary}`.toLowerCase().includes(filters.query.toLowerCase());
      return categoryOk && queryOk && statusOk;
    });
  },
  getById(id: string) {
    return projects.find((project) => project.id === id || project.slug === id) ?? null;
  },
  listByOwner(ownerId: string) {
    return projects.filter((project) => project.ownerId === ownerId);
  },
  create(input: Omit<Project, "id" | "slug" | "createdAt" | "status"> & { status?: ProjectStatus }) {
    const base = slugify(input.title) || "project";
    const slug = projects.some((item) => item.slug === base) ? `${base}-${Date.now()}` : base;
    const project: Project = {
      ...input,
      id: `pr-${Date.now()}`,
      slug,
      status: input.status ?? "OPEN",
      createdAt: new Date().toISOString(),
    };
    projects.unshift(project);
    return project;
  },
  updateStatus(id: string, status: ProjectStatus) {
    const project = this.getById(id);
    if (!project) return null;
    project.status = status;
    return project;
  },
};
