import Image from "next/image";

import { CuratedMatch } from "@/types/curated-match";

interface MatchHeaderProps {
  match: CuratedMatch;
}

export default function MatchHeader({ match }: MatchHeaderProps) {
  return (
    <div className="flex flex-col px-4">
      <div className="text-3xl py-2">
        <span>{match.teams.faction1.name}</span>
        <span className="mx-2 text-dark-700"> / </span>
        <span>{match.teams.faction2.name}</span>
      </div>
      <div className="flex flex-row items-center gap-12 py-4 text-2xl">
        {match.finishedAt ? (
          <div className="inline-flex items-center gap-4">
            <Image
              src={`/assets/map-icons/${match.mapPicks[0].id}.svg`}
              width="40"
              height="40"
              alt="Map logo"
            />
            <span>{match.mapPicks[0].name}</span>
          </div>
        ) : null}
        <div className="inline-flex items-center gap-4">
          <span className="w-3 h-3 rounded-full bg-gray-600 /*blinking*/"></span>
          <p>Finished</p>
        </div>
      </div>
      <div className="text-sm pb-2">
        <span className="inline-flex items-center gap-2 mx-2">
          <img src="/assets/elo.svg" alt="Elo icon" className="w-4" />
          {match.matchRanking}
        </span>
      </div>
    </div>
  );
}
