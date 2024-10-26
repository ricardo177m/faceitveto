import { PlayerSearchResult } from "@/types/player-search-result";
import { faceit } from "@/config/endpoints";

export async function fetchPlayerSearch(
  query: string,
  limit = 3
): Promise<PlayerSearchResult> {
  const url = new URL(faceit.search);
  url.searchParams.append("limit", limit.toString());
  url.searchParams.append("query", query);

  const response = await fetch(url, {
    next: { revalidate: 60 * 60 * 3 },
  });
  const data = await response.json();
  if (response.status === 200) return data.payload.players;
  else throw new Error(data.errors[0].message);
}
