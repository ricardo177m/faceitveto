import Image from "next/image";

import { CuratedFaction, CuratedMap } from "@/types/curated-match";
import { IntervalPlayerStats } from "@/types/curated-player-stats";
import { Ticket } from "@/types/democracy";

import MapsPlayerRow from "./MapsPlayerRow";

interface TeamMapsProps {
  team: CuratedFaction;
  maps: CuratedMap[];
  playerStats?: IntervalPlayerStats[];
  democracyMapEntities?: Ticket;
}

export default function TeamMaps({
  team,
  maps,
  playerStats,
  democracyMapEntities,
}: TeamMapsProps) {
  const drops = !democracyMapEntities
    ? []
    : democracyMapEntities.entities
        .filter((e) => e.status === "drop")
        .map((e) => e.properties.class_name);

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
              <th
                key={map.id}
                className={`relative text-sm font-normal transition-opacity ${playerStats && drops.find((m) => m === map.id) ? "opacity-30" : ""}`}
              >
                <Image
                  src={map.image}
                  alt={`${map.name}'s cover`}
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
                !playerStats
                  ? undefined
                  : playerStats.find((p) => p.playerId === player.id)
              }
              maps={maps}
              captain={team.captain}
              drops={drops}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
