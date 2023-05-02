import { faceitConfig } from "@/config/faceit";
import { CuratedPlayerStats, IMaps } from "@/types/curated-player-stats";
import { Player } from "@/types/player";
import { PlayerStats } from "@/types/player-stats";

export async function fetchPlayerById(playerId: string): Promise<Player> {
  const response = await fetch(faceitConfig.user(playerId));
  const data = await response.json();

  return data.payload as Player;
}

export async function fetchPlayerByNickname(nickname: string): Promise<Player> {
  const response = await fetch(faceitConfig.player(nickname));
  const data = await response.json();

  return data.payload as Player;
}

export async function fetchPlayerStats(playerId: string): Promise<any> {
  // ! change any
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