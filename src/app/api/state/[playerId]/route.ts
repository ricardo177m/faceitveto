import { NextResponse } from "next/server";

import { faceitConfig } from "@/config/faceit";

interface StateParams {
  params: {
    playerId: string;
  };
}

interface PartialMatchState {
  payload: {
    [key: string]: {
      id: string;
    }[];
  };
}

export async function GET(
  request: Request,
  { params: { playerId } }: StateParams
) {
  try {
    const url = new URL(faceitConfig.state);
    url.searchParams.append("userId", playerId);

    const response = await fetch(url);
    const data: PartialMatchState = await response.json();

    const match = Object.values(data.payload)[0];

    if (match === undefined)
      return NextResponse.json({
        state: null,
      });

    return NextResponse.json({
      state: match[0].id,
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
