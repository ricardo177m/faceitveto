import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { fetchPlayerList } from "@/lib/player";

const maxQueryLength = 100;

const schema = z.array(z.string().uuid());

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const ids = searchParams.getAll("playerid[]").slice(0, maxQueryLength);

  try {
    const validated = schema.parse(ids);
    const search = Array.from(new Set(validated));
    const list = await fetchPlayerList(search);
    if (!list) return NextResponse.json({});
    return NextResponse.json(list);
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
