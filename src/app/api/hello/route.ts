import { NextResponse } from "next/server";

import { faceitConfig } from "@/config/faceit";

export async function GET() {
  const response = await fetch(faceitConfig.player("s1mple"));
  const data = await response.json();
  return NextResponse.json(data);
}
