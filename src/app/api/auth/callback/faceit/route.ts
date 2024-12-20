import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { config } from "@/config/config";
import {
  getAccessToken,
  getOauthEndpoints,
  getUserInfo,
} from "@/lib/faceitOauth";
import { fetchPlayerById } from "@/lib/player";
import { env } from "@/env";

export async function GET(request: Request) {
  const code = request.url.match(/code=([^&]*)/);
  const stateStr = request.url.match(/state=([^&]*)/); // state has verifier (workaround)
  const jwtSecret = env.JWT_SECRET as string;

  if (!code || !stateStr) return new NextResponse(null, { status: 400 });
  if (!jwtSecret) return new NextResponse(null, { status: 500 });

  try {
    const state = JSON.parse(decodeURIComponent(stateStr[1]));

    const endpoints = await getOauthEndpoints();
    const token = await getAccessToken(
      endpoints.token_endpoint,
      code[1],
      state.verifier
    );
    const userinfo = await getUserInfo(
      endpoints.userinfo_endpoint,
      token.access_token
    );

    const detailedUser = await fetchPlayerById(userinfo.guid);
    if (!detailedUser) return new NextResponse(null, { status: 404 });

    const data = {
      id: userinfo.guid,
      nickname: userinfo.nickname,
      avatar: detailedUser.avatar,
      country: detailedUser.country,
      steamid: detailedUser.platforms?.steam?.id64,
    };

    const userToken = jwt.sign(data, jwtSecret, { expiresIn: "180d" });
    const response = new NextResponse(null, { status: 302 });

    const host = request.headers.get("host");
    if (!host) return NextResponse.json({ error: "🧐" }, { status: 400 });

    response.cookies.set({
      name: config.cookies.token,
      value: userToken,
      path: "/",
      maxAge: 60 * 60 * 24 * 180,
      sameSite: "lax",
      secure: true,
      httpOnly: true,
      domain: host.includes("localhost") ? undefined : `.${host}`,
    });

    // redirect
    response.headers.set(
      "Location",
      state.redirectUri ? state.redirectUri : "/"
    );

    return response;
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
