import { Suspense } from "react";

import getServerSession from "@/lib/getServerSession";
import { fetchPlayerByNickname } from "@/lib/player";
import CurrentMatchLink from "@/components/CurrentMatchLink";
import PlayerLastMatches from "@/components/Player/PlayerLastMatches";
import PlayerLastMatchesSkeleton from "@/components/Player/PlayerLastMatchesSkeleton";
import Search from "@/components/Search";

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

  if (!player) return null;

  const self = !!session && player.id === session.id;

  return (
    <>
      <CurrentMatchLink player={player} />
      <Suspense
        fallback={<PlayerLastMatchesSkeleton player={player} self={self} />}
      >
        <PlayerLastMatches player={player} self={self} />
      </Suspense>
    </>
  );
}
