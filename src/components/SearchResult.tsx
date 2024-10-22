"use client";

import { useRouter } from "next/navigation";

import { PlayerSearch } from "@/types/player-search-result";

import CountryFlag from "./CountryFlag";
import Level from "./Level";
import PlayerAvatar from "./PlayerAvatar";

interface SearchResultProps {
  player: PlayerSearch;
}

export default function SearchResult({ player }: SearchResultProps) {
  const router = useRouter();

  const cs2level = player.games.find((g) => g.name === "cs2")?.skill_level;

  return (
    <button
      className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-600"
      onClick={() => router.push(`/player/${player.nickname}`)}
    >
      <PlayerAvatar player={player} size={34} />
      <span className="truncate">{player.nickname}</span>
      <CountryFlag country={player.country} className="ml-auto" />
      <Level level={cs2level} className="h-[1.6rem]" />
    </button>
  );
}
