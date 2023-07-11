import Image from "next/image";

import NextImageWithFallback from "./ui/NextImageWithFallback";
import defaultAvatar from "@/lib/default-avatar";
import toBase64 from "@/services/toBase64";
import { Player } from "@/types/player";

interface PlayerHeaderProps {
  player: Player;
}

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  const level = player.games.csgo ? player.games.csgo.skill_level : 0;

  return (
    <header>
      <div className="relative">
        <NextImageWithFallback
          src={player.cover_image_url}
          fallbackSrc="/assets/default-cover.svg"
          alt="Player Cover Image"
          width={700}
          height={100}
          className="rounded-md border border-dark-700 object-cover w-full h-40 md:h-56"
        />
        <NextImageWithFallback
          src={player.avatar}
          fallbackSrc="/assets/default-avatar.svg"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(defaultAvatar())}`}
          alt={`${player.nickname}'s avatar`}
          width={256}
          height={256}
          className="rounded-full border border-dark-700 aspect-square ml-6 md:ml-8 w-28 md:w-44 absolute bottom-4 md:bottom-8 transform translate-y-1/2"
        />
      </div>
      <div className="ml-40 md:ml-60 mt-4 inline-flex items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {player.nickname}
        </h1>
        <Image
          src={`/assets/faceit-levels/${level}.svg`}
          alt={`Level ${level}`}
          className="min-w-[2rem] h-7 md:h-8"
          width={16}
          height={16}
        />
      </div>
    </header>
  );
}
