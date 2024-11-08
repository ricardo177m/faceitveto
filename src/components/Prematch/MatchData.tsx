import { useEffect, useState } from "react";

import { config } from "@/config/config";

import PlayerEquipment from "./PlayerEquipment";
import Radar from "./Radar";

interface MatchDataProps {
  matchAnalysis?: MatchAnalysis;
  premade: CuratedPlayer[];
}

export function MatchData({ matchAnalysis, premade }: MatchDataProps) {
  const [selectedRound, setSelectedRound] = useState<number | null>(null);

  if (!matchAnalysis || !matchAnalysis.processed || !matchAnalysis.data)
    return null;

  const { map, data } = matchAnalysis;

  const gameIds = premade.map((p) => p.gameId);

  const premadeTSideRound = data.rounds.find((r) =>
    r.equipment.find((e) => gameIds.includes(e.steamid) && e.team === "T")
  )?.round;
  if (premadeTSideRound && !selectedRound) setSelectedRound(premadeTSideRound);

  const round = matchAnalysis.data.rounds.find(
    (p) => p.round === selectedRound
  );
  if (!round) return null;
  const { plants, equipment } = round;

  const timer = plants.length
    ? Math.floor((config.roundTime - plants[0].roundTime) / 60) +
      ":" +
      Math.floor((config.roundTime - plants[0].roundTime) % 60)
        .toString()
        .padStart(2, "0")
    : "N/A";

  return (
    <div className="flex flex-col justify-between md:flex-row">
      <div className="flex flex-col">
        <p>T Side Data</p>

        <p className="my-4">Plant time: {timer}</p>

        <div className="mb-4 flex flex-col gap-1">
          {equipment
            .filter((e) => e.team === "T")
            .map((e) => (
              <PlayerEquipment key={`${e.steamid}+${e.round}`} equipment={e} />
            ))}
        </div>
        <div className="flex flex-col gap-1">
          {equipment
            .filter((e) => e.team === "CT")
            .map((e) => (
              <PlayerEquipment key={`${e.steamid}+${e.round}`} equipment={e} />
            ))}
        </div>
      </div>
      <Radar round={round} map={map} />
    </div>
  );
}
