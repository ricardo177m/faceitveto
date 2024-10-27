import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { fetchPlayerDetailedMatches, fetchPlayerMatches } from "@/lib/player";

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

    // TODO: choose player with less matches to reduce the amount of requests
    // n - 1
    const matchesDetails = await fetchPlayerDetailedMatches(validated[0]);
    const matchesStats = await fetchPlayerMatches(validated[0]);

    const filteredMatches = matchesDetails.filter((match) => {
      const faction1 = match.teams.faction1.players;
      const faction2 = match.teams.faction2.players;

      const faction1Ids = faction1.map((player) => player.player_id);
      const faction2Ids = faction2.map((player) => player.player_id);

      const isValid = validated.every(
        (id) => faction1Ids.includes(id) || faction2Ids.includes(id)
      );

      if (isValid) {
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
      }

      return isValid;
    });

    return NextResponse.json({
      stats: {
        total: filteredMatches.length,
        wins: filteredMatches.filter((match) => match.stats.isWin).length,
      },
      matches: filteredMatches,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
