import { config } from "@/config/config";
import { faceit, faceitopen } from "@/config/endpoints";
import { NotFoundError } from "@/lib/exceptions";
import { env } from "@/env";

export async function fetchMatch(matchId: string): Promise<CuratedMatch> {
  const response = await fetch(faceit.match(matchId), {
    next: { revalidate: 5 },
  });

  const data = await response.json();

  if (data.payload === undefined) throw new NotFoundError(data.message);

  const match: Match = data.payload;

  const partyIds: string[] = [];

  const buildFaction = (faction: MatchFaction) => ({
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

  const mapFilter = (map: MatchElement) => ({
    name: map.name,
    id: map.guid,
    image: map.image_sm,
  });

  const curatedMatch: CuratedMatch = {
    id: match.id,
    region: match.region,
    matchRanking:
      match.entityCustom &&
      match.entityCustom.effectiveRanking &&
      match.entityCustom.effectiveRanking,
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
    demoURLs: match.demoURLs,
    winner: match.summaryResults?.winner,
    createdAt: match.createdAt,
    startedAt: match.startedAt,
    finishedAt: match.finishedAt,
  };

  return curatedMatch;
}

export async function fetchMatchStats(matchId: string): Promise<MatchStats[]> {
  const response = await fetch(faceit.matchStats(matchId), {
    next: { revalidate: 5 * 60 },
  });

  const data: MatchStats[] = await response.json();
  return data;
}

export async function fetchDemocracy(
  matchId: string
): Promise<Democracy | undefined> {
  const url = new URL(faceit.democracy(matchId));
  url.searchParams.append("_", Date.now().toString());
  const response = await fetch(url, { cache: "no-store" });

  const data = await response.json();

  if (response.status === 200) return data.payload;
  else return undefined;
}

export async function mockFetchDemoUrl(
  matchId: string
): Promise<string | null> {
  return new Promise((resolve) =>
    resolve(`${env.NEXT_PUBLIC_PARSER_URL}/tmp/${matchId}.dem`)
  );
}

export async function fetchDemoUrl(matchId: string): Promise<string | null> {
  const data = await fetch(faceit.match(matchId), {
    next: { revalidate: 5 },
  }).then((res) => res.json());

  if (data.payload === undefined) return null;

  const match: Match = data.payload;

  if (!match.demoURLs || !match.demoURLs.length) return null;
  const demoResourceUrl = match.demoURLs[0];

  const demores = await fetch(faceitopen.demos, {
    method: "POST",
    body: JSON.stringify({ resource_url: demoResourceUrl }),
    headers: { Authorization: `Bearer ${env.FACEIT_DEMOS_API_TOKEN}` },
  });

  if (!demores.ok) return null;
  const demo = await demores.json();

  return demo.payload.download_url;
}

export function isPlayerFaction(faction: CuratedFaction, playerId: string) {
  return faction.players.some((player) => player.id === playerId);
}

export function chosenMap(democracy: Democracy) {
  const mapTickets =
    democracy && democracy.tickets.find((t) => t.entity_type === "map");
  if (!mapTickets) return;
  const map = mapTickets.entities.find((e) => e.status === "pick");
  return map ? map.properties.game_map_id : undefined;
}

export function getCore(faction: CuratedFaction) {
  const parties = {} as Record<string, CuratedPlayer[]>;
  faction.players.forEach((p) => {
    if (!parties[p.partyId.toString()]) parties[p.partyId.toString()] = [];
    parties[p.partyId].push(p);
  });

  // get the number of players in the biggest party
  const maxPartySize = Math.max(
    ...Object.values(parties).map((party) => party.length)
  );
  if (maxPartySize < 3) return null;

  // get the party with the biggest size
  const core = Object.values(parties).find(
    (party) => party.length === maxPartySize
  );

  if (!core) return null;
  return core;
}
