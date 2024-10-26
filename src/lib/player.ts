import { IMaps, IntervalPlayerStats } from "@/types/curated-player-stats";
import { PartialMatchState } from "@/types/match";
import { Player } from "@/types/player";
import { PlayerMatchStats } from "@/types/player-match-stats";
import { PlayerStats } from "@/types/player-stats";
import { config } from "@/config/config";
import { faceit } from "@/config/endpoints";

export async function fetchPlayerById(playerId: string): Promise<Player> {
  const response = await fetch(faceit.user(playerId), {
    cache: "force-cache",
  });
  const data = await response.json();
  if (response.status !== 200) throw new Error(data.error);

  return data.payload as Player;
}

export async function fetchPlayerByNickname(nickname: string): Promise<Player | null> {
  const response = await fetch(faceit.player(nickname), {
    next: { revalidate: 60 * 60 * 3 },
  });
  const data = await response.json();
  if (response.status === 404) return null;
  if (response.status === 200) return data.payload;
  else throw new Error(data.errors[0].message);
}

export async function fetchPlayerState(
  playerId: string
): Promise<string | null> {
  const url = new URL(faceit.state);
  url.searchParams.append("userId", playerId);

  const response = await fetch(url, { cache: "no-cache" });
  const data: PartialMatchState = await response.json();

  const match = Object.values(data.payload)[0];
  return match === undefined ? null : match[0].id;
}

export async function fetchPlayerStats(
  playerId: string
): Promise<IntervalPlayerStats> {
  const url = new URL(faceit.stats(playerId));
  const response = await fetch(url, {
    next: { revalidate: 60 * 20 },
  });

  const data = await response.json();

  const payload: PlayerStats = data;

  const result: IntervalPlayerStats = {
    playerId,
    overall: {
      matches: 0,
      wins: 0,
      kdr: 0,
    },
    maps: {} as IMaps,
  };

  const maps = payload.segments?.find(
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
): Promise<IntervalPlayerStats> {
  const url = new URL(faceit.matches(playerId));
  url.searchParams.append("page", "0");
  url.searchParams.append("size", size.toString());

  const response = await fetch(url, {
    next: { revalidate: 60 * 20 },
  });
  const data = await response.json();

  const payload: PlayerMatchStats[] = data;

  const result: IntervalPlayerStats = {
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
    result.maps[map].kdr += kdr;

    if (isWin) {
      result.overall.wins++;
      result.maps[map].wins++;
    }
  });

  Object.entries(result.maps).forEach(([, v]) => {
    v.kdr = Math.round((v.kdr / v.matches) * 100) / 100;
  });

  result.overall.kdr =
    Math.round((result.overall.kdr / result.overall.matches) * 100) / 100;

  if (!result.overall.kdr) result.overall.kdr = 0;

  return result;
}

export async function fetchPlayerMatches(
  playerId: string,
  size: number
): Promise<PlayerMatchStats[]> {
  const url = new URL(faceit.matches(playerId));
  url.searchParams.append("page", "0");
  url.searchParams.append("size", size.toString());

  const response = await fetch(url, {
    next: { revalidate: 60 * 5 },
  });
  const data = await response.json();

  const payload: PlayerMatchStats[] = data;

  return payload;
}
