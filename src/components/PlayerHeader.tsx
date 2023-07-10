import Image from "next/image";

import { ImageWithFallback } from "./ui/ImageWithFallback";
import { Player } from "@/types/player";

interface PlayerHeaderProps {
  player: Player;
}

export default function PlayerHeader({ player }: PlayerHeaderProps) {
  const level = player.games.csgo ? player.games.csgo.skill_level : 0;

  return (
    <header>
      <div className="relative">
        <ImageWithFallback
          src={player.cover_image_url}
          fallbackSrc="/assets/default-cover.svg"
          alt="Player Cover Image"
          className="rounded-md border border-dark-700 object-cover w-full h-48 md:h-56"
        />
        <ImageWithFallback
          src={player.avatar}
          fallbackSrc="/assets/default-avatar.svg"
          alt="Player avatar"
          className="rounded-full border border-dark-700 aspect-square ml-6 md:ml-8 w-32 md:w-44 absolute bottom-4 md:bottom-8 transform translate-y-1/2"
        />
      </div>
      <div className="ml-44 md:ml-60 mt-4 inline-flex items-center gap-4">
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
