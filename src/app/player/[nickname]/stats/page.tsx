import React from "react";
import { Metadata } from "next";

import { config } from "@/config/config";
import { fetchSkillGroups } from "@/lib/cs2cfg";
import getServerSession from "@/lib/getServerSession";
import { fetchPlayerByNickname } from "@/lib/player";
import PlayerEloProgression from "@/components/Player/PlayerElo";
import PlayerMaps from "@/components/Player/PlayerMaps";

interface PlayerPageProps {
  params: Promise<{
    nickname: string;
  }>;
}

export default async function page(props: PlayerPageProps) {
  const params = await props.params;
  const { nickname } = params;

  const player = await fetchPlayerByNickname(nickname); // fetch is memoized
  const skillGroups = await fetchSkillGroups();
  const session = await getServerSession();

  if (!player) return null;

  const self = !!session && player.id === session.id;

  return (
    <>
      <PlayerEloProgression player={player} skillGroups={skillGroups} />
      <PlayerMaps player={player} self={self} />
    </>
  );
}

export async function generateMetadata(
  props: PlayerPageProps
): Promise<Metadata> {
  const params = await props.params;
  const { nickname } = params;

  return {
    title: `${nickname}'s Stats - ${config.title}`,
    description: `View your teammates' stats and matches on ${config.title}.`,
    keywords: "faceit, teammates, team, stats, matches, veto, faceit veto",
  };
}
