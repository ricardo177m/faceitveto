import { NextResponse } from "next/server";

import { fetchPlayerStats } from "@/lib/player";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerId = searchParams.get("playerId");

  if (!playerId)
    return NextResponse.json(
      { error: "playerId is required" },
      { status: 400 }
    );

  const playerStats = await fetchPlayerStats(playerId);
  return NextResponse.json(playerStats);
}
