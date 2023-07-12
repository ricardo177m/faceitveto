import { CuratedPlayerStats, IMaps } from "@/types/curated-player-stats";
import { PartialMatchState } from "@/types/match";
import { Player } from "@/types/player";
import { PlayerStats } from "@/types/player-stats";
import { config } from "@/config/config";
import { faceitConfig } from "@/config/faceit";

export async function fetchPlayerById(playerId: string): Promise<Player> {
  const response = await fetch(faceitConfig.user(playerId), {
    cache: "force-cache",
  });
  const data = await response.json();
  if (response.status !== 200) throw new Error(data.error);

  return data.payload as Player;
}

export async function fetchPlayerByNickname(nickname: string): Promise<Player> {
  const response = await fetch(faceitConfig.player(nickname), {
    next: { revalidate: 60 * 60 * 3 },
  });
  const data = await response.json();
  return data.payload;
}

export async function fetchPlayerState(
  playerId: string
): Promise<string | null> {
  const url = new URL(faceitConfig.state);
  url.searchParams.append("userId", playerId);

  const response = await fetch(url, { cache: "no-cache" });
  const data: PartialMatchState = await response.json();

  const match = Object.values(data.payload)[0];
  return match === undefined ? null : match[0].id;
}

export async function fetchPlayerStats(
  playerId: string,
  size: number = config.lastNumberOfMatches
): Promise<CuratedPlayerStats> {
  const url = new URL(faceitConfig.matches(playerId));
  url.searchParams.append("page", "0");
  url.searchParams.append("size", size.toString());

  const response = await fetch(url, {
    next: { revalidate: 60 * 30 },
  });
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
    const isWin = match.i10 === "1";
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

export async function fetchPlayerMatches(
  playerId: string,
  size: number
): Promise<PlayerStats[]> {
  const url = new URL(faceitConfig.matches(playerId));
  url.searchParams.append("page", "0");
  url.searchParams.append("size", size.toString());

  const response = await fetch(url, {
    next: { revalidate: 60 * 5 },
  });
  const data = await response.json();

  const payload: PlayerStats[] = data;

  return payload;
}
