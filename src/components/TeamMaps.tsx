import Image from "next/image";

import { CuratedFaction, CuratedMap } from "@/types/curated-match";
import { CuratedPlayerStats } from "@/types/curated-player-stats";

import MapsPlayerRow from "./MapsPlayerRow";

interface TeamMapsProps {
  team: CuratedFaction;
  maps: CuratedMap[];
  playerStats: CuratedPlayerStats[] | null;
}

export default function TeamMaps({ team, maps, playerStats }: TeamMapsProps) {
  return (
    <div className="py-1">
      <table className="mx-auto table-auto">
        <thead>
          <tr>
            <th className="px-4 text-left">{team.name}</th>
            <th className="text-sm font-normal">Level</th>
            <th className="min-w-[3.2rem] text-center text-sm font-normal">
              Maps
            </th>
            {maps.map((map) => (
              <th key={map.id} className="relative text-sm font-normal">
                <Image
                  src={map.image}
                  alt="Map image"
                  width={80}
                  height={32}
                  className="absolute -top-4 left-3 -z-10 rounded-md opacity-60"
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
