import NextImageWithFallback from "./ui/NextImageWithFallback";

interface PlayerAvatarProps {
  player: {
    nickname: string;
    avatar?: string;
  };
  size?: number;
}

export default function PlayerAvatar({ player, size }: PlayerAvatarProps) {
  return (
    <NextImageWithFallback
      src={player.avatar as string}
      fallbackSrc="/assets/default-avatar.svg"
      alt={`${player.nickname}'s avatar`}
      width={size || 36}
      height={size || 36}
      className="aspect-square rounded-full border border-dark-700"
      unoptimized={true}
      loading="lazy"
    />
  );
}
