import { createHmac, timingSafeEqual } from "node:crypto";

const PEPPER = process.env.AUTH_SECRET ?? "mesh-dev-secret-change-me";

export function hashPassword(password: string) {
  return createHmac("sha256", PEPPER).update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string) {
  const next = hashPassword(password);
  const a = Buffer.from(next);
  const b = Buffer.from(hash);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
