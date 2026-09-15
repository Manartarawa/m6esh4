import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { demoPassword, users } from "@/lib/data/mock";
import { clearSession, homeForRole, setSession } from "@/lib/auth/session";
import { AppError } from "@/lib/errors";
import type { Role } from "@/types/domain";

const passwordHashes = new Map(users.map((user) => [user.email, hashPassword(demoPassword)]));

export const authService = {
  async signIn(email: string, password: string) {
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    const hash = user ? passwordHashes.get(user.email) : undefined;
    if (!user || !hash || !verifyPassword(password, hash)) {
      throw new AppError("Invalid email or password.", "UNAUTHORIZED", 401);
    }
    await setSession(user.id);
    return { user, redirectTo: homeForRole(user.role) };
  },

  async signUp(input: { name: string; email: string; password: string; role: Exclude<Role, "ADMIN"> }) {
    const exists = users.some((item) => item.email.toLowerCase() === input.email.toLowerCase());
    if (exists) {
      throw new AppError("An account with this email already exists.", "VALIDATION", 400);
    }
    const user = {
      id: `u-${Date.now()}`,
      email: input.email,
      role: input.role,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    passwordHashes.set(user.email, hashPassword(input.password));
    await setSession(user.id);
    return { user, redirectTo: homeForRole(user.role), name: input.name };
  },

  async signOut() {
    await clearSession();
  },
};
