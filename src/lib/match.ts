import { faceitConfig } from "@/config/faceit";
import { NotFoundError } from "@/lib/exceptions";
import { CuratedMap, CuratedMatch } from "@/types/curated-match";
import { Element, Faction, Match } from "@/types/match";

export async function fetchMatch(matchId: string): Promise<CuratedMatch> {
  const response = await fetch(faceitConfig.match(matchId), {
    next: { revalidate: 60 * 2 },
  });

  const data = await response.json();

  if (data.payload === undefined) throw new NotFoundError(data.message);

  const match: Match = data.payload;

  const partyIds: string[] = [];

  const buildFaction = (faction: Faction) => ({
    name: faction.name,
    avatar:
      faction.avatar === null ? "/assets/default_avatar.svg" : faction.avatar,
    winProbability: faction.stats.winProbability,
    captain: faction.leader,
    players: faction.roster.map((player) => {
      let partyId = partyIds.indexOf(player.partyId);
      if (partyId === -1) partyId = partyIds.push(player.partyId) - 1;
      return {
        id: player.id,
        nickname: player.nickname,
        avatar:
          player.avatar === null ? "/assets/default_avatar.svg" : player.avatar,
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
    image: map.image_lg,
  });

  const curatedMatch: CuratedMatch = {
    id: match.id,
    region: match.region,
    matchRanking: match.entityCustom.effectiveRanking,
    state: match.state,
    maps: match.voting.map.entities.map(mapFilter),
    mapPicks: match.voting.map.pick.map((map) => {
      const find = match.maps.find((m) => m.guid === map);
      if (find) return mapFilter(find);
    }) as CuratedMap[],
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
