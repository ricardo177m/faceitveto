import React, { Suspense } from "react";
import { Metadata } from "next";

import { config } from "@/config/config";
import getServerSession from "@/lib/getServerSession";
import { fetchPlayerByNickname } from "@/lib/player";
import CurrentMatchLink from "@/components/CurrentMatchLink";
import PlayerLastMatches from "@/components/Player/PlayerLastMatches";
import PlayerLastMatchesSkeleton from "@/components/Player/PlayerLastMatchesSkeleton";

interface PageProps {
  params: Promise<{
    nickname: string;
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { nickname } = params;

  const player = await fetchPlayerByNickname(nickname);
  if (!player) return null;

  const session = await getServerSession();
  const self = !!session && player.id === session.id;

  return (
    <Suspense fallback={<PlayerLastMatchesSkeleton />}>
      <CurrentMatchLink player={player} />
      <PlayerLastMatches player={player} self={self} />
    </Suspense>
  );
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { nickname } = params;

  return {
    title: nickname + " - " + config.title,
    description: config.description,
    keywords: "faceit, player, stats, matches, veto, faceit veto",
  };
}
