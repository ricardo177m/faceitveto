import { CuratedPlayerStats, IMaps } from "@/types/curated-player-stats";
import { PartialMatchState } from "@/types/match";
import { Player } from "@/types/player";
import { PlayerMatchStats } from "@/types/player-match-stats";
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
  if (response.status === 200) return data.payload;
  else throw new Error(data.errors[0].message);
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
  playerId: string
): Promise<CuratedPlayerStats> {
  const url = new URL(faceitConfig.stats(playerId));
  const response = await fetch(url, {
    next: { revalidate: 60 * 20 },
  });

  const data = await response.json();

  const payload: PlayerStats = data;

  const result: CuratedPlayerStats = {
    playerId,
    overall: {
      matches: 0,
      wins: 0,
      kdr: 0,
    },
    maps: {} as IMaps,
  };

  const maps = payload.segments.find(
    (s) => s._id.gameMode === "5v5" && s._id.segmentId === "csgo_map"
  );

  if (!maps) return result;

  Object.entries(maps.segments).forEach(([k, v]) => {
    result.maps[k] = {
      matches: parseInt(v.m1),
      wins: parseInt(v.m2),
      kdr: Number.parseFloat(v.k5),
    };

    result.overall.matches += result.maps[k].matches;
    result.overall.wins += result.maps[k].wins;
  });

  result.overall.kdr = Number.parseFloat(payload.lifetime.k5);

  return result;
}

export async function fetchPlayerStatsLastMatches(
  playerId: string,
  size: number = config.lastNumberOfMatches
): Promise<CuratedPlayerStats> {
  const url = new URL(faceitConfig.matches(playerId));
  url.searchParams.append("page", "0");
  url.searchParams.append("size", size.toString());

  const response = await fetch(url, {
    next: { revalidate: 60 * 20 },
  });
  const data = await response.json();

  const payload: PlayerMatchStats[] = data;

  const result: CuratedPlayerStats = {
    playerId,
    overall: {
      matches: 0,
      wins: 0,
      kdr: 0,
    },
    maps: {} as IMaps,
  };

  payload.forEach((match) => {
    const map: string = match.i1;
    const isWin = match.i10 === "1";
    const kdr = Number.parseFloat(match.c2);

    if (!(map in result.maps)) {
      result.maps[map] = {
        matches: 0,
        wins: 0,
        kdr,
      };
    }

    result.overall.matches++;
    result.overall.kdr += kdr;

    result.maps[map].matches++;
    result.maps[map].kdr = kdr;

    if (isWin) {
      result.overall.wins++;
      result.maps[map].wins++;
    }
  });

  result.overall.kdr /= result.overall.matches;

  return result;
}

export async function fetchPlayerMatches(
  playerId: string,
  size: number
): Promise<PlayerMatchStats[]> {
  const url = new URL(faceitConfig.matches(playerId));
  url.searchParams.append("page", "0");
  url.searchParams.append("size", size.toString());

  const response = await fetch(url, {
    next: { revalidate: 60 * 5 },
  });
  const data = await response.json();

  const payload: PlayerMatchStats[] = data;

  return payload;
}
