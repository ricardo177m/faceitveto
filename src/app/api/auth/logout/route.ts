import { NextResponse } from "next/server";

import { config } from "@/config/config";

export async function GET(request: Request) {
  const response = new NextResponse(null, { status: 200 });
  const host = request.headers.get("host");
  if (!host) return NextResponse.json({ error: "🧐" }, { status: 400 });
  response.cookies.set({
    name: config.cookies.token,
    value: "",
    path: "/",
    maxAge: -1,
    sameSite: "lax",
    secure: true,
    httpOnly: true,
    domain: host.includes("localhost") ? undefined : `.${host}`,
  });
  return response;
}
