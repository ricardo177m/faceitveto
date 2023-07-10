import MatchHeaderSkeleton from "@/components/MatchHeaderSkeleton";
import TeamMapsSkeleton from "@/components/TeamMapsSkeleton";

export default function MatchPageLoading() {
  return (
    <div>
      <MatchHeaderSkeleton />
      <div className="mx-4 mt-3 mb-4 py-4 space-y-4 overflow-x-auto scrollbar scrollbar-track-transparent scrollbar-thumb-slate-600 scrollbar-thumb-rounded-xl scrollbar-h-1">
        <TeamMapsSkeleton />
        <TeamMapsSkeleton />
      </div>
    </div>
  );
}
