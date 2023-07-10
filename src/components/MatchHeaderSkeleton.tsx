import Image from "next/image";

import Skeleton from "react-loading-skeleton";

export default function MatchHeaderSkeleton() {
  return (
    <div className="flex flex-col px-4">
      <div className="text-3xl py-2">
        <Skeleton className="w-full" />
      </div>
      <div className="flex flex-row flex-wrap items-center gap-4 sm:gap-12 py-4 text-2xl">
        <Skeleton containerClassName="flex-1" />
      </div>
      <div className="text-sm pb-2">
        <span className="inline-flex items-center gap-2 mx-2">
          <Image
            src="/assets/elo.svg"
            alt="Elo icon"
            className="w-4"
            width={16}
            height={16}
          />
          <Skeleton containerClassName="w-12" />
        </span>
      </div>
    </div>
  );
}
