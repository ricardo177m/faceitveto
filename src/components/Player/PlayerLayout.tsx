import { fetchPlayerByNickname } from "@/lib/player";

import Search from "../Search";
import Tabs from "../Tabs";
import PlayerHeader from "./PlayerHeader";

interface PlayerLayoutProps {
  nickname: string;
  children: React.ReactNode;
}

export default async function PlayerLayout({
  nickname,
  children,
}: PlayerLayoutProps) {
  const player = await fetchPlayerByNickname(nickname); // fetch result is memoized

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
    <>
      <PlayerHeader player={player} />
      <Tabs tabs={tabs} />
      {children}
    </>
  );
}
