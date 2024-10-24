import { NextResponse } from "next/server";

import { fetchPlayerByNickname } from "@/lib/player";

interface NicknameParams {
  params: Promise<{
    nickname: string;
  }>;
}

export async function GET(_: Request, props: NicknameParams) {
  const params = await props.params;
  const { nickname } = params;

  try {
    const data = await fetchPlayerByNickname(nickname);
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
