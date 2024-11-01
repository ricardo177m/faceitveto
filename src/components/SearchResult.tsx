import { useRouter } from "next/navigation";

import { PlayerSearch } from "@/types/player-search-result";

import CountryFlag from "./CountryFlag";
import Level from "./Level";
import PlayerAvatar from "./PlayerAvatar";

interface SearchResultProps {
  player: PlayerSearch;
  onClick?: (player: PlayerSearch) => void;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchResult({
  player,
  onClick,
  setQuery,
}: SearchResultProps) {
  const { push } = useRouter();

  const defaultClickHandler = () => push(`/player/${player.nickname}`);
  const cs2level = player.games.find((g) => g.name === "cs2")?.skill_level;

  const handleClick = () => {
    setQuery("");
    if (onClick) onClick(player);
    else defaultClickHandler();
  };

  return (
    <button
      className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-600"
      onClick={handleClick}
    >
      <PlayerAvatar player={player} size={34} />
      <span className="truncate">{player.nickname}</span>
      <CountryFlag country={player.country} className="ml-auto" />
      <Level level={cs2level} className="size-7" />
    </button>
  );
}
