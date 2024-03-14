import { Dispatch, SetStateAction } from "react";
import moment from "moment";
import { FaClock, FaExternalLinkAlt } from "react-icons/fa";

import { CuratedMatch } from "@/types/curated-match";
import { formatDateTime } from "@/lib/utils";
import Checkbox from "@/components/ui/Checkbox";

import Elo from "./icons/Elo";
import NextImageWithFallback from "./ui/NextImageWithFallback";

interface MatchHeaderProps {
  match: CuratedMatch;
  showMostRecent: boolean;
  setShowMostRecent: Dispatch<SetStateAction<boolean>>;
}

export default function MatchHeader({
  match,
  showMostRecent,
  setShowMostRecent,
}: MatchHeaderProps) {
  return (
    <div className="flex flex-col px-4">
      <div className="py-2 text-3xl">
        <span>{match.teams.faction1.name}</span>
        <span className="mx-2 text-dark-700"> / </span>
        <span>{match.teams.faction2.name}</span>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-4 py-4 text-2xl sm:gap-12">
        {match.mapPicks !== undefined ? (
          <div className="inline-flex items-center gap-4">
            <NextImageWithFallback
              src={`/assets/map-icons/${match.mapPicks?.[0].id}.svg`}
              fallbackSrc="/assets/map-icons/unknown.svg"
              width="40"
              height="40"
              alt="Map logo"
            />
            <span>{match.mapPicks?.[0].name}</span>
          </div>
        ) : null}
        <div className="inline-flex items-center gap-4">
          <span
            className={`size-3 rounded-full ${
              ["VOTING", "CONFIGURING"].includes(match.state.toString())
                ? "bg-yellow-400"
                : ["READY", "ONGOING"].includes(match.state.toString())
                  ? "bg-green-500"
                  : "bg-gray-600"
            } ${
              ["FINISHED", "CANCELED"].includes(match.state.toString())
                ? ""
                : "blinking"
            }`}
          ></span>
          <p className="mr-4 capitalize">
            {match.state.toString().toLowerCase()}
          </p>
          <a
            href={`https://www.faceit.com/en/cs2/room/${match.id}`}
            target="_blank"
            className="text-xs transition-colors hover:text-primary"
            title="Go to match room"
            rel="noreferrer"
          >
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
      <div className="pb-1 text-sm">
        <Checkbox
          isChecked={showMostRecent}
          setIsChecked={setShowMostRecent}
          label="Most Recent Matches"
          className="mx-2 inline-flex items-center gap-2"
        />
        <div className="mx-2 inline-flex items-center gap-2">
          <Elo className="w-4 fill-dark-800" />
          <span>Match Ranking: {Math.round(match.matchRanking)} elo</span>
        </div>
        {match.finishedAt && (
          <div
            title={formatDateTime(match.finishedAt)}
            className="mx-2 inline-flex items-center gap-2"
          >
            <FaClock className="text-dark-800" />
            <span>{moment(match.finishedAt).fromNow()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
