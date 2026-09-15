"use server";

import { redirect } from "next/navigation";
import { authService } from "@/services/auth.service";
import { creatorService } from "@/services/creator.service";
import { getSession } from "@/lib/auth/session";
import { parseForm, profileSchema, signInSchema, signUpSchema } from "@/lib/validation";
import { toPublicError } from "@/lib/errors";

export async function signInAction(_prev: string, formData: FormData) {
  const parsed = parseForm(signInSchema, {
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return parsed.error;
  try {
    const result = await authService.signIn(parsed.data.email, parsed.data.password);
    redirect(result.redirectTo);
  } catch (error) {
    if (typeof error === "object" && error && "digest" in error) throw error;
    return toPublicError(error).message;
  }
}

export async function signUpAction(_prev: string, formData: FormData) {
  const parsed = parseForm(signUpSchema, {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });
  if (!parsed.success) return parsed.error;
  try {
    const result = await authService.signUp(parsed.data);
    redirect(result.redirectTo);
  } catch (error) {
    if (typeof error === "object" && error && "digest" in error) throw error;
    return toPublicError(error).message;
  }
}

export async function signOutAction() {
  await authService.signOut();
  redirect("/");
}

export async function updateCreatorProfileAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session || session.user.role === "CLIENT") {
    redirect("/sign-in");
  }

  const parsed = parseForm(profileSchema, {
    displayName: formData.get("displayName"),
    bio: formData.get("bio"),
    location: formData.get("location"),
    behanceUrl: formData.get("behanceUrl"),
    headline: formData.get("headline"),
    hourlyRate: formData.get("hourlyRate"),
    availability: formData.get("availability"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error);
  }

  try {
    creatorService.update(session.user.id, parsed.data);
    redirect("/creator/settings");
  } catch (error) {
    if (typeof error === "object" && error && "digest" in error) throw error;
    throw new Error(toPublicError(error).message);
  }
}
