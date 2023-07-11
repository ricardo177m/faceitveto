import { Metadata } from "next";

import CurrentMatchLink from "@/components/CurrentMatchLink";
import PlayerHeader from "@/components/PlayerHeader";
import PlayerLastMatches from "@/components/PlayerLastMatches";
import PlayerLastMatchesSkeleton from "@/components/PlayerLastMatchesSkeleton";
import { config } from "@/config/config";
import { fetchPlayerByNicknameApi } from "@/lib/player";
import { Suspense } from "react";

interface PlayerPageProps {
  params: {
    nickname: string;
  };
}

async function PlayerPage({ params: { nickname } }: PlayerPageProps) {
  const player = await fetchPlayerByNicknameApi(nickname);

  if (!player) {
    return (
      <div className="px-4 flex flex-col justify-center gap-8 mb-16">
        <h1 className="text-2xl font-bold text-center text-white">
          Player not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="px-4 flex flex-col gap-8 mb-16">
      <PlayerHeader player={player} />

      {/* @ts-expect-error Async Server Component */}
      <CurrentMatchLink player={player} />

      {/* <section>
        <h1>Some cool stats</h1>
      </section>
      <section>
        <h1>Teammates</h1>
      </section> */}

      <Suspense fallback={<PlayerLastMatchesSkeleton />}>
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
