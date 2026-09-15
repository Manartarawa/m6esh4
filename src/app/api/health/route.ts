import { NextResponse } from "next/server";
import { appConfig } from "@/config/app";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: appConfig.name,
    time: new Date().toISOString(),
  });
}
