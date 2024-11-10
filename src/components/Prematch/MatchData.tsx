import { useEffect, useState } from "react";
import moment from "moment";
import { FaClock } from "react-icons/fa";

import { config } from "@/config/config";
import { formatDateTime } from "@/utils/dateFormat";

import Tooltip from "../Tooltip";
import Checkbox from "../ui/Checkbox";
import PlayerEquipment from "./PlayerEquipment";
import Radar from "./Radar";

interface MatchDataProps {
  matchAnalysis?: MatchAnalysis;
  premade: CuratedPlayer[];
  matchDetails: DetailedMatch;
}

export function MatchData({
  matchAnalysis,
  premade,
  matchDetails,
}: MatchDataProps) {
  const [tSideRound, setTSideRound] = useState<number | null>(null);
  const [selectedRound, setSelectedRound] = useState<number | null>(null);

  const gameIds = premade.map((p) => p.gameId);

  useEffect(() => {
    if (!matchAnalysis || !matchAnalysis.data) return;
    const premadeTSideRound = data.rounds.find((r) =>
      r.equipment.find((e) => gameIds.includes(e.steamid) && e.team === "T")
    )?.round;
    setTSideRound(premadeTSideRound || data.rounds[0].round);
    setSelectedRound(premadeTSideRound || data.rounds[0].round);
  }, [matchAnalysis, premade]);

  if (!matchAnalysis || !matchAnalysis.processed || !matchAnalysis.data)
    return null;

  const { map, data } = matchAnalysis;

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
        <Checkbox
          isChecked={selectedRound === tSideRound}
          setIsChecked={() =>
            setSelectedRound((r) =>
              r === tSideRound
                ? tSideRound === 1
                  ? 13
                  : 1
                : tSideRound === 1
                  ? 1
                  : 13
            )
          }
          label="T Side Data"
          className="my-2 inline-flex items-center gap-2"
        />

        <Tooltip
          text={formatDateTime(matchDetails.finished_at * 1000)}
          className="top-8 w-min"
        >
          <div
            className="mb-2 inline-flex items-center gap-2"
            suppressHydrationWarning // client & server timezones may differ
          >
            <FaClock className="text-dark-800" />
            <span>{moment(matchDetails.finished_at * 1000).fromNow()}</span>
          </div>
        </Tooltip>

        <p className="mb-2">Plant time: {timer}</p>

        <div className="mb-4 flex flex-col gap-1">
          {equipment
            .filter((e) => e.team === "T")
            .map((e) => (
              <PlayerEquipment
                key={`${e.steamid}+${e.round}`}
                equipment={e}
                isCore={gameIds.includes(e.steamid)}
              />
            ))}
        </div>
        <div className="flex flex-col gap-1">
          {equipment
            .filter((e) => e.team === "CT")
            .map((e) => (
              <PlayerEquipment
                key={`${e.steamid}+${e.round}`}
                equipment={e}
                isCore={gameIds.includes(e.steamid)}
              />
            ))}
        </div>
      </div>
      <Radar round={round} map={map} />
    </div>
  );
}
