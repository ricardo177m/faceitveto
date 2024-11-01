import React from "react";
import { Metadata } from "next";

import { config } from "@/config/config";
import getServerSession from "@/lib/getServerSession";
import { fetchPlayerByNickname } from "@/lib/player";
import Teammates from "@/components/Teammates";

interface PlayerPageProps {
  params: Promise<{
    nickname: string;
  }>;
}

export default async function page(props: PlayerPageProps) {
  const params = await props.params;
  const { nickname } = params;

  const player = await fetchPlayerByNickname(nickname); // fetch is memoized
  const session = await getServerSession();

  if (!player) return null;

  const self = !!session && player.id === session.id;

  return <Teammates player={player} self={self} />;
}

export async function generateMetadata(
  props: PlayerPageProps
): Promise<Metadata> {
  const params = await props.params;
  const { nickname } = params;

  return {
    title: `${nickname}'s Teammates - ${config.title}`,
    description: `View your teammates' stats and matches on ${config.title}.`,
    keywords: "faceit, teammates, team, stats, matches, veto, faceit veto",
  };
}
