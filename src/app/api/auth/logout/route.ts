import { NextResponse } from "next/server";

import { config } from "@/config/config";

export async function GET() {
  const response = new NextResponse(null, { status: 200 });
  response.cookies.delete(config.cookies.token);
  return response;
}
