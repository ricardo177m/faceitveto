import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { DetailedMatch } from "@/types/detailed-match";
import { Teammate, TeammatesData } from "@/types/teammates";
import {
  fetchPlayerDetailedMatches,
  fetchPlayerList,
  fetchPlayerStats,
} from "@/lib/player";

interface TeammatesParams {
  params: Promise<{
    playerId: string;
  }>;
}

const schema = z.string().uuid();

export async function GET(req: NextRequest, props: TeammatesParams) {
  const params = await props.params;
  const { playerId } = params;

  try {
    const validated = schema.parse(playerId);

    const playerStats = await fetchPlayerStats(validated);
    const totalMatches = playerStats.overall.matches;

    const promises: Promise<DetailedMatch[]>[] = [];

    Array.from({ length: Math.ceil(totalMatches / 100) }, (_, i) => {
      promises.push(fetchPlayerDetailedMatches(playerId, 100, i));
    });

    const matches = (await Promise.all(promises)).flat();
    const teammatesData = {
      teammates: {} as {
        [key: string]: Teammate;
      },
      enemies: {} as {
        [key: string]: Teammate;
      },
    };

    matches.forEach((m) => {
      if (!m) return;
      const faction1 = m.teams.faction1.players;
      const faction2 = m.teams.faction2.players;

      const faction1Ids = faction1.map((player) => player.player_id);
      const faction2Ids = faction2.map((player) => player.player_id);

      const isFaction1 = faction1Ids.some((p) => p === validated);
      const teammates = isFaction1 ? faction1Ids : faction2Ids;
      const enemies = isFaction1 ? faction2Ids : faction1Ids;

      const isWin = m.results.winner === "faction1" ? isFaction1 : !isFaction1;

      teammates.forEach((t) => {
        if (t === validated) return;
        if (!(t in teammatesData.teammates))
          teammatesData.teammates[t] = {
            matches: 1,
            wins: 0,
            playerId: t,
          };
        else teammatesData.teammates[t].matches++;
        if (isWin) teammatesData.teammates[t].wins++;
      });

      enemies.forEach((e) => {
        if (!(e in teammatesData.enemies))
          teammatesData.enemies[e] = {
            matches: 1,
            wins: 0,
            playerId: e,
          };
        else teammatesData.enemies[e].matches++;
        if (!isWin) teammatesData.enemies[e].wins++;
      });
    });

    const teammatesArray = Object.entries(teammatesData.teammates)
      .map(([, value]) => {
        return { ...value };
      })
      .filter((e) => e.matches > 1)
      .sort((a, b) => b.matches - a.matches);

    const enemiesArray = Object.entries(teammatesData.enemies)
      .map(([, value]) => {
        return { ...value };
      })
      .filter((e) => e.matches > 1)
      .sort((a, b) => b.matches - a.matches);

    return NextResponse.json({
      teammates: teammatesArray,
      enemies: enemiesArray,
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
