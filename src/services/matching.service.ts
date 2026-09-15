import { rankCreators, scoreCreatorForProject } from "@/lib/matching/engine";
import { projectService } from "@/services/project.service";

export const matchingService = {
  forProject(projectId: string) {
    const project = projectService.getById(projectId);
    if (!project) return [];
    return rankCreators(project);
  },
  score(projectId: string, creatorId: string) {
    const project = projectService.getById(projectId);
    if (!project) return null;
    return scoreCreatorForProject(project, creatorId);
  },
};
