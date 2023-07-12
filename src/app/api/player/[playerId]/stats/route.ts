import { NextResponse } from "next/server";

import { fetchPlayerStats } from "@/lib/player";

interface PlayerStatsParams {
  params: {
    playerId: string;
  };
}

export async function GET(
  _: Request,
  { params: { playerId } }: PlayerStatsParams
) {
  const playerStats = await fetchPlayerStats(playerId);
  return NextResponse.json(playerStats);
}
