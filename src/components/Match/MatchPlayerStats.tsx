import { useCallback, useEffect, useState } from "react";

import { isPlayerFaction } from "@/lib/match";
import { useSession } from "@/hooks";
import usePlayerCache from "@/hooks/usePlayerCache.hook";
import TeamMaps from "@/components/Match/TeamMaps";
import { env } from "@/env";

interface MatchPlayerStatsProps {
  curatedMatch: CuratedMatch;
  showMostRecent: boolean;
  democracy?: Democracy;
}

export default function MatchPlayerStats({
  curatedMatch,
  showMostRecent,
  democracy,
}: MatchPlayerStatsProps) {
  const [playerStats, setPlayerStats] = useState<CuratedPlayerStats[] | null>(
    null
  );

  const session = useSession();

  // matches keep the nicknames at the time of the match
  // so we fetch the player list to get the current ones
  const { playerList, fetchPlayers } = usePlayerCache();

  const ids = [
    ...curatedMatch.teams.faction1.players,
    ...curatedMatch.teams.faction2.players,
  ].map((p) => p.id);

  useEffect(() => {
    fetchPlayers(ids);
  }, [fetchPlayers]);

  const fetchPlayerStats = useCallback(async () => {
    const fetchPromises = ids.map((id) =>
      fetch(`${env.NEXT_PUBLIC_API_URL}/player/${id}/stats`)
    );

    const results = await Promise.all(fetchPromises);
    const stats: CuratedPlayerStats[] = await Promise.all(
      results.map((r) => r.json())
    );
    setPlayerStats(stats);
  }, [curatedMatch.teams]);

  useEffect(() => {
    fetchPlayerStats();
  }, [fetchPlayerStats]);

  let factions = [curatedMatch.teams.faction1, curatedMatch.teams.faction2];

  if (session.user && isPlayerFaction(factions[0], session.user.id))
    factions = factions.reverse();

  const democracyMapEntities = democracy?.tickets.find(
    (t) => t.entity_type === "map"
  );

  return (
    <div className="mt-2 space-y-4 overflow-x-auto overflow-y-hidden py-4 pb-5 scrollbar scrollbar-track-transparent scrollbar-thumb-slate-600 scrollbar-thumb-rounded-xl scrollbar-h-1">
      <TeamMaps
        team={factions[0]}
        maps={curatedMatch.maps}
        playerStats={playerStats?.map((p) =>
          showMostRecent ? p.mostRecent : p.total
        )}
        democracyMapEntities={democracyMapEntities}
        playerCache={playerList}
      />
      <TeamMaps
        team={factions[1]}
        maps={curatedMatch.maps}
        playerStats={playerStats?.map((p) =>
          showMostRecent ? p.mostRecent : p.total
        )}
        democracyMapEntities={democracyMapEntities}
        playerCache={playerList}
      />
    </div>
  );
}
