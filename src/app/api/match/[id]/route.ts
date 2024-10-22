import { NextResponse } from "next/server";

import { fetchMatch } from "@/lib/match";

interface MatchParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_: Request, props: MatchParams) {
  const params = await props.params;
  const { id } = params;

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
