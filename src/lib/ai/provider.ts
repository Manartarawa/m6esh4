export interface BriefDraft {
  title: string;
  category: string;
  goals: string;
  audience: string;
  constraints: string;
}

export interface BriefAnalysis {
  summary: string;
  missing: string[];
  suggestedSkills: string[];
  recommendedBudget: string;
}

export interface PortfolioClassificationInput {
  title: string;
  description?: string;
  tags?: string[];
}

export interface PortfolioClassification {
  category: string;
  confidence: number;
  subcategory?: string;
}

export const portfolioCategories = [
  "Branding",
  "Graphic Design",
  "Web Design",
  "UI/UX",
  "3D",
  "Motion Graphics",
  "Illustration",
  "Photography",
  "Advertising",
  "Packaging",
  "Other",
] as const;

export interface AiProvider {
  generateBrief(input: BriefDraft): Promise<string>;
  analyzeBrief(brief: string): Promise<BriefAnalysis>;
  suggestSkills(brief: string): Promise<string[]>;
  calculateRecommendations(brief: string): Promise<string[]>;
  classifyPortfolio(input: PortfolioClassificationInput): Promise<PortfolioClassification[]>;
}

class MockAiProvider implements AiProvider {
  async generateBrief(input: BriefDraft) {
    return [
      `Project: ${input.title}`,
      `Category: ${input.category}`,
      `Goals: ${input.goals}`,
      `Audience: ${input.audience}`,
      `Constraints: ${input.constraints}`,
      "",
      "Deliverables should include a primary identity direction, a supporting system, and a launch-ready asset list.",
    ].join("\n");
  }

  async analyzeBrief(brief: string) {
    const missing = [];
    if (!brief.toLowerCase().includes("timeline")) missing.push("Timeline");
    if (!brief.toLowerCase().includes("budget")) missing.push("Budget range");
    return {
      summary: brief.slice(0, 160),
      missing,
      suggestedSkills: await this.suggestSkills(brief),
      recommendedBudget: "$4,000 – $8,000",
    };
  }

  async suggestSkills(brief: string) {
    const haystack = brief.toLowerCase();
    const skills = [];
    if (haystack.includes("brand") || haystack.includes("identity")) skills.push("Brand Identity");
    if (haystack.includes("pack")) skills.push("Packaging");
    if (haystack.includes("ui") || haystack.includes("app") || haystack.includes("web")) skills.push("UI/UX");
    if (haystack.includes("motion")) skills.push("Motion Design");
    return skills.length ? skills : ["Brand Identity", "UI/UX"];
  }

  async calculateRecommendations(brief: string) {
    const skills = await this.suggestSkills(brief);
    return skills.map((skill) => `Prioritize creators with proven ${skill} work.`);
  }

  async classifyPortfolio(input: PortfolioClassificationInput) {
    const haystack = `${input.title} ${input.description ?? ""} ${(input.tags ?? []).join(" ")}`.toLowerCase();
    if (/\b3d\b|render|cgi/.test(haystack)) {
      return [{ category: "3D", confidence: 98, subcategory: /product|perfume|advert/.test(haystack) ? "Product Visualization" : "3D Modeling" }];
    }
    if (/\bbrand(?:ing)?\b|\bidentity\b|\blogo\b|\bvisual identity\b/.test(haystack)) {
      return [{ category: "Branding", confidence: 96, subcategory: "Brand Identity" }];
    }
    if (/packag\w*|product label/.test(haystack)) {
      return [{ category: "Packaging", confidence: 93, subcategory: "Product Packaging" }];
    }
    if (/\bweb\b|landing|website|frontend|development/.test(haystack)) {
      return [{ category: "Web Design", confidence: 91, subcategory: /\bui\b|\bux\b|interface|app/.test(haystack) ? "UI/UX" : "Web Design" }];
    }
    if (/\bui\b|\bux\b|\bapp\b|\binterface\b|\bdashboard\b|product design/.test(haystack)) {
      return [{ category: "UI/UX", confidence: 94, subcategory: "Product Interface" }];
    }
    if (/motion|animation|reel|video/.test(haystack)) {
      return [{ category: "Motion Graphics", confidence: 92, subcategory: "Animation" }];
    }
    if (/illustrat|drawing|artwork/.test(haystack)) {
      return [{ category: "Illustration", confidence: 89, subcategory: "Editorial Illustration" }];
    }
    if (/photograph|portrait|photo\b/.test(haystack)) {
      return [{ category: "Photography", confidence: 90, subcategory: "Photography" }];
    }
    if (/advertis\w*|\bcampaign\b|commercial|social/.test(haystack)) {
      return [{ category: "Advertising", confidence: 86, subcategory: "Campaign" }];
    }
    if (/graphic|poster|print|typograph/.test(haystack)) {
      return [{ category: "Graphic Design", confidence: 82, subcategory: "Graphic Design" }];
    }
    return [{ category: "Other", confidence: 45, subcategory: "Unclassified" }];
  }
}

export const aiProvider: AiProvider = new MockAiProvider();
