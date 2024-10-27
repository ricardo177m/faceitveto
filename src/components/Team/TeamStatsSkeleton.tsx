import Skeleton from "react-loading-skeleton";

import RowItemSkeleton from "../ui/RowItemSkeleton";

export default function TeamStatsSkeleton() {
  return (
    <section>
      <div className="my-4 flex flex-col items-center justify-center md:flex-row md:gap-4">
        <div className="w-full">
          <Skeleton />
        </div>
      </div>
      <div className="mb-6">
        <Skeleton />
      </div>
      <div className="mb-8 flex flex-col justify-center gap-4 md:flex-row">
        <div className="flex w-full flex-col [&>div]:border-b [&>div]:border-b-gray-700 last:[&>div]:border-b-0">
          {Array(5)
            .fill(1)
            .map((_, i) => (
              <RowItemSkeleton key={i} />
            ))}
        </div>
      </div>
    </section>
  );
}
