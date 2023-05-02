import { NextResponse } from "next/server";

import { faceitConfig } from "@/config/faceit";

interface NicknameParams {
  params: {
    nickname: string;
  };
}

export async function GET(
  request: Request,
  { params: { nickname } }: NicknameParams
) {
  try {
    const response = await fetch(faceitConfig.player(nickname));
    const data = await response.json();

    if (data.errors) throw new Error(data.errors[0].message);

    return NextResponse.json(data.payload);
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
