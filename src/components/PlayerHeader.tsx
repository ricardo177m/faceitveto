import { FaExternalLinkAlt } from "react-icons/fa";

import { Player } from "@/types/player";
import defaultAvatar from "@/lib/default-avatar";
import toBase64 from "@/services/toBase64";

import Level from "./Level";
import NextImageWithFallback from "./ui/NextImageWithFallback";

interface PlayerHeaderProps {
  player: Player;
}

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  const level = player.games.cs2 ? player.games.cs2.skill_level : 0;

  return (
    <header>
      <div className="relative">
        <NextImageWithFallback
          src={player.cover_image_url}
          fallbackSrc="/assets/default-cover.svg"
          alt="Player Cover Image"
          width={700}
          height={100}
          className="h-40 w-full rounded-md border border-dark-700 object-cover md:h-56"
        />
        <NextImageWithFallback
          src={player.avatar}
          fallbackSrc="/assets/default-avatar.svg"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(defaultAvatar())}`}
          alt={`${player.nickname}'s avatar`}
          width={256}
          height={256}
          className="absolute bottom-4 ml-6 aspect-square w-28 translate-y-1/2 rounded-full border border-dark-700 md:bottom-8 md:ml-8 md:w-44"
        />
      </div>
      <div className="ml-40 mt-4 inline-flex items-center gap-4 md:ml-60">
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          {player.nickname}
        </h1>
        <Level
          level={level}
          elo={player.games.cs2?.faceit_elo}
          className="h-7 min-w-[2rem] md:h-8"
        />
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
