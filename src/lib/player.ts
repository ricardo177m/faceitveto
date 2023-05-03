import { faceitConfig } from "@/config/faceit";
import { CuratedPlayerStats, IMaps } from "@/types/curated-player-stats";
import { Player } from "@/types/player";
import { PlayerStats } from "@/types/player-stats";

export async function fetchPlayerById(playerId: string): Promise<Player> {
  const response = await fetch(faceitConfig.user(playerId), {
    cache: "force-cache",
  });
  const data = await response.json();

  return data.payload as Player;
}

export async function fetchPlayerByNickname(nickname: string): Promise<Player> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/nickname/${nickname}`,
    { cache: "force-cache" }
  );

  const data = await response.json();

  if (response.status !== 200) throw new Error(data.error);

  return data;
}

export async function fetchPlayerState(
  playerId: string
): Promise<string | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/state/${playerId}`,
    { cache: "no-cache" }
  );
  const data = await response.json();

  return data.state;
}

export async function fetchPlayerStats(
  playerId: string
): Promise<CuratedPlayerStats> {
  const url = new URL(faceitConfig.matches(playerId));
  url.searchParams.append("limit", "100");

  const response = await fetch(url);
  const data = await response.json();

  const payload: PlayerStats[] = data;

  const result: CuratedPlayerStats = {
    playerId,
    overall: {
      matches: 0,
      wins: 0,
    },
    maps: {} as IMaps,
  };

  payload.forEach((match) => {
    const map: string = match.i1;
    const isWin = match.i10 == "1";
    // const kdr = Number.parseFloat(match.c2);

    if (!(map in result.maps)) {
      result.maps[map] = {
        matches: 0,
        wins: 0,
      };
    }

    result.overall.matches++;
    result.maps[map].matches++;

    if (isWin) {
      result.overall.wins++;
      result.maps[map].wins++;
    }
  });

  return result;
}
