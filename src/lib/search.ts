import { faceit } from "@/config/endpoints";

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

  console.log(response);
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
