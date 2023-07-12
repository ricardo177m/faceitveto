import { NextResponse } from "next/server";

import { fetchPlayerStatsApi } from "@/lib/player";

interface PlayerStatsParams {
  params: {
    playerId: string;
  };
}

export async function GET(
  _: Request,
  { params: { playerId } }: PlayerStatsParams
) {
  const playerStats = await fetchPlayerStatsApi(playerId);
  return NextResponse.json(playerStats);
}
