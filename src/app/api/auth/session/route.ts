import { NextResponse } from "next/server";

import getServerSession from "@/lib/getServerSession";

export async function GET() {
  const session = getServerSession();
  if (!session) return new NextResponse(null, { status: 401 });
  return NextResponse.json(session, { status: 200 });
}
