import { reviews } from "@/lib/data/mock";

export const reviewService = {
  listForSubject(subjectId: string) {
    return reviews.filter((item) => item.subjectId === subjectId);
  },
  listForProject(projectId: string) {
    return reviews.filter((item) => item.projectId === projectId);
  },
};
