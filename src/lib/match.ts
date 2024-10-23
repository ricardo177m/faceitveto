import {
  CuratedFaction,
  CuratedMap,
  CuratedMatch,
} from "@/types/curated-match";
import { Democracy } from "@/types/democracy";
import { Element, Faction, Match } from "@/types/match";
import { MatchStats } from "@/types/match-stats";
import { config } from "@/config/config";
import { faceitConfig } from "@/config/faceit";
import { NotFoundError } from "@/lib/exceptions";

export async function fetchMatch(matchId: string): Promise<CuratedMatch> {
  const response = await fetch(faceitConfig.match(matchId), {
    next: { revalidate: 5 },
  });

  const data = await response.json();

  if (data.payload === undefined) throw new NotFoundError(data.message);

  const match: Match = data.payload;

  const partyIds: string[] = [];

  const buildFaction = (faction: Faction) => ({
    name: faction.name,
    avatar:
      faction.avatar === null ? config.defaultAvatarAsset : faction.avatar,
    winProbability:
      faction.stats !== undefined ? faction.stats.winProbability : undefined,
    captain: faction.leader,
    players: faction.roster.map((player) => {
      let partyId = partyIds.indexOf(player.partyId);
      if (partyId === -1) partyId = partyIds.push(player.partyId) - 1;
      return {
        id: player.id,
        nickname: player.nickname,
        avatar:
          player.avatar === null ? config.defaultAvatarAsset : player.avatar,
        gameId: player.gameId,
        memberships: player.memberships,
        elo: player.elo,
        level: player.gameSkillLevel,
        partyId,
      };
    }),
  });

  const mapFilter = (map: Element) => ({
    name: map.name,
    id: map.guid,
    image: map.image_sm,
  });

  const curatedMatch: CuratedMatch = {
    id: match.id,
    region: match.region,
    matchRanking: match.entityCustom.effectiveRanking,
    state: match.state,
    bestOf: match.matchCustom.overview.round.to_play,
    maps: match.matchCustom.tree.map.values.value.map(mapFilter),
    mapPicks: Object.prototype.hasOwnProperty.call(match, "voting")
      ? (match.voting?.map.pick.map((map) => {
          const find = match.maps.find((m) => m.guid === map);
          if (find) return mapFilter(find);
        }) as CuratedMap[])
      : undefined,
    teams: {
      faction1: buildFaction(match.teams.faction1),
      faction2: buildFaction(match.teams.faction2),
    },
    winner: match.summaryResults?.winner,
    createdAt: match.createdAt,
    startedAt: match.startedAt,
    finishedAt: match.finishedAt,
  };

  return curatedMatch;
}

export async function fetchMatchStats(matchId: string): Promise<MatchStats[]> {
  const response = await fetch(faceitConfig.matchStats(matchId), {
    next: { revalidate: 5 },
  });

  const data: MatchStats[] = await response.json();
  return data;
}

export async function fetchDemocracy(
  matchId: string
): Promise<Democracy | undefined> {
  const response = await fetch(faceitConfig.democracy(matchId), {
    cache: "no-cache",
    headers: {
      "Cache-Control": "no-cache",
      pragma: "no-cache",
    },
  });

  const data = await response.json();

  if (response.status === 200) return data.payload;
  else return undefined;
}

export function isPlayerFaction(faction: CuratedFaction, playerId: string) {
  return faction.players.some((player) => player.id === playerId);
}
