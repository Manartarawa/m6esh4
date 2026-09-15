import { AppError } from "@/lib/errors";
import type { Role } from "@/types/domain";

export const rolePermissions: Record<Role, string[]> = {
  CLIENT: [
    "project:create",
    "project:update-own",
    "project:manage-own",
    "creator:view",
    "message:own",
    "brief:create",
  ],
  CREATOR: [
    "profile:update-own",
    "portfolio:manage-own",
    "application:create",
    "application:manage-own",
    "message:own",
  ],
  ADMIN: [
    "user:manage",
    "project:manage",
    "report:manage",
    "category:manage",
  ],
};

export function requireRole(role: Role | undefined, allowed: Role[]) {
  if (!role) {
    throw new AppError("Sign in required.", "UNAUTHORIZED", 401);
  }
  if (!allowed.includes(role)) {
    throw new AppError("You do not have access to this area.", "FORBIDDEN", 403);
  }
}

export function can(role: Role, permission: string) {
  return rolePermissions[role].includes(permission);
}
