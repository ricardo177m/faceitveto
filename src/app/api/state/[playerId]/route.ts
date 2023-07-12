import { NextResponse } from "next/server";

import { fetchPlayerStateApi } from "@/lib/player";

interface StateParams {
  params: {
    playerId: string;
  };
}

export async function GET(_: Request, { params: { playerId } }: StateParams) {
  try {
    const data = await fetchPlayerStateApi(playerId);
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
