import Skeleton from "react-loading-skeleton";

interface PlayerAvatarSkeletonProps {
  className?: string;
}

export default function PlayerAvatar({ className }: PlayerAvatarSkeletonProps) {
  return (
    <Skeleton
      className={`${className} aspect-square w-full rounded-full border border-dark-700 object-cover`}
    />
  );
}
