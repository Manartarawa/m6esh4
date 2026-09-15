import { aiProvider } from "@/lib/ai/provider";

export const aiService = {
  generateBrief: aiProvider.generateBrief.bind(aiProvider),
  analyzeBrief: aiProvider.analyzeBrief.bind(aiProvider),
  suggestSkills: aiProvider.suggestSkills.bind(aiProvider),
  calculateRecommendations: aiProvider.calculateRecommendations.bind(aiProvider),
  classifyPortfolio: aiProvider.classifyPortfolio.bind(aiProvider),
};
