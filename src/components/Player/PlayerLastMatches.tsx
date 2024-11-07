import moment from "moment";

import { fetchPlayerMatches } from "@/lib/player";

import MapIcon from "../MapIcon";
import RowItem from "../ui/RowItem";

interface PlayerLastMatchesProps {
  player: {
    id: string;
    nickname: string;
  };
  self: boolean;
  size?: number;
}

export default async function PlayerLastMatches({
  player,
  self,
  size = 5,
}: PlayerLastMatchesProps) {
  const matches = await fetchPlayerMatches(player.id, size);

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">
        {self ? "Your" : player.nickname + "'s"} Latest Match
        {size > 1 ? "es" : ""}
      </h2>
      <div className="flex flex-col [&>a]:border-b [&>a]:border-b-gray-700 last:[&>a]:border-b-0">
        {matches && !matches.length ? (
          <p>No matches to display.</p>
        ) : (
          matches.map((match) => {
            const isWin = match.i10 === "1";

            const roundsWon = match.c5;
            const rawScore = match.i18.split(" ");
            if (rawScore[2] === roundsWon) rawScore.reverse();
            const score = rawScore.join(" ");

            const mapName = match.i1.split("_")[1] || match.i1;

            return (
              <RowItem
                key={match.matchId}
                href={`/match/${match.matchId}`}
                className={`border-l-2 ${isWin ? "border-l-green-500" : "border-l-red-600"}`}
              >
                <div className="my-auto ml-4">
                  <MapIcon mapId={match.i1} />
                </div>
                <div className="my-auto p-4 px-8">
                  <span className="capitalize">{mapName}</span>
                </div>
                <div className="my-auto ml-auto px-4 text-dark-800 max-md:hidden">
                  <span>{moment(match.created_at).fromNow()}</span>
                </div>
                <div className="p-4 text-gray-400 max-md:ml-auto">
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
    </section>
  );
}
