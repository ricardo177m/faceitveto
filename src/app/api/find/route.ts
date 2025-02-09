import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { fetchPlayerList } from "@/lib/player";
import { fetchPlayerSearch } from "@/lib/search";
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

    const searchres = await fetchPlayerSearch(
      search.join(" "),
      maxQueryLength * 2
    );
    const ids = searchres.payload
      .filter((p) => p.games.find((g) => g.name === "cs2"))
      .map((p) => p.id);

    if (!ids.length) return NextResponse.json([]);

    const data = await fetchPlayerList(ids);
    return NextResponse.json(Object.values(data));
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
