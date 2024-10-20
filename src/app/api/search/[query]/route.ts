import { NextResponse } from "next/server";

import { fetchPlayerSearch } from "@/lib/search";

interface RouteParams {
  params: {
    query: string;
  };
}

const minQueryLength = 2;

export async function GET(_: Request, { params: { query } }: RouteParams) {
  try {
    if (query.length < minQueryLength)
      throw new Error(
        `Query must be at least ${minQueryLength} characters long`
      );
    const data = await fetchPlayerSearch(query);
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
