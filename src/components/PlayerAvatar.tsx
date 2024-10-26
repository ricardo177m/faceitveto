import { config } from "@/config/config";
import defaultAvatar from "@/lib/defaultAvatar";
import toBase64 from "@/utils/toBase64";

import NextImageWithFallback from "./ui/NextImageWithFallback";

interface PlayerAvatarProps {
  player: {
    nickname: string;
    avatar?: string;
  };
  size?: number;
  className?: string;
}

export default function PlayerAvatar({
  player,
  size,
  className,
}: PlayerAvatarProps) {
  return (
    <NextImageWithFallback
      src={player.avatar || config.defaultAvatarAsset}
      fallbackSrc={config.defaultAvatarAsset}
      alt={`${player.nickname}'s avatar`}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(defaultAvatar())}`}
      width={size || 36}
      height={size || 36}
      className={`${className} aspect-square rounded-full border border-dark-700`}
      unoptimized={true}
      loading="lazy"
    />
  );
}
