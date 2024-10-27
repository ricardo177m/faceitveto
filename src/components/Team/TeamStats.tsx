import { DetailedMatch } from "@/types/detailed-match";
import { Player } from "@/types/player";
import { TeamStatsData } from "@/types/team-stats";

import MapIcon from "../MapIcon";
import RowItem from "../ui/RowItem";

interface TeamStatsProps {
  stats: TeamStatsData;
}

export default function TeamStats({ stats }: TeamStatsProps) {
  const winrate = !stats.stats.total
    ? 0
    : Math.round((stats.stats.wins / stats.stats.total) * 1000) / 10;
  return (
    <section>
      <div className="my-4 flex flex-col items-center justify-center md:flex-row md:gap-4">
        <div className="flex w-32 flex-col items-center gap-1 p-4">
          <span className="text-lg font-bold">{stats.stats.total}</span>
          <span className="text-sm text-dark-900">Matches</span>
        </div>
        <div className="flex w-32 flex-col items-center gap-1 p-4">
          <span className="text-lg font-bold">{stats.stats.wins}</span>
          <span className="text-sm text-dark-900">Wins</span>
        </div>
        <div className="flex w-32 flex-col items-center gap-1 p-4">
          <span
            className={`${winrate >= 50 ? "text-green-500" : "text-red-600"} text-lg font-bold`}
          >
            {winrate}%
          </span>
          <span className="text-sm text-dark-900">Win Rate</span>
        </div>
      </div>
      <h2 className="mb-4 text-2xl font-bold">Latest Matches</h2>
      <div className="mb-8 flex flex-col justify-center gap-4 md:flex-row">
        <div className="flex w-full flex-col [&>a]:border-b [&>a]:border-b-gray-700 last:[&>a]:border-b-0">
          {stats && stats.matches.length === 0 ? (
            <p>No matches to display.</p>
          ) : (
            stats.matches.slice(0, 5).map((match) => {
              const { isWin } = match.stats;

              const roundsWon = match.stats.roundsWon;
              const rawScore = match.stats.score.split(" ");
              if (rawScore[2] === roundsWon) rawScore.reverse();
              const score = rawScore.join(" ");

              const mapName = match.stats.map.split("_")[1] || match.stats.map;

              return (
                <RowItem
                  key={match.match_id}
                  href="/match/[id]"
                  as={`/match/${match.match_id}`}
                  className={`border-l-2 ${isWin ? "border-l-green-500" : "border-l-red-600"}`}
                >
                  <div className="my-auto ml-4">
                    <MapIcon mapId={match.stats.map} />
                  </div>
                  <div className="my-auto p-4 px-8">
                    <span className="capitalize">{mapName}</span>
                  </div>
                  <div className="ml-auto p-4 text-gray-400">
                    <span>{score}</span>
                  </div>
                  {/* <div className="p-4 my-auto ml-auto text-center">
                  <span
                    className={`font-bold ${
                      isWin ? "text-green-500" : "text-red-600"
                    }`}
                  >
                    {isWin ? "Win" : "Loss"}
                  </span>
                </div> */}
                </RowItem>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
