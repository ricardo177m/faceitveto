import Skeleton from "react-loading-skeleton";

import RowItemSkeleton from "../ui/RowItemSkeleton";

interface PlayerLastMatchesProps {
  size?: number;
}

export default function PlayerLastMatchesSkeleton({
  size = 5,
}: PlayerLastMatchesProps) {
  return (
    <section>
      <Skeleton className="text-2xl" />
      <div className="mt-4 flex flex-col [&>div]:border-b [&>div]:border-b-gray-700 last:[&>div]:border-b-0">
        {Array(size ?? 5)
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
