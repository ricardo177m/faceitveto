import { faceitConfig } from "@/config/faceit";
import toBase64 from "@/services/toBase64";

export async function getOauthEndpoints(): Promise<FaceitOpenIdCfg> {
  const openIdCfg = await fetch(faceitConfig.openidConfig);
  return openIdCfg.json();
}

export async function getAccessToken(
  endpoint: string,
  code: string,
  verifier: string
): Promise<FaceitToken> {
  const clientId = process.env.NEXT_PUBLIC_FACEIT_CLIENT_ID;
  const clientSecret = process.env.FACEIT_CLIENT_SECRET;
  const credentials = toBase64(`${clientId}:${clientSecret}`);

  const url = `${endpoint}?grant_type=authorization_code&code=${code}&code_verifier=${verifier}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to get access token");
  return res.json();
}

export async function getUserInfo(
  endpoint: string,
  token: string
): Promise<FaceitUserInfo> {
  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to get user info");
  return res.json();
}
