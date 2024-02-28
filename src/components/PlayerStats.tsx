import { useCallback, useEffect, useState } from "react";

import { CuratedMatch } from "@/types/curated-match";
import { CuratedPlayerStats } from "@/types/curated-player-stats";
import { isPlayerFaction } from "@/lib/match";
import { useSession } from "@/hooks";
import TeamMaps from "@/components/TeamMaps";
import { env } from "@/env.mjs";

interface PlayerStatsProps {
  curatedMatch: CuratedMatch;
  showMostRecent: boolean;
}

export default function PlayerStats({
  curatedMatch,
  showMostRecent,
}: PlayerStatsProps) {
  const [playerStats, setPlayerStats] = useState<CuratedPlayerStats[] | null>(
    null
  );

  const session = useSession();

  const fetchPlayerStats = useCallback(async () => {
    const fetchPromises = [
      ...curatedMatch.teams.faction1.players.map((p) =>
        fetch(`${env.NEXT_PUBLIC_API_URL}/player/${p.id}/stats`)
      ),
      ...curatedMatch.teams.faction2.players.map((p) =>
        fetch(`${env.NEXT_PUBLIC_API_URL}/player/${p.id}/stats`)
      ),
    ];

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

  return (
    <div className="mx-4 mb-4 mt-2 space-y-4 overflow-x-auto py-4 scrollbar scrollbar-track-transparent scrollbar-thumb-slate-600 scrollbar-thumb-rounded-xl scrollbar-h-1">
      <TeamMaps
        team={factions[0]}
        maps={curatedMatch.maps}
        playerStats={playerStats?.map((p) =>
          showMostRecent ? p.mostRecent : p.total
        )}
      />
      <TeamMaps
        team={factions[1]}
        maps={curatedMatch.maps}
        playerStats={playerStats?.map((p) =>
          showMostRecent ? p.mostRecent : p.total
        )}
      />
    </div>
  );
}
