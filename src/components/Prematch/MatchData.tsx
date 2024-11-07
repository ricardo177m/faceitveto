import { MatchAnalysis } from "@/types/prematch";
import { config } from "@/config/config";

import Radar from "../Radar/Radar";

interface MatchDataProps {
  matchAnalysis?: MatchAnalysis;
  selectedRound: number;
  setSelectedRound: React.Dispatch<React.SetStateAction<number>>;
}

export function MatchData({
  matchAnalysis,
  selectedRound,
  setSelectedRound,
}: MatchDataProps) {
  if (!matchAnalysis) return null;

  const plant = matchAnalysis.data.plants.find(
    (p) => p.round === selectedRound
  );
  const timer = plant
    ? Math.floor((config.roundTime - plant.roundTime) / 60) +
      ":" +
      Math.floor((config.roundTime - plant.roundTime) % 60)
        .toString()
        .padStart(2, "0")
    : "N/A";

  return (
    <div className="flex flex-col justify-between md:flex-row">
      <div className="flex flex-col">
        <label htmlFor="round1" className="cursor-pointer">
          <input
            type="radio"
            id="round1"
            checked={selectedRound === 1}
            onChange={() => setSelectedRound(1)}
          />{" "}
          1st Half Pistol
        </label>

        <label htmlFor="round2" className="cursor-pointer">
          <input
            type="radio"
            id="round2"
            checked={selectedRound === 13}
            onChange={() => setSelectedRound(13)}
          />{" "}
          2nd Half Pistol
        </label>

        <p className="mt-4">Bomb plant time: {timer}</p>
      </div>
      <Radar data={matchAnalysis} round={selectedRound} />
    </div>
  );
}
