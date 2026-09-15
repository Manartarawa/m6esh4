import { creators } from "@/lib/data/mock";
import type { MatchScore, Project } from "@/types/domain";

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function scoreCreatorForProject(project: Project, creatorId: string): MatchScore | null {
  const creator = creators.find((item) => item.user.id === creatorId);
  if (!creator) return null;

  const skillOverlap = creator.skills.filter((skill) =>
    project.skills.some((item) => item.slug === skill.slug),
  ).length;
  const skills = clamp((skillOverlap / Math.max(project.skills.length, 1)) * 100);
  const category = creator.category === project.category ? 100 : 45;
  const style = creator.styleTags.length ? 78 : 40;
  const budget =
    creator.hourlyRate && project.budgetMax
      ? clamp(100 - Math.abs(creator.hourlyRate * 40 - project.budgetMax) / 80)
      : 60;
  const availability = creator.availability?.toLowerCase().includes("available") ? 90 : 55;
  const experience = clamp((creator.experienceYears ?? 0) * 9);
  const portfolio = clamp(creator.portfolio.filter((item) => item.category === project.category).length * 40 + 30);
  const score = clamp(
    skills * 0.25 +
      category * 0.2 +
      style * 0.1 +
      budget * 0.1 +
      availability * 0.1 +
      experience * 0.1 +
      portfolio * 0.15,
  );

  return {
    creatorId: creator.user.id,
    creatorName: creator.profile.displayName,
    username: creator.profile.username,
    category: creator.category ?? project.category,
    score,
    reasons: [
      skills > 70 ? "Strong skill overlap" : "Partial skill overlap",
      category === 100 ? "Exact category match" : "Adjacent category",
      availability > 80 ? "Currently available" : "Limited availability",
    ],
    factors: { skills, category, style, budget, availability, experience, portfolio },
  };
}

export function rankCreators(project: Project): MatchScore[] {
  return creators
    .map((creator) => scoreCreatorForProject(project, creator.user.id))
    .filter((item): item is MatchScore => Boolean(item))
    .sort((a, b) => b.score - a.score);
}
