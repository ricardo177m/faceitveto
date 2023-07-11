import { NextResponse } from "next/server";

import { config } from "@/config/config";

export async function GET(request: Request) {
  const response = new NextResponse(null, { status: 302 });
  response.cookies.delete(config.cookies.token);
  const redirectUrl = request.url.match(/redirect=([^&]*)/);
  response.headers.set(
    "Location",
    !!redirectUrl ? decodeURIComponent(redirectUrl[1]) : "/"
  );
  return response;
}
