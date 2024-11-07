import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  fetchPlayerDetailedMatches,
  fetchPlayerMatches,
  fetchPlayerStats,
} from "@/lib/player";

const schema = z.array(z.string().uuid());

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const ids = searchParams.getAll("playerid[]");

  if (ids.length < 2)
    return NextResponse.json(
      { error: "You must provide at least 2 ids" },
      { status: 400 }
    );

  try {
    const validated = schema.parse(ids);

    const playerPromises = validated.map((id) => fetchPlayerStats(id));
    const players = await Promise.all(playerPromises);

    // find player with less matches
    const player = players.reduce((acc, curr) => {
      if (curr.overall.matches < acc.overall.matches) return curr;
      return acc;
    });

    const playerId = player.playerId;
    const matches = player.overall.matches;

    const matchesDetailsPromises: Promise<DetailedMatch[]>[] = [];
    const matchesStatsPromises: Promise<PlayerMatchStats[]>[] = [];

    Array.from({ length: Math.ceil(matches / 100) }, (_, i) => {
      matchesDetailsPromises.push(fetchPlayerDetailedMatches(playerId, 100, i));
      matchesStatsPromises.push(fetchPlayerMatches(playerId, 100, i));
    });

    const matchesDetails = (await Promise.all(matchesDetailsPromises)).flat();
    const matchesStats = (await Promise.all(matchesStatsPromises)).flat();

    let count = 0;

    const filteredMatches = matchesDetails.filter((match) => {
      if (!match) return false;
      count++;
      const faction1 = match.teams.faction1.players;
      const faction2 = match.teams.faction2.players;

      const faction1Ids = faction1.map((player) => player.player_id);
      const faction2Ids = faction2.map((player) => player.player_id);

      const isValidFaction1 = validated.every((id) => faction1Ids.includes(id));
      const isValidFaction2 = validated.every((id) => faction2Ids.includes(id));

      if (!isValidFaction1 && !isValidFaction2) return false;

      const stats = matchesStats.find(
        (stats) => stats.matchId === match.match_id
      );
      if (!stats) return false;

      match.stats = {
        isWin: stats.i10 === "1",
        map: stats.i1,
        score: stats.i18,
        roundsWon: stats.c5,
      };

      return true;
    });

    return NextResponse.json({
      stats: {
        total: filteredMatches.length,
        wins: filteredMatches.filter((match) => match.stats.isWin).length,
      },
      matches: filteredMatches
        .sort((a, b) => b.finished_at - a.finished_at)
        .slice(0, 10), // TODO
      matchesCount: count,
    });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: error.errors }, { status: 400 });
    console.log(error);
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    else
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
  }
}
