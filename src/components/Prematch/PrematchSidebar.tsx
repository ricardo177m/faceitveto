import React from "react";
import moment from "moment";
import { FaClock } from "react-icons/fa";

import { formatDateTime } from "@/utils/dateFormat";

import LevelElo from "../LevelElo";
import PlayerAvatar from "../PlayerAvatar";
import Tooltip from "../Tooltip";
import Checkbox from "../ui/Checkbox";
import NextImageWithFallback from "../ui/NextImageWithFallback";
import RowItem from "../ui/RowItem";
import MatchButton from "./MatchButton";

interface PrematchSidebarProps {
  prematchPost: PrematchPost;
  meta: Map<string, MatchMeta>;
  matchDetails: DetailedMatch | null;
  selectedMatchState: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ];
  selectedRoundState: [number, React.Dispatch<React.SetStateAction<number>>];
  className?: string;
}

export default function PrematchSidebar({
  prematchPost,
  meta,
  matchDetails,
  selectedMatchState,
  selectedRoundState,
  className,
}: PrematchSidebarProps) {
  const [selectedMatch, setSelectedMatch] = selectedMatchState;
  const [selectedRound, setSelectedRound] = selectedRoundState;

  const winrate =
    prematchPost &&
    (prematchPost.teamstats.stats.total === 0
      ? 0
      : Math.round(
          (prematchPost.teamstats.stats.wins /
            prematchPost.teamstats.stats.total) *
            1000
        ) / 10);

  const mapName = prematchPost.map.split("_")[1] || prematchPost.map;

  return (
    <div className={`flex w-full flex-col ${className}`}>
      <div className="mb-6 inline-flex items-center gap-4">
        <NextImageWithFallback
          src={`/assets/map-icons/${prematchPost.map}.svg`}
          fallbackSrc="/assets/map-icons/unknown.svg"
          width="36"
          height="36"
          alt="Map logo"
        />
        <span className="text-xl capitalize">{mapName}</span>
      </div>
      <div className="mb-6 flex flex-col flex-wrap gap-2 rounded-md bg-dark-500 p-4">
        <h3 className="text-xl font-bold">Matches</h3>
        {prematchPost.matchIds.length > 0 ? (
          prematchPost.teamstats.matches.map((m, i) => {
            return (
              <MatchButton
                key={m.match_id}
                match={m}
                meta={meta.get(m.match_id)}
                isSelected={selectedMatch === m.match_id}
                setSelected={setSelectedMatch}
                i={i}
              />
            );
          })
        ) : (
          <p>No matches found.</p>
        )}
      </div>
      <div className="mb-6 rounded-md bg-dark-500 p-4">
        <h3 className="mb-2 text-xl font-bold">Premade</h3>
        <div className="flex w-full flex-col">
          {prematchPost.premade.map((p) => (
            <RowItem
              key={p.id}
              className="flex flex-row items-center gap-2 bg-transparent !px-0 py-1 hover:bg-transparent"
            >
              <PlayerAvatar player={p} size={30} />
              <span className="truncate">{p.nickname}</span>
            </RowItem>
          ))}
        </div>
        <ul className="list-disc pl-4">
          <li className="my-2">
            {prematchPost.teamstats.stats.total} match
            {prematchPost.teamstats.stats.total !== 1 && "es"}
          </li>
          <li>
            <span
              className={
                winrate && winrate >= 50 ? "text-green-500" : "text-red-600"
              }
            >
              {winrate}%
            </span>{" "}
            W/R
          </li>
        </ul>
      </div>

      <Checkbox
        isChecked={selectedRound === 0}
        setIsChecked={() => setSelectedRound((r) => (r === 0 ? 1 : 0))}
        label="First Half"
        className="mb-2 inline-flex items-center gap-2"
      />

      {matchDetails && (
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
      )}
    </div>
  );
}
