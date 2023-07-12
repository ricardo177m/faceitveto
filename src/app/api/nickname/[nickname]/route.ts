import { NextResponse } from "next/server";

import { fetchPlayerByNicknameApi } from "@/lib/player";

interface NicknameParams {
  params: {
    nickname: string;
  };
}

export async function GET(
  _: Request,
  { params: { nickname } }: NicknameParams
) {
  try {
    const data = await fetchPlayerByNicknameApi(nickname);
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
