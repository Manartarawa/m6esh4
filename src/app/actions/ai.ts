"use server";

import { aiService } from "@/services/ai.service";

export async function generateBriefAction(formData: FormData) {
  return aiService.generateBrief({
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? ""),
    goals: String(formData.get("goals") ?? ""),
    audience: String(formData.get("audience") ?? ""),
    constraints: String(formData.get("constraints") ?? ""),
  });
}

export async function analyzeBriefAction(brief: string) {
  const analysis = await aiService.analyzeBrief(brief);
  const recs = await aiService.calculateRecommendations(brief);
  return JSON.stringify({ ...analysis, recs }, null, 2);
}
