import TeamMaps from "@/components/TeamMaps";
import { fetchPlayerStatsApi } from "@/lib/player";
import { CuratedMatch } from "@/types/curated-match";

interface PlayerStatsProps {
  curatedMatch: CuratedMatch;
}

export default async function PlayerStats({ curatedMatch }: PlayerStatsProps) {
  const playerStatsPromises = [
    ...curatedMatch.teams.faction1.players.map((p) =>
      fetchPlayerStatsApi(p.id)
    ),
    ...curatedMatch.teams.faction2.players.map((p) =>
      fetchPlayerStatsApi(p.id)
    ),
  ];

  const playerStats = await Promise.all(playerStatsPromises);

  return (
    <div className="mx-4 mt-2 mb-4 py-4 space-y-4 overflow-x-auto">
      <TeamMaps
        team={curatedMatch.teams.faction1}
        maps={curatedMatch.maps}
        playerStats={playerStats}
      />
      <TeamMaps
        team={curatedMatch.teams.faction2}
        maps={curatedMatch.maps}
        playerStats={playerStats}
      />
    </div>
  );
}
