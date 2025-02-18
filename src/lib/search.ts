import { faceit, faceitopen } from "@/config/endpoints";
import { env } from "@/env";

export async function fetchPlayerSearch(
  query: string,
  limit = 3
): Promise<PlayerSearchResult> {
  const url = new URL(faceit.searchPlayers);
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("query", query);
  url.searchParams.append("offset", "0");

  const response = await fetch(url, {
    next: { revalidate: 60 * 60 * 3 },
  });

  const data = await response.json();
  if (response.status === 200) return data;
  else throw new Error(data.errors[0].message);
}

export async function fetchPlayerSearchOpen(
  query: string,
  limit = 3
): Promise<PlayerSearchResultOpen> {
  const url = new URL(faceitopen.search);
  url.searchParams.append("nickname", query);
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("offset", "0");

  const response = await fetch(url, {
    next: { revalidate: 60 * 60 * 3 },
    headers: {
      Authorization: `Bearer ${env.NEXT_PUBLIC_FACEIT_OPEN_API_CLIENT_TOKEN}`,
    },
  });

  const data = await response.json();
  if (response.status === 200) return data;
  else throw new Error(data.errors[0].message);
}

export async function fetchPlayerSearchGameId(
  query: string,
  limit = 3
): Promise<PlayerSearchResult> {
  const url = new URL(faceit.searchPlayers);
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("game_id", query);
  url.searchParams.append("offset", "0");

  const response = await fetch(url, {
    next: { revalidate: 60 * 60 * 3 },
  });
  const data = await response.json();
  if (response.status === 200) return data;
  else throw new Error(data.errors[0].message);
}

export async function fetchPlayerByGameIdOpen(
  query: string
): Promise<PlayerOpen | null> {
  const url = new URL(faceitopen.player);
  url.searchParams.append("game_player_id", query);
  url.searchParams.append("game", "cs2");

  const response = await fetch(url, {
    next: { revalidate: 60 * 60 * 3 },
    headers: {
      Authorization: `Bearer ${env.FACEIT_OPEN_API_TOKEN}`,
    },
  });
  const data = await response.json();
  if (response.status === 200) return data;
  else if (response.status === 404) return null;
  else throw new Error(data.errors[0].message);
}
