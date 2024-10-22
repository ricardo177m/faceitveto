import Image from "next/image";
import Skeleton from "react-loading-skeleton";

export default function MatchHeaderSkeleton() {
  return (
    <div className="flex flex-col px-4">
      <div className="py-2 text-3xl">
        <Skeleton className="w-full" />
      </div>
      <div className="flex flex-row flex-wrap items-center gap-4 py-4 text-2xl sm:gap-12">
        <Skeleton containerClassName="flex-1" />
      </div>
      <div className="pb-2 text-sm">
        <span className="mx-2 inline-flex items-center gap-2">
          <Skeleton containerClassName="w-12" />
        </span>
      </div>
    </div>
  );
}
