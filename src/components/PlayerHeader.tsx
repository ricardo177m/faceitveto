import { FaExternalLinkAlt } from "react-icons/fa";

import { Player } from "@/types/player";

import CountryFlag from "./CountryFlag";
import Level from "./Level";
import PlayerAvatar from "./PlayerAvatar";
import NextImageWithFallback from "./ui/NextImageWithFallback";

interface PlayerHeaderProps {
  player: Player;
}

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  const cs2 =
    player.games && player.games.cs2
      ? {
          level: player.games.cs2.skill_level,
          elo: player.games.cs2.faceit_elo,
        }
      : {
          level: 0,
          elo: 0,
        };

  return (
    <header>
      <div className="relative">
        <NextImageWithFallback
          src={player.cover_image_url || "/assets/default-cover.svg"}
          fallbackSrc="/assets/default-cover.svg"
          alt="Player Cover Image"
          width={700}
          height={100}
          className="h-40 w-full rounded-md border border-dark-700 object-cover md:h-56"
        />
        <PlayerAvatar
          player={player}
          size={256}
          className="absolute bottom-4 ml-6 w-28 translate-y-1/2 md:bottom-8 md:ml-8 md:w-44"
        />
      </div>
      <div className="ml-40 mt-4 inline-flex flex-wrap items-center gap-4 md:ml-60">
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          {player.nickname}
        </h1>
        <CountryFlag country={player.country} />
        <Level level={cs2.level} elo={cs2.elo} className="h-7 min-w-8 md:h-8" />
        <a
          href={`https://www.faceit.com/en/players/${player.nickname}`}
          target="_blank"
          className="text-xs transition-colors hover:text-primary"
          title="Go to player page"
          rel="noreferrer"
        >
          <FaExternalLinkAlt />
        </a>
      </div>
    </header>
  );
}
