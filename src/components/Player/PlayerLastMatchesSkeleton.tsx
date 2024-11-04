import Skeleton from "react-loading-skeleton";

import RowItemSkeleton from "../ui/RowItemSkeleton";

export default function PlayerLastMatchesSkeleton() {
  return (
    <section>
      <Skeleton className="text-2xl" />
      <div className="mt-4 flex flex-col [&>div]:border-b [&>div]:border-b-gray-700 last:[&>div]:border-b-0">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <RowItemSkeleton />
            </div>
          ))}
      </div>
    </section>
  );
}
