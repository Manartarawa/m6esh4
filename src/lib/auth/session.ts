import { cookies } from "next/headers";
import { users } from "@/lib/data/mock";
import type { Role, User } from "@/types/domain";

const COOKIE = "mesh_session";

export interface Session {
  user: User;
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const raw = store.get(COOKIE)?.value;
  if (!raw) return null;
  const user = users.find((item) => item.id === raw);
  return user ? { user } : null;
}

export async function setSession(userId: string) {
  const store = await cookies();
  store.set(COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  return session;
}

export function homeForRole(role: Role) {
  if (role === "ADMIN") return "/admin";
  if (role === "CREATOR") return "/creator/dashboard";
  return "/dashboard";
}
