import { NextResponse } from "next/server";

import { faceitConfig } from "@/config/faceit";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nickname = searchParams.get("nickname");

  if (!nickname) return NextResponse.json({ error: "Nickname is required" });

  const response = await fetch(faceitConfig.player(nickname));
  const data = await response.json();
  return NextResponse.json(data);
}
