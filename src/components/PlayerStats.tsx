import TeamMaps from "@/components/TeamMaps";
import getServerSession from "@/lib/getServerSession";
import { isPlayerFaction } from "@/lib/match";
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

  const session = getServerSession();

  let factions = [curatedMatch.teams.faction1, curatedMatch.teams.faction2];

  if (session && isPlayerFaction(factions[0], session.id))
    factions = factions.reverse();

  return (
    <div className="mx-4 mt-2 mb-4 py-4 space-y-4 overflow-x-auto scrollbar scrollbar-track-transparent scrollbar-thumb-slate-600 scrollbar-thumb-rounded-xl scrollbar-h-1">
      <TeamMaps
        team={factions[0]}
        maps={curatedMatch.maps}
        playerStats={playerStats}
      />
      <TeamMaps
        team={factions[1]}
        maps={curatedMatch.maps}
        playerStats={playerStats}
      />
    </div>
  );
}
