import { faceit } from "@/config/endpoints";

export async function fetchPlayerLobby(
  query: string
): Promise<PlayerSearchResult> {
  const url = new URL(faceit.searchPlayers);
  url.searchParams.append("limit", "3");
  url.searchParams.append("query", query);

  const response = await fetch(url, {
    next: { revalidate: 60 * 60 * 3 },
  });
  const data = await response.json();
  if (response.status === 200) return data.payload;
  else throw new Error(data.errors[0].message);
}
