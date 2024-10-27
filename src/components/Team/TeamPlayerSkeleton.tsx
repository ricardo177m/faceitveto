import Skeleton from "react-loading-skeleton";

import PlayerAvatarSkeleton from "../PlayerAvatarSkeleton";

export default function TeamPlayerSkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-4 border-b-2 border-dark-700 bg-dark-400 px-4 py-10 transition-colors hover:bg-dark-500 md:w-1/5">
      <div className="h-24 w-24">
        <PlayerAvatarSkeleton />
      </div>
      <div className="mt-3 inline-flex w-full items-center justify-center gap-2">
        <div className="w-full">
          <Skeleton />
        </div>
      </div>
      <div className="inline-flex w-full items-center gap-2 text-sm">
        <div className="w-full">
          <Skeleton />
        </div>
      </div>
    </div>
  );
}
