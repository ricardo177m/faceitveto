import { useState } from "react";
import moment from "moment";

import MapIcon from "../MapIcon";
import Checkbox from "../ui/Checkbox";
import RowItem from "../ui/RowItem";
import TogetherStatsBox from "./TogetherStatsBox";

interface TogetherStatsProps {
  stats: TogetherStatsData;
}

export default function TogetherStats({ stats }: TogetherStatsProps) {
  const [isEnemies, setIsEnemies] = useState<boolean>(false);

  const matches = isEnemies
    ? stats.asOpponents.matches
    : stats.asTeammates.matches;

  return (
    <section>
      <div className="mb-2 flex flex-col justify-around md:flex-row">
        <TogetherStatsBox stats={stats.asTeammates} title="As Teammates" />
        <TogetherStatsBox stats={stats.asOpponents} title="As Opponents" />
      </div>
      <div className="mb-2 flex flex-row justify-between">
        <h2 className="mb-2 text-2xl font-bold">Latest Matches</h2>
        <Checkbox
          isChecked={isEnemies}
          setIsChecked={(a) => setIsEnemies(a)}
          label="Enemies"
          className="inline-flex items-center gap-2"
        />
      </div>
      <div className="mb-8 flex flex-col justify-center gap-4 md:flex-row">
        <div className="flex w-full flex-col [&>a]:border-b [&>a]:border-b-gray-700 last:[&>a]:border-b-0">
          {stats && matches.length === 0 ? (
            <p>No matches to display.</p>
          ) : (
            matches.slice(0, 5).map((match) => {
              const { isWin } = match.stats;

              const roundsWon = match.stats.roundsWon;
              const rawScore = match.stats.score.split(" ");
              if (rawScore[2] === roundsWon) rawScore.reverse();
              const score = rawScore.join(" ");

              const mapName = match.stats.map.split("_")[1] || match.stats.map;

              return (
                <RowItem
                  key={match.match_id}
                  href={`/match/${match.match_id}`}
                  className={`border-l-2 ${isWin ? "border-l-green-500" : "border-l-red-600"}`}
                >
                  <div className="my-auto ml-4">
                    <MapIcon mapId={match.stats.map} />
                  </div>
                  <div className="my-auto p-4 px-8">
                    <span className="capitalize">{mapName}</span>
                  </div>
                  <div className="my-auto ml-auto px-4 text-dark-800 max-md:hidden">
                    <span>{moment(match.finished_at * 1000).fromNow()}</span>
                  </div>
                  <div className="p-4 text-gray-400 max-md:ml-auto">
                    <span>{score}</span>
                  </div>
                </RowItem>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
