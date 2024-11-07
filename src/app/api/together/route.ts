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

  if (ids.length !== 2)
    return NextResponse.json(
      { error: "You must provide 2 ids" },
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

    const matchesTeammate: DetailedMatch[] = [];
    const matchesOpponent: DetailedMatch[] = [];

    matchesDetails.forEach((match) => {
      if (!match) return false;
      count++;
      const faction1 = match.teams.faction1.players;
      const faction2 = match.teams.faction2.players;

      const faction1Ids = faction1.map((player) => player.player_id);
      const faction2Ids = faction2.map((player) => player.player_id);

      const areTeammatesFaction1 = validated.every((id) =>
        faction1Ids.includes(id)
      );
      const areTeammatesFaction2 = validated.every((id) =>
        faction2Ids.includes(id)
      );

      const asTeammates = areTeammatesFaction1 || areTeammatesFaction2;

      const asOpponents =
        (faction1Ids.includes(validated[0]) &&
          faction2Ids.includes(validated[1])) ||
        (faction1Ids.includes(validated[1]) &&
          faction2Ids.includes(validated[0]));

      if (!asTeammates && !asOpponents) return false;

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

      if (asTeammates) matchesTeammate.push(match);
      else if (asOpponents) matchesOpponent.push(match);
    });

    const asTeammates = {
      stats: {
        total: matchesTeammate.length,
        wins: matchesTeammate.filter((match) => match.stats.isWin).length,
      },
      matches: matchesTeammate
        .sort((a, b) => b.finished_at - a.finished_at)
        .slice(0, 10), // TODO
    };

    const asOpponents = {
      stats: {
        total: matchesOpponent.length,
        wins: matchesOpponent.filter((match) => match.stats.isWin).length,
      },
      matches: matchesOpponent
        .sort((a, b) => b.finished_at - a.finished_at)
        .slice(0, 10), // TODO
    };

    return NextResponse.json({
      asTeammates,
      asOpponents,
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
