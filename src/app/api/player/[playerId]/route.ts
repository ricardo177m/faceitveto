import { NextResponse } from "next/server";

import { fetchPlayerById, fetchPlayerByNickname } from "@/lib/player";

interface NicknameParams {
  params: Promise<{
    playerId: string;
  }>;
}

export async function GET(_: Request, props: NicknameParams) {
  const params = await props.params;
  const { playerId } = params;

  try {
    const data = await fetchPlayerById(playerId);
    return NextResponse.json(data);
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
