import Link from "next/link";

import { Player } from "@/types/player";
import { fetchPlayerMatchesApi } from "@/lib/player";

import NextImageWithFallback from "./ui/NextImageWithFallback";

interface PlayerLastMatchesProps {
  player: Player;
}

export default async function PlayerLastMatches({
  player,
}: PlayerLastMatchesProps) {
  const matches = await fetchPlayerMatchesApi(player.id, 5);

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Your Latest Matches</h2>
      <div className="flex flex-col [&>a]:border-b [&>a]:border-b-gray-700 last:[&>a]:border-b-0">
        {matches.map((match) => {
          const isWin = match.i10 === "1";

          return (
            <Link
              key={match.matchId}
              href="/match/[id]"
              as={`/match/${match.matchId}`}
            >
              <div
                className={`border-l-2 ${
                  isWin ? "border-l-green-500" : "border-l-red-600"
                } flex flex-row bg-dark-400 px-2 transition-colors hover:bg-dark-500`}
              >
                <div className="my-auto ml-4">
                  <NextImageWithFallback
                    src={`/assets/map-icons/${match.i1}.svg`}
                    fallbackSrc="/assets/map-icons/unknown.svg"
                    width="36"
                    height="36"
                    alt="Map logo"
                  />
                </div>
                <div className="my-auto p-4 px-8">
                  <span>{match.i1}</span>
                </div>
                <div className="ml-auto p-4 text-gray-400">
                  <span>{match.i18}</span>
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
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
