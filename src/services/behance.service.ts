import { createHash } from "node:crypto";
import { aiService } from "@/services/ai.service";
import { creatorService } from "@/services/creator.service";
import type { PortfolioItem } from "@/types/domain";
import { normalizeBehanceUrl } from "@/lib/utils";

interface BehanceProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  sourceUrl: string;
  publishedAt?: string;
}

export interface BehanceSyncStatus {
  url: string;
  lastSyncedAt?: string;
  status: "idle" | "running" | "success" | "error";
  error?: string;
  added: number;
  updated: number;
  inactive: number;
}

const connections = new Map<string, BehanceSyncStatus>();

function decode(value: string) {
  return value
    .replace(/\\u002F/g, "/")
    .replace(/\\\//g, "/")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
}

function titleFromSlug(slug: string) {
  return decodeURIComponent(slug)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function parseBehanceProjects(html: string, profileUrl: string): BehanceProject[] {
  const projects = new Map<string, BehanceProject>();
  const projectPattern = /behance\.net\\?\/gallery\\?\/(\d+)\\?\/([^"'\\\s<]+)/g;

  for (const match of html.matchAll(projectPattern)) {
    const id = match[1];
    const slug = match[2];
    if (!id || !slug || projects.has(id)) continue;
    const sourceUrl = `https://www.behance.net/gallery/${id}/${decode(slug)}`;
    const offset = match.index ?? 0;
    const context = html.slice(Math.max(0, offset - 6000), offset + 6000);
    const imageContext = context.replace(/\\\//g, "/");
    const imageUrl = [...imageContext.matchAll(/https?:\/\/[^"'\\\s]+/gi)]
      .map((image) => decode(image[0] ?? ""))
      .find((url) => /\.(?:jpg|jpeg|png|webp)(?:\?|$)/i.test(url));
    const descriptionMatch = context.match(/(?:description|seoDescription|projectDescription)["']?\s*[:=]\s*["']([^"']{20,300})/i);
    const dateMatch = context.match(/(?:datePublished|publishedAt|createdAt)["']?\s*[:=]\s*["']([^"']+)/i);
    projects.set(id, {
      id,
      title: titleFromSlug(slug),
      description: descriptionMatch?.[1] ? decode(descriptionMatch[1]) : "Behance project imported into MESH.",
      tags: [],
      imageUrl: imageUrl ?? "",
      sourceUrl,
      ...(dateMatch?.[1] ? { publishedAt: dateMatch[1] } : {}),
    });
  }

  if (!projects.size) {
    throw new Error(`No public Behance projects found at ${profileUrl}`);
  }
  return [...projects.values()];
}

async function fetchBehanceProjects(behanceUrl: string) {
  const response = await fetch(normalizeBehanceUrl(behanceUrl), {
    headers: { "User-Agent": "MESH portfolio sync/1.0" },
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
  if (response.status === 429) throw new Error("Behance rate limit reached. Try again later.");
  if (!response.ok) throw new Error(`Behance returned HTTP ${response.status}`);
  return parseBehanceProjects(await response.text(), behanceUrl);
}

export const behanceService = {
  async fetchProjects(behanceUrl: string) {
    return fetchBehanceProjects(behanceUrl);
  },

  listSyncedProjects() {
    return creatorService.list().flatMap((creator) =>
      creator.portfolio.filter((item) => item.source === "BEHANCE" && item.isActive !== false && item.isVisible !== false),
    );
  },

  listManageableProjects() {
    return creatorService.list().flatMap((creator) =>
      creator.portfolio.filter((item) => item.source === "BEHANCE" && item.isActive !== false),
    );
  },

  getConnection(userId: string) {
    return connections.get(userId) ?? null;
  },

  getSyncStatus(userId: string) {
    return connections.get(userId) ?? null;
  },

  listFeaturedProjects() {
    return this.listSyncedProjects()
      .filter((item) => item.isFeatured)
      .sort((left, right) => (left.featuredOrder ?? 0) - (right.featuredOrder ?? 0));
  },

  updateProjectPresentation(projectId: string, input: { isFeatured?: boolean; isVisible?: boolean; featuredOrder?: number }) {
    for (const creator of creatorService.list()) {
      const project = creator.portfolio.find(
        (item) => item.source === "BEHANCE" && (item.id === projectId || item.sourceProjectId === projectId),
      );
      if (project) {
        Object.assign(project, input);
        return project;
      }
    }
    return null;
  },

  async syncConfiguredAccount() {
    const creator = creatorService.list().find((item) => item.profile.behanceUrl);
    if (!creator?.profile.behanceUrl) throw new Error("No Behance account is configured.");
    return this.sync(creator.user.id, creator.profile.behanceUrl);
  },

  async sync(userId: string, behanceUrl: string) {
    const creator = creatorService.getByUserId(userId);
    if (!creator) throw new Error("Creator profile not found");

    const normalizedUrl = normalizeBehanceUrl(behanceUrl);
    const running: BehanceSyncStatus = {
      ...(connections.get(userId) ?? { added: 0, updated: 0, inactive: 0 }),
      url: normalizedUrl,
      status: "running",
      error: undefined,
    };
    connections.set(userId, running);

    try {
      const syncedAt = new Date().toISOString();
      const projects = await fetchBehanceProjects(normalizedUrl);
      const seenIds = new Set(projects.map((project) => project.id));
      let added = 0;
      let updated = 0;
      const importedItems: PortfolioItem[] = await Promise.all(
        projects.map(async (project) => {
        const classificationFingerprint = createHash("sha256")
          .update(JSON.stringify({ title: project.title, description: project.description, tags: project.tags, imageUrl: project.imageUrl }))
          .digest("hex");
        const previous = creator.portfolio.find(
          (item) => item.source === "BEHANCE" && item.sourceProjectId === project.id,
        );
        const classifications =
          previous?.classificationFingerprint === classificationFingerprint && previous.classifications?.length
            ? previous.classifications
            : await aiService.classifyPortfolio({
                title: project.title,
                description: project.description,
                tags: project.tags,
              });
        const primary = classifications[0] ?? { category: "Other", confidence: 45, subcategory: "Unclassified" };
        if (previous) updated += 1;
        else added += 1;
        return {
          id: project.id,
          creatorId: userId,
          title: project.title,
          description: project.description,
          imageUrl: project.imageUrl,
          category: primary.category,
          source: "BEHANCE",
          sourceProjectId: project.id,
          sourceUrl: project.sourceUrl,
          tags: project.tags,
          classifications,
          syncedAt,
          updatedAt: syncedAt,
          isActive: true,
          isVisible: previous?.isVisible ?? true,
          isFeatured: previous?.isFeatured ?? false,
          featuredOrder: previous?.featuredOrder ?? 0,
          classificationFingerprint,
          classifiedAt: previous?.classificationFingerprint === classificationFingerprint ? previous.classifiedAt : syncedAt,
          ...(project.publishedAt ? { publishedAt: project.publishedAt } : {}),
        } as PortfolioItem;
        }),
      );
      let inactive = 0;
      const existingNonBehance = creator.portfolio.filter((item) => item.source !== "BEHANCE");
      const previouslySynced = creator.portfolio
        .filter((item) => item.source === "BEHANCE")
        .map((item) => {
          if (item.sourceProjectId && !seenIds.has(item.sourceProjectId)) {
            inactive += 1;
            return { ...item, isActive: false, updatedAt: syncedAt };
          }
          return item;
        });
      creator.portfolio = [
        ...existingNonBehance,
        ...previouslySynced.filter((item) => !seenIds.has(item.sourceProjectId ?? "")),
        ...importedItems,
      ];
      connections.set(userId, { url: normalizedUrl, lastSyncedAt: syncedAt, status: "success", added, updated, inactive });
      return importedItems;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Behance sync failed";
      connections.set(userId, { ...running, status: "error", error: message });
      throw new Error(message);
    }
  },
};
