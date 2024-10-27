import { NextResponse } from "next/server";

import { fetchPlayerState } from "@/lib/player";

interface StateParams {
  params: Promise<{
    playerId: string;
  }>;
}

export async function POST(_: Request, props: StateParams) {
  const params = await props.params;
  const { playerId } = params;

  try {
    const data = await fetchPlayerState(playerId);
    return NextResponse.json({ state: data });
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

export const revalidate = 10;
