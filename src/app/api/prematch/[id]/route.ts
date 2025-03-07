import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import { z } from "zod";

import getServerSession from "@/lib/getServerSession";
import {
  chosenMap,
  fetchDemocracy,
  fetchDemoUrl,
  fetchMatch,
  getCore,
  mockFetchDemoUrl,
} from "@/lib/match";
import { coreMatchesMap } from "@/lib/prematch";
import { env } from "@/env";

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

  const { allowedUsers, restricted } = (await get(
    "prematch"
  )) as EdgePrematchCfg;

  const session = await getServerSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (restricted && !allowedUsers.includes(session.id)) {
    return NextResponse.json(
      {
        error:
          "Sorry, this feature is currently restricted to a small set of players.",
      },
      { status: 403 }
    );
  }

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

    let map: CuratedMap | null = null;
    if (curatedMatch.mapPicks) map = curatedMatch.mapPicks[0];
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

    for (const matchId of matchIds) {
      const res = await fetch(
        env.NEXT_PUBLIC_PARSER_URL + "/matches/" + matchId,
        { headers: { Authorization: `Bearer ${env.PARSER_API_KEY}` } }
      );

      if (res.status === 404) {
        const demoUrl =
          env.NODE_ENV === "development"
            ? await mockFetchDemoUrl(matchId)
            : await fetchDemoUrl(matchId);

        if (!demoUrl) {
          const data = {
            map: map.name,
            processed: false,
            rounds: [],
            progress: "Error",
            error:
              "Demo not available (might have expired or not uploaded yet)",
            metrics: null,
            createdAt: new Date().toISOString(),
            requestedBy: session.id,
          } as MatchMeta;

          await fetch(`${env.NEXT_PUBLIC_PARSER_URL}/meta/${matchId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${env.PARSER_API_KEY}`,
            },
            body: JSON.stringify(data),
          });

          matchIds.splice(matchIds.indexOf(matchId), 1);
          return;
        }

        const enqueueReq = { map, matchId, demoUrl, requestedBy: session.id };
        await fetch(`${env.NEXT_PUBLIC_PARSER_URL}/enqueue`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.PARSER_API_KEY}`,
          },
          body: JSON.stringify(enqueueReq),
        });
      }
    }

    return NextResponse.json({
      teamstats,
      premade: core,
      map,
      matchIds,
    });
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
