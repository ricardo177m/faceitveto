import { NextResponse } from "next/server";
import { z } from "zod";

import { CuratedPlayer } from "@/types/curated-match";
import { config } from "@/config/config";
import { collection, db } from "@/lib/firebaseAdmin";
import getServerSession from "@/lib/getServerSession";
import {
  chosenMap,
  fetchDemocracy,
  fetchDemoUrl,
  fetchMatch,
  getCore,
} from "@/lib/match";
import { coreMatchesMap } from "@/lib/prematch";

interface MatchParams {
  params: Promise<{
    id: string;
  }>;
}

const schema = z.object({
  faction: z.number().min(1).max(2),
});

export async function POST(req: Request, props: MatchParams) {
  const params = await props.params;
  const { id } = params;

  const session = await getServerSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { allowedUsers } = config.prematch;

  if (!allowedUsers.includes(session.id))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json({ error: "Invalid faction." }, { status: 400 });

  const { faction } = parsed.data;

  try {
    const curatedMatch = await fetchMatch(id);

    const team =
      faction === 1 ? curatedMatch.teams.faction1 : curatedMatch.teams.faction2;

    const core = getCore(team);
    if (!core)
      return NextResponse.json(
        {
          error: "Faction does not have a party with at least 3 players.",
        },
        { status: 400 }
      );

    let map = null;
    if (curatedMatch.mapPicks) map = curatedMatch.mapPicks[0]?.id;
    else {
      const democracy = await fetchDemocracy(id);
      if (democracy) map = chosenMap(democracy);
    }

    if (!map)
      return NextResponse.json({ error: "Map not found." }, { status: 400 });

    const teamstats = await coreMatchesMap(
      core.map((p) => p.id),
      map
    );

    const matchIds = teamstats.matches.map((m) => m.match_id);

    matchIds.forEach(async (matchId) => {
      const docRef = collection.doc(matchId);

      db.runTransaction(async (t) => {
        const doc = await t.get(docRef);
        if (doc.exists) return;

        const demoUrl = await fetchDemoUrl(matchId);
        if (!demoUrl) {
          matchIds.splice(matchIds.indexOf(matchId), 1);
          return;
        }

        const data = {
          demoUrl,
          createdAt: new Date(),
          map,
          processed: false,
        };

        t.create(docRef, data);
      });
    });

    return NextResponse.json({ teamstats, premade: core, map, matchIds });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
    else
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 400 }
      );
  }
}
