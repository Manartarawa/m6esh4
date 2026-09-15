import { creators, profiles } from "@/lib/data/mock";
import type { Creator, PortfolioItem } from "@/types/domain";
import { userService } from "@/services/user.service";
import { slugify } from "@/lib/utils";

export const creatorService = {
  list(filters?: { category?: string; query?: string }) {
    return creators.filter((creator) => {
      const categoryOk = !filters?.category || creator.category === filters.category;
      const queryOk =
        !filters?.query ||
        `${creator.profile.displayName} ${creator.headline} ${creator.category}`
          .toLowerCase()
          .includes(filters.query.toLowerCase());
      return categoryOk && queryOk;
    });
  },
  getByUsername(username: string) {
    return creators.find((creator) => creator.profile.username === username) ?? null;
  },
  getByUserId(userId: string) {
    return creators.find((creator) => creator.user.id === userId) ?? null;
  },
  featured() {
    return creators.filter((creator) => creator.featured);
  },
  ensure(userId: string, name: string): Creator {
    const existing = this.getByUserId(userId);
    if (existing) return existing;
    const user = userService.getById(userId);
    if (!user) throw new Error("User not found");
    const profile = userService.upsertProfile(userId, {
      displayName: name,
      username: slugify(name) || `creator-${userId.slice(-4)}`,
    });
    const creator: Creator = {
      user,
      profile,
      headline: "Independent creator on MESH",
      availability: "Available",
      experienceYears: 1,
      styleTags: [],
      skills: [],
      portfolio: [],
    };
    creators.push(creator);
    return creator;
  },
  update(
    userId: string,
    input: Partial<Creator> & { displayName?: string; bio?: string; location?: string; behanceUrl?: string },
  ) {
    const creator = this.ensure(userId, input.displayName ?? "Creator");
    if (input.displayName) creator.profile.displayName = input.displayName;
    if (input.bio !== undefined) creator.profile.bio = input.bio;
    if (input.location !== undefined) creator.profile.location = input.location;
    if (input.behanceUrl !== undefined) creator.profile.behanceUrl = input.behanceUrl;
    if (input.headline !== undefined) creator.headline = input.headline;
    if (input.hourlyRate !== undefined) creator.hourlyRate = input.hourlyRate;
    if (input.availability !== undefined) creator.availability = input.availability;
    const profile = profiles.find((item) => item.userId === userId);
    if (profile) {
      profile.displayName = creator.profile.displayName;
      profile.bio = creator.profile.bio;
      profile.location = creator.profile.location;
      profile.behanceUrl = creator.profile.behanceUrl;
    }
    return creator;
  },
  addPortfolio(userId: string, input: Omit<PortfolioItem, "id" | "creatorId" | "imageUrl">) {
    const creator = this.getByUserId(userId);
    if (!creator) return null;
    const item: PortfolioItem = {
      id: `pf-${Date.now()}`,
      creatorId: userId,
      imageUrl: "",
      ...input,
    };
    creator.portfolio.unshift(item);
    return item;
  },
};
