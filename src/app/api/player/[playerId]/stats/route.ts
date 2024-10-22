import { NextResponse } from "next/server";

import { fetchPlayerStats, fetchPlayerStatsLastMatches } from "@/lib/player";

interface PlayerStatsParams {
  params: Promise<{
    playerId: string;
  }>;
}

export async function GET(_: Request, props: PlayerStatsParams) {
  const params = await props.params;
  const { playerId } = params;

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
