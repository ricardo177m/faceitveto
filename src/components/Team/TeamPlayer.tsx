import { IoMdClose } from "react-icons/io";

import { Player } from "@/types/player";

import CountryFlag from "../CountryFlag";
import Level from "../Level";
import PlayerAvatar from "../PlayerAvatar";

interface TeamPlayerProps {
  player: Player;
  handleRemove: (playerid: string) => void;
}

export default function TeamPlayer({ player, handleRemove }: TeamPlayerProps) {
  const cs2 = player.games.cs2;
  return (
    <div className="relative flex w-full flex-col items-center gap-4 border-b-2 border-dark-700 bg-dark-400 px-4 py-10 transition-colors hover:bg-dark-500 md:w-1/5">
      <button
        onClick={() => handleRemove(player.id)}
        className="absolute right-2 top-2 p-1 text-lg text-dark-800 transition-colors hover:text-white"
      >
        <IoMdClose />
      </button>
      <PlayerAvatar player={player} size={96} />
      <div className="inline-flex w-full items-center justify-center gap-2">
        <span className="truncate font-bold">{player.nickname}</span>
        <CountryFlag country={player.country} />
      </div>
      <div className="inline-flex items-center gap-2 text-sm">
        <Level
          elo={cs2?.faceit_elo}
          level={cs2?.skill_level}
          className="h-6 w-6"
          size={6}
        />
        <span>{cs2?.faceit_elo}</span>
      </div>
    </div>
  );
}
