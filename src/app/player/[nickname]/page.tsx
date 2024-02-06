import { Suspense } from "react";
import { Metadata } from "next";

import { config } from "@/config/config";
import { fetchPlayerByNickname } from "@/lib/player";
import CurrentMatchLink from "@/components/CurrentMatchLink";
import PlayerHeader from "@/components/PlayerHeader";
import PlayerLastMatches from "@/components/PlayerLastMatches";
import PlayerLastMatchesSkeleton from "@/components/PlayerLastMatchesSkeleton";

interface PlayerPageProps {
  params: {
    nickname: string;
  };
}

async function PlayerPage({ params: { nickname } }: PlayerPageProps) {
  const player = await fetchPlayerByNickname(nickname);

  if (!player) {
    return (
      <div className="mb-16 flex flex-col justify-center gap-8 px-4">
        <h1 className="text-center text-2xl font-bold text-white">
          Player not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="mb-16 flex flex-col gap-8 px-4">
      <PlayerHeader player={player} />

      {/* @ts-expect-error Async Server Component */}
      <CurrentMatchLink player={player} />

      {/* <section>
        <h1>Some cool stats</h1>
      </section>
      <section>
        <h1>Teammates</h1>
      </section> */}

      <Suspense fallback={<PlayerLastMatchesSkeleton player={player} />}>
        {/* @ts-expect-error Async Server Component */}
        <PlayerLastMatches player={player} />
      </Suspense>
    </div>
  );
}

export function generateMetadata({
  params: { nickname },
}: PlayerPageProps): Metadata {
  return {
    title: nickname + " - " + config.title,
    description: config.description,
  };
}

export default PlayerPage;
