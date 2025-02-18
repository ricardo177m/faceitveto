import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { fetchPlayerList } from "@/lib/player";
import { fetchPlayerByGameIdOpen } from "@/lib/search";
import { resolveVanityUrl } from "@/lib/steam";
import { isUInteger } from "@/utils/math";

const maxQueryLength = 20;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.getAll("query[]").slice(0, maxQueryLength);

  try {
    const steamids: string[] = [];
    const vanityurls: string[] = [];

    query.forEach((q) => {
      if (isUInteger(q) && q.length === 17) return steamids.push(q);

      if (q.includes("steamcommunity.com/profiles/")) {
        const id = q.replace(/\/$/, "").split("/").pop();
        if (!id || !isUInteger(id) || id.length !== 17) return;
        return steamids.push(id);
      }

      if (q.includes("steamcommunity.com/id/")) {
        const vanity = q.replace(/\/$/, "").split("/").pop();
        if (!vanity) return;
        return vanityurls.push(vanity);
      }

      vanityurls.push(q);
    });

    const promisesResolveVanity = Array.from(new Set(vanityurls)).map(
      async (q) => await resolveVanityUrl(q)
    );
    const resolveVanities = await Promise.all(promisesResolveVanity);
    resolveVanities.filter((d) => d !== null).forEach((d) => steamids.push(d));

    // remove duplicates
    const search = Array.from(new Set(steamids));
    if (!search.length) return NextResponse.json([]);

    const promises = search.map((s) => fetchPlayerByGameIdOpen(s));
    const results = await Promise.all(promises);
    const searchres = results.filter((r) => r !== null);

    const ids = searchres.map((p) => p.player_id);

    if (!ids.length) return NextResponse.json([]);

    const data = await fetchPlayerList(ids);
    return NextResponse.json(
      Object.values(data).sort((a, b) => a.nickname.localeCompare(b.nickname))
    );
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
