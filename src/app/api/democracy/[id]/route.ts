import { NextResponse } from "next/server";

import { fetchDemocracy } from "@/lib/match";

interface MatchParams {
  params: Promise<{
    id: string;
  }>;
}
export const dynamic = "force-dynamic";

export async function GET(_: Request, props: MatchParams) {
  const params = await props.params;
  const { id } = params;

  try {
    const data = await fetchDemocracy(id);
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
