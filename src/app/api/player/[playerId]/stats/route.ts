import { NextResponse } from "next/server";

import { fetchPlayerStats, fetchPlayerStatsLastMatches } from "@/lib/player";

interface PlayerStatsParams {
  params: {
    playerId: string;
  };
}

export async function GET(
  _: Request,
  { params: { playerId } }: PlayerStatsParams
) {
  const promises = [
    fetchPlayerStats(playerId),
    fetchPlayerStatsLastMatches(playerId),
  ];

  const result = await Promise.all(promises);

  return NextResponse.json({
    total: result[0],
    mostRecent: result[1],
  });
}
