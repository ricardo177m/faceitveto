import { NextResponse } from "next/server";

import { fetchPlayerSearchOpen } from "@/lib/search";

interface RouteParams {
  params: Promise<{
    query: string;
  }>;
}

const minQueryLength = 2;

export async function GET(_: Request, props: RouteParams) {
  const params = await props.params;
  const { query } = params;

  try {
    if (query.length < minQueryLength)
      throw new Error(
        `Query must be at least ${minQueryLength} characters long`
      );
    const data = await fetchPlayerSearchOpen(query);
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
