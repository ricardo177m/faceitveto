import Image from "next/image";

import MapsPlayerRow from "./MapsPlayerRow";
import { CuratedFaction, CuratedMap } from "@/types/curated-match";
import { CuratedPlayerStats } from "@/types/curated-player-stats";

interface TeamMapsProps {
  team: CuratedFaction;
  maps: CuratedMap[];
  playerStats: CuratedPlayerStats[] | null;
}

export default function TeamMaps({ team, maps, playerStats }: TeamMapsProps) {
  return (
    <div className="py-1">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="text-left px-4">{team.name}</th>
            <th className="font-normal text-sm">Level</th>
            {maps.map((map) => (
              <th key={map.id} className="font-normal text-sm relative">
                <Image
                  src={map.image}
                  alt="Map image"
                  width={80}
                  height={32}
                  className="absolute -z-10 -top-4 left-3 opacity-60 rounded-md"
                />
                <span className="z-10">{map.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {team.players.map((player) => (
            <MapsPlayerRow
              key={player.id}
              player={player}
              stats={
                playerStats === null
                  ? undefined
                  : playerStats.find((p) => p.playerId === player.id)
              }
              maps={maps}
              captain={team.captain}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
