"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { behanceService } from "@/services/behance.service";
import { creatorService } from "@/services/creator.service";
import { getSession } from "@/lib/auth/session";
import { normalizeBehanceUrl } from "@/lib/utils";
import { requireRole } from "@/lib/auth/roles";

export async function syncBehancePortfolioAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.user.role === "CLIENT") redirect("/sign-in");

  const creator = creatorService.getByUserId(session.user.id);
  if (!creator) redirect("/creator/settings");

  const inputUrl = String(formData.get("behanceUrl") ?? creator.profile.behanceUrl ?? "").trim();
  if (!inputUrl) throw new Error("Add a Behance profile URL before syncing.");

  creatorService.update(session.user.id, { behanceUrl: normalizeBehanceUrl(inputUrl) });
  await behanceService.sync(session.user.id, inputUrl);
  revalidatePath("/creator/portfolio");
  revalidatePath(`/creator/${creator.profile.username}`);
  revalidatePath("/creator/settings");
  redirect("/creator/portfolio");
}

export async function syncBehanceAdminAction() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  requireRole(session.user.role, ["ADMIN"]);

  try {
    await behanceService.syncConfiguredAccount();
  } catch {
    redirect("/admin/settings?sync=error");
  }
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?sync=success");
}

export async function updateBehancePresentationAction(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  requireRole(session.user.role, ["ADMIN"]);

  const projectId = String(formData.get("projectId") ?? "");
  const operation = String(formData.get("operation") ?? "");
  const currentOrder = Number(formData.get("featuredOrder") ?? 0);
  const project = behanceService.updateProjectPresentation(projectId, {
    ...(operation === "feature" ? { isFeatured: true } : {}),
    ...(operation === "unfeature" ? { isFeatured: false } : {}),
    ...(operation === "hide" ? { isVisible: false } : {}),
    ...(operation === "show" ? { isVisible: true } : {}),
    ...(operation === "order" ? { featuredOrder: Number.isFinite(currentOrder) ? currentOrder : 0 } : {}),
  });
  if (!project) throw new Error("Behance project not found");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}
