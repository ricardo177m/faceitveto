import Skeleton from "react-loading-skeleton";

import PlayerAvatarSkeleton from "../PlayerAvatarSkeleton";

export default function PlayerHeaderSkeleton() {
  return (
    <header>
      <div className="relative">
        <Skeleton className="h-40 w-full rounded-md border border-dark-700 object-cover md:h-56" />
        <PlayerAvatarSkeleton className="absolute bottom-11 ml-6 aspect-square translate-y-1/2 rounded-full border border-dark-700 max-md:max-w-28 md:bottom-14 md:ml-8 md:w-44" />
      </div>
      <div className="ml-40 mt-4 inline-flex items-center gap-4 md:ml-60">
        <Skeleton className="text-2xl font-bold text-white md:text-3xl" />
      </div>
    </header>
  );
}
