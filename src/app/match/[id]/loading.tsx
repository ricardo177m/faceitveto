import MatchHeaderLoading from "@/components/MatchHeaderLoading";
import TeamMapsLoading from "@/components/TeamMapsLoading";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MatchPageLoading() {
  return (
    <div>
      <SkeletonTheme baseColor="#24292e" highlightColor="#3f4448">
        <MatchHeaderLoading />
        <div className="mx-4 my-4 pt-4 space-y-4 overflow-x-auto pb-4">
          <TeamMapsLoading />
          <TeamMapsLoading />
        </div>
      </SkeletonTheme>
    </div>
  );
}
