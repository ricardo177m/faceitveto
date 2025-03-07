import {
  fetchPlayerDetailedMatches,
  fetchPlayerMatches,
  fetchPlayerStats,
} from "./player";

export async function coreMatchesMap(
  ids: string[],
  map?: CuratedMap,
  limit = 2
) {
  const playerPromises = ids.map((id) => fetchPlayerStats(id));
  const players = await Promise.all(playerPromises);

  const minPlayersInTeam = 3;

  // we will search in the match history of at least n players
  // where n is the number of players in the core minus 2
  // since we only want matches where at least 3 players from the core are present,
  // we guarantee that we find all relevant matches by searching n player histories
  const numPlayerHistorySearch = ids.length - 2;

  // find players with less matches
  const ordered = players.sort((a, b) => a.overall.matches - b.overall.matches);

  const matchesDetailsPromises: Promise<DetailedMatch[]>[] = [];
  const matchesStatsPromises: Promise<PlayerMatchStats[]>[] = [];

  let count = 0;

  const filteredMatches: DetailedMatch[] = [];

  for (const player of ordered.slice(0, numPlayerHistorySearch)) {
    const { playerId } = player;
    const matches = player.overall.matches;

    Array.from({ length: Math.ceil(matches / 100) }, (_, i) => {
      matchesDetailsPromises.push(fetchPlayerDetailedMatches(playerId, 100, i));
      matchesStatsPromises.push(fetchPlayerMatches(playerId, 100, i));
    });

    const matchesDetails = (await Promise.all(matchesDetailsPromises)).flat();
    const matchesStats = (await Promise.all(matchesStatsPromises)).flat();

    matchesDetails.forEach((match) => {
      if (!match) return;
      if (filteredMatches.find((m) => m.match_id === match.match_id)) return;
      count++;

      const faction1 = match.teams.faction1.players;
      const faction2 = match.teams.faction2.players;

      const faction1Ids = faction1.map((player) => player.player_id);
      const faction2Ids = faction2.map((player) => player.player_id);

      // check if at least 3 players are in the match
      const isValidFaction1 =
        ids.filter((id) => faction1Ids.includes(id)).length >= minPlayersInTeam;
      const isValidFaction2 =
        ids.filter((id) => faction2Ids.includes(id)).length >= minPlayersInTeam;

      if (!isValidFaction1 && !isValidFaction2) return;

      const stats = matchesStats.find(
        (stats) => stats.matchId === match.match_id
      );
      if (!stats) return;

      const className = map ? map.className.toLowerCase() : "";
      const deClassName = "de_" + className;

      if (![map?.id, className, deClassName].includes(stats.i1.toLowerCase()))
        return;

      match.stats = {
        isWin: stats.i10 === "1",
        map: stats.i1,
        score: stats.i18,
        roundsWon: stats.c5,
      };

      filteredMatches.push(match);
    });
  }

  return {
    stats: {
      total: filteredMatches.length,
      wins: filteredMatches.filter((match) => match.stats.isWin).length,
    },
    matches: filteredMatches
      .sort((a, b) => b.finished_at - a.finished_at)
      .slice(0, limit),
    matchesCount: count,
  } as TeamStatsData;
}
