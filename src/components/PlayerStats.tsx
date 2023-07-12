import { CuratedMatch } from "@/types/curated-match";
import getServerSession from "@/lib/getServerSession";
import { isPlayerFaction } from "@/lib/match";
import { fetchPlayerStats } from "@/lib/player";
import TeamMaps from "@/components/TeamMaps";

interface PlayerStatsProps {
  curatedMatch: CuratedMatch;
}

export default async function PlayerStats({ curatedMatch }: PlayerStatsProps) {
  const playerStatsPromises = [
    ...curatedMatch.teams.faction1.players.map((p) => fetchPlayerStats(p.id)),
    ...curatedMatch.teams.faction2.players.map((p) => fetchPlayerStats(p.id)),
  ];

  const playerStats = await Promise.all(playerStatsPromises);

  const session = getServerSession();

  let factions = [curatedMatch.teams.faction1, curatedMatch.teams.faction2];

  if (session && isPlayerFaction(factions[0], session.id))
    factions = factions.reverse();

  return (
    <div className="mx-4 mb-4 mt-2 space-y-4 overflow-x-auto py-4 scrollbar scrollbar-track-transparent scrollbar-thumb-slate-600 scrollbar-thumb-rounded-xl scrollbar-h-1">
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
