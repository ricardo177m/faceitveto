import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

import { CuratedMatch } from "@/types/curated-match";
import { formatDateTime } from "@/lib/utils";

import NextImageWithFallback from "./ui/NextImageWithFallback";

interface MatchHeaderProps {
  match: CuratedMatch;
}

export default function MatchHeader({ match }: MatchHeaderProps) {
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
            className={`h-3 w-3 rounded-full ${
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
          <p className="capitalize">{match.state.toString().toLowerCase()}</p>
        </div>
      </div>
      <div className="pb-2 text-sm">
        <span className="mx-2 inline-flex items-center gap-2">
          <Image
            src="/assets/elo.svg"
            alt="Elo icon"
            className="w-4"
            width={16}
            height={16}
          />
          <span className="mr-5">
            Match Ranking: {Math.round(match.matchRanking)} elo
          </span>
          {match.finishedAt && (
            <>
              <FaCalendarAlt className="text-dark-800" />
              <span>{formatDateTime(match.finishedAt)}</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
