import { Suspense } from "react";
import { Metadata } from "next";

import { config } from "@/config/config";
import getServerSession from "@/lib/getServerSession";
import { fetchPlayerByNickname } from "@/lib/player";
import CurrentMatchLink from "@/components/CurrentMatchLink";
import PlayerHeader from "@/components/PlayerHeader";
import PlayerLastMatches from "@/components/PlayerLastMatches";
import PlayerLastMatchesSkeleton from "@/components/PlayerLastMatchesSkeleton";

interface PlayerPageProps {
  params: Promise<{
    nickname: string;
  }>;
}

export default async function PlayerPage(props: PlayerPageProps) {
  const params = await props.params;

  const { nickname } = params;

  const player = await fetchPlayerByNickname(nickname);
  const session = await getServerSession();

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
      <CurrentMatchLink player={player} />
      <Suspense
        fallback={
          <PlayerLastMatchesSkeleton
            player={player}
            self={!!session && player.id === session.id}
          />
        }
      >
        <PlayerLastMatches
          player={player}
          self={!!session && player.id === session.id}
        />
      </Suspense>
    </div>
  );
}

export async function generateMetadata(
  props: PlayerPageProps
): Promise<Metadata> {
  const params = await props.params;

  const { nickname } = params;

  return {
    title: nickname + " - " + config.title,
    description: config.description,
  };
}
