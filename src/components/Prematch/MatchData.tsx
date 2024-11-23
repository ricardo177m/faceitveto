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
  meta?: MatchMeta;
  matchAnalysis?: MatchData;
  premade: CuratedPlayer[];
  matchDetails: DetailedMatch;
  selectedRound: number;
  setSelectedRound: React.Dispatch<React.SetStateAction<number>>;
}

export function MatchData({
  meta,
  matchAnalysis,
  premade,
  matchDetails,
  selectedRound,
  setSelectedRound,
}: MatchDataProps) {
  const gameIds = premade.map((p) => p.gameId);

  if (!meta || !meta.processed || !matchAnalysis) return null;

  return (
    <div className="flex flex-col-reverse justify-between gap-2 md:flex-row md:gap-8">
      <div className="flex w-full flex-col md:w-1/3">
        <Checkbox
          isChecked={selectedRound === 0}
          setIsChecked={() => setSelectedRound((r) => (r === 0 ? 1 : 0))}
          label="First Half"
          className="my-2 inline-flex items-center gap-2"
        />

        <div className="mb-2">
          <p className="font-bold">🚧 WORK IN PROGRESS! 🚧</p>
        </div>

        <div className="mb-2">
          <Tooltip
            text={formatDateTime(matchDetails.finished_at * 1000)}
            className="top-8 w-min"
          >
            <div className="inline-flex items-center gap-2">
              <FaClock className="text-dark-800" />
              <span>{moment(matchDetails.finished_at * 1000).fromNow()}</span>
            </div>
          </Tooltip>
        </div>

        {/* <p className="mb-2">Plant time: {timer}</p> */}

        {/* <div className="mb-4 flex flex-col gap-1">
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
        </div> */}
      </div>
      <div className="w-full md:w-2/3">
        <Radar
          meta={meta}
          data={matchAnalysis}
          className={"aspect-square w-full border border-gray-600"}
        />
      </div>
    </div>
  );
}
