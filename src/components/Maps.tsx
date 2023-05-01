import Image from "next/image";

import { CuratedFaction, CuratedMap } from "@/types/curated-match";

interface TeamMapsProps {
  team: CuratedFaction;
  maps: CuratedMap[];
}

export default function TeamMaps({ team, maps }: TeamMapsProps) {
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
            <tr
              key={player.id}
              className="h-16 bg-dark-500 border-t-2 border-dark-300 rounded-md"
            >
              <td className="inline-flex items-center gap-4 w-56 h-16 pl-4 overflow-hidden text-ellipsis">
                <Image
                  src={player.avatar}
                  alt="Player avatar"
                  width="36"
                  height="36"
                  className="rounded-full border border-dark-700"
                />
                {player.nickname}
              </td>
              <td className="px-4">
                <img
                  src={`/assets/faceit-levels/${player.level}.svg`}
                  alt={`Level ${player.level}`}
                  className="min-w-[2rem] h-8"
                />
              </td>
              {maps.map((map) => (
                <td
                  key={map.id}
                  className="px-4 min-w-[6.5rem] font-bold text-center"
                >
                  <span className="text-green-500 mr-2">10%</span>
                  {/* text-red-600 */}
                  <span className="text-neutral-400 text-xs">80</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
