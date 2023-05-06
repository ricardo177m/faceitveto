import MatchHeaderSkeleton from "@/components/MatchHeaderSkeleton";
import TeamMapsSkeleton from "@/components/TeamMapsSkeleton";

export default function MatchPageLoading() {
  return (
    <div>
      <MatchHeaderSkeleton />
      <div className="mx-4 my-4 pt-4 space-y-4 overflow-x-auto pb-4">
        <TeamMapsSkeleton />
        <TeamMapsSkeleton />
      </div>
    </div>
  );
}
