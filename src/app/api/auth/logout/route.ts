import { NextResponse } from "next/server";

import { config } from "@/config/config";

export async function GET() {
  const response = new NextResponse(null, { status: 302 });
  response.cookies.delete(config.cookies.token);
  response.headers.set("Location", "/");
  return response;
}
