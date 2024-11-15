import { config } from "@/config/config";
import MatchHeaderSkeleton from "@/components/Match/MatchHeaderSkeleton";
import TeamMapsSkeleton from "@/components/Match/TeamMapsSkeleton";

export default function MatchPageLoading() {
  return (
    <div>
      <MatchHeaderSkeleton />
      <div className="mb-4 mt-3 space-y-4 overflow-x-auto py-4 scrollbar scrollbar-track-transparent scrollbar-thumb-slate-600 scrollbar-thumb-rounded-xl scrollbar-h-1">
        <TeamMapsSkeleton />
        <TeamMapsSkeleton />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Match - " + config.title,
  description: config.description,
};
