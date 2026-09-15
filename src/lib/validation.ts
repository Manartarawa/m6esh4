import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(72),
  role: z.enum(["CLIENT", "CREATOR"]),
});

export const projectSchema = z.object({
  title: z.string().min(4).max(120),
  summary: z.string().min(20).max(280),
  brief: z.string().min(40),
  category: z.string().min(2),
  budgetMin: z.coerce.number().int().nonnegative().optional(),
  budgetMax: z.coerce.number().int().nonnegative().optional(),
});

export const applicationSchema = z.object({
  projectId: z.string().min(1),
  coverNote: z.string().min(20).max(1000),
  bidAmount: z.coerce.number().int().positive().optional(),
});

export const messageSchema = z.object({
  conversationId: z.string().min(1),
  body: z.string().min(1).max(4000),
});

export const reviewSchema = z.object({
  projectId: z.string().min(1),
  subjectId: z.string().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(8).max(800),
});

export const profileSchema = z.object({
  displayName: z.string().min(2).max(80),
  bio: z.string().max(500).optional(),
  location: z.string().max(80).optional(),
  behanceUrl: z
    .union([z.string().trim().url(), z.literal("")])
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  headline: z.string().max(120).optional(),
  hourlyRate: z.coerce.number().int().positive().optional(),
  availability: z.string().max(80).optional(),
});

export const portfolioSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().max(400).optional(),
  category: z.string().min(2),
});

export const applicationStatusSchema = z.object({
  applicationId: z.string().min(1),
  status: z.enum(["PENDING", "SHORTLISTED", "ACCEPTED", "DECLINED"]),
});

export function parseForm<T>(schema: z.ZodType<T>, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      success: false as const,
      error: result.error.issues[0]?.message ?? "Invalid input",
    };
  }
  return { success: true as const, data: result.data };
}
