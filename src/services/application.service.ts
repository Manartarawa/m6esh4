import { applications } from "@/lib/data/mock";
import type { Application } from "@/types/domain";

export const applicationService = {
  listByCreator(creatorId: string) {
    return applications.filter((item) => item.creatorId === creatorId);
  },
  listByProject(projectId: string) {
    return applications.filter((item) => item.projectId === projectId);
  },
  apply(input: Omit<Application, "id" | "createdAt" | "status">) {
    const application: Application = {
      ...input,
      id: `ap-${Date.now()}`,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };
    applications.unshift(application);
    return application;
  },
};
