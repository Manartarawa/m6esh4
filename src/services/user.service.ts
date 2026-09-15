import { profiles, users } from "@/lib/data/mock";
import { slugify } from "@/lib/utils";
import type { Profile, Role } from "@/types/domain";

export const userService = {
  list() {
    return users.map((user) => ({
      ...user,
      profile: profiles.find((item) => item.userId === user.id) ?? null,
    }));
  },
  getById(id: string) {
    return users.find((user) => user.id === id) ?? null;
  },
  getProfile(userId: string) {
    return profiles.find((item) => item.userId === userId) ?? null;
  },
  displayName(userId: string) {
    return profiles.find((item) => item.userId === userId)?.displayName ?? "MESH member";
  },
  listByRole(role: Role) {
    return users.filter((user) => user.role === role);
  },
  upsertProfile(userId: string, input: Partial<Profile> & { displayName: string }) {
    const existing = profiles.find((item) => item.userId === userId);
    if (existing) {
      existing.displayName = input.displayName;
      existing.bio = input.bio ?? existing.bio;
      existing.location = input.location ?? existing.location;
      existing.behanceUrl = input.behanceUrl ?? existing.behanceUrl;
      if (input.username) existing.username = input.username;
      return existing;
    }
    const profile: Profile = {
      id: `p-${Date.now()}`,
      userId,
      displayName: input.displayName,
      username: input.username ?? slugify(input.displayName),
      bio: input.bio,
      location: input.location,
      behanceUrl: input.behanceUrl,
    };
    profiles.push(profile);
    return profile;
  },
};
