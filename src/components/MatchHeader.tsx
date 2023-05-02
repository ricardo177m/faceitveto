import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { siteConfig } from "@/config/site";
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
        {match.mapPicks !== undefined ? (
          <div className="inline-flex items-center gap-4">
            <ImageWithFallback
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
            className={`w-3 h-3 rounded-full ${
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
      <div className="text-sm pb-2">
        <span className="inline-flex items-center gap-2 mx-2">
          <img src="/assets/elo.svg" alt="Elo icon" className="w-4" />
          {match.matchRanking}
        </span>
      </div>
    </div>
  );
}
