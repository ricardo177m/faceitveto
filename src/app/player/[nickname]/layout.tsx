import React from "react";

import { fetchPlayerByNickname } from "@/lib/player";
import CurrentMatchLink from "@/components/CurrentMatchLink";
import PlayerHeader from "@/components/Player/PlayerHeader";
import Search from "@/components/Search";
import Tabs from "@/components/Tabs";

interface LayoutProps {
  children: React.ReactNode;
  tabgroup: React.ReactNode;
  params: Promise<{
    nickname: string;
  }>;
}

export default async function Layout(props: LayoutProps) {
  const { children, tabgroup } = props;
  const params = await props.params;
  const { nickname } = params;

  const player = await fetchPlayerByNickname(nickname);

  if (!player) {
    return (
      <div className="mb-16 flex flex-col items-center justify-center gap-8 px-4">
        <h1 className="mt-8 text-center text-2xl font-bold text-white">
          Player not found.
        </h1>
        <Search className="w-full max-w-96" placeholder="Search for a player" />
      </div>
    );
  }

  const tabs = [
    { label: "Overview", href: `/player/${player.nickname}` },
    { label: "Stats", href: `/player/${player.nickname}/stats` },
    { label: "Teammates", href: `/player/${player.nickname}/teammates` },
  ];

  return (
    <div className="mx-auto mt-2 max-w-6xl">
      <div className="mb-16 flex flex-col gap-8 px-4">
        <PlayerHeader player={player} />
        <Tabs tabs={tabs} />
        <CurrentMatchLink player={player} />
        {tabgroup}
        {children}
      </div>
    </div>
  );
}
