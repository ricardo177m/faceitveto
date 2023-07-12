import { NextResponse } from "next/server";

import { fetchMatch } from "@/lib/match";

interface MatchParams {
  params: {
    id: string;
  };
}

export async function GET(_: Request, { params: { id } }: MatchParams) {
  try {
    const curatedMatch = await fetchMatch(id);
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
