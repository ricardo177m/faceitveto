import { Playtime } from "@/types/player";
import {
  PlayerSummary,
  PlayerSummaryResult,
  RecentPlayedGamesResult,
} from "@/types/steam";
import { steam } from "@/config/endpoints";
import { env } from "@/env.mjs";

export async function playerSummaries(
  query: string[]
): Promise<PlayerSummary[]> {
  const url = new URL(steam.playerSummaries);
  url.searchParams.set("key", env.STEAM_API_KEY);
  url.searchParams.set("steamids", query.join(","));

  const res = await fetch(url, {
    next: { revalidate: 60 * 60 * 3 },
  });

  const data = (await res.json()) as PlayerSummaryResult;
  return data.response.players;
}

export async function resolveVanityUrl(query: string): Promise<string | null> {
  const url = new URL(steam.resolveVanityUrl);
  url.searchParams.set("key", env.STEAM_API_KEY);
  url.searchParams.set("vanityurl", query);

  const res = await fetch(url, {
    next: { revalidate: 60 * 60 * 3 },
  });
  if (res.status !== 200) return null;

  const data = await res.json();
  if (data.response.success === 1) return data.response.steamid;
  else return null;
}

export async function getPlaytime(steamid: string): Promise<Playtime | null> {
  const url = new URL(steam.recentPlayedGames);
  url.searchParams.set("key", env.STEAM_API_KEY);
  url.searchParams.set("steamid", steamid);

  const res = await fetch(url, {
    next: { revalidate: 60 * 60 * 3 },
  });
  if (res.status !== 200) return null;

  const data = (await res.json()) as RecentPlayedGamesResult;

  const games = data.response.games;
  if (!games) return null;

  const cs2 = games.find((g) => g.appid === 730);
  if (!cs2) return null;

  return {
    "2weeks": Math.round((cs2.playtime_2weeks * 10) / 60) / 10,
    forever: Math.round((cs2.playtime_forever * 10) / 60) / 10,
  };
}
