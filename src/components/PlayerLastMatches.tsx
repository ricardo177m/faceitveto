import { fetchPlayerMatchesApi, fetchPlayerStatsApi } from "@/lib/player";
import { Player } from "@/types/player";

interface PlayerLastMatchesProps {
  player: Player;
}

export default async function PlayerLastMatches({
  player,
}: PlayerLastMatchesProps) {
  const matches = await fetchPlayerMatchesApi(player.id, 5);

  return (
    <section>
      <h2 className="text-2xl font-bold">Your Latest Matches</h2>
      <div>
        {matches.map((match) => (
          <div key={match.matchId}>
            <p>Win: {match.i10 === "1"}</p>
            <p>Map: {match.i1}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
