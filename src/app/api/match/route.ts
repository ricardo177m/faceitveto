import { NextResponse } from "next/server";

import { fetchMatch } from "@/lib/match";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get("matchId");

  if (!matchId)
    return NextResponse.json({ error: "matchId is required" }, { status: 400 });

  try {
    const curatedMatch = await fetchMatch(matchId);
    return NextResponse.json(curatedMatch);
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
