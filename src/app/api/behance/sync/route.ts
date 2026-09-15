import { NextResponse } from "next/server";
import { behanceService } from "@/services/behance.service";
import { getSession } from "@/lib/auth/session";
import { requireRole } from "@/lib/auth/roles";

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const suppliedSecret = request.headers.get("x-cron-secret");
  const isCronRequest = Boolean(cronSecret && suppliedSecret && suppliedSecret === cronSecret);

  if (!isCronRequest) {
    const session = await getSession();
    try {
      requireRole(session?.user.role, ["ADMIN"]);
    } catch {
      return NextResponse.json({ error: "Admin access required" }, { status: 401 });
    }
  }

  try {
    const items = await behanceService.syncConfiguredAccount();
    return NextResponse.json({ ok: true, synced: items.length, status: "success" });
  } catch (error) {
    return NextResponse.json(
      { ok: false, status: "error", error: error instanceof Error ? error.message : "Sync failed" },
      { status: 502 },
    );
  }
}