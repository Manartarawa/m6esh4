import { NextResponse } from "next/server";
import { behanceService } from "@/services/behance.service";

export async function GET(request: Request) {
  const username = new URL(request.url).searchParams.get("username");
  if (!username) return NextResponse.json({ error: "username is required" }, { status: 400 });

  try {
    const projects = await behanceService.fetchProjects(`https://www.behance.net/${username}`);
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to fetch Behance projects" },
      { status: 502 },
    );
  }
}