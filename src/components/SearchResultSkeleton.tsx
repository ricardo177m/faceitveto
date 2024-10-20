import Skeleton from "react-loading-skeleton";

export default function SearchResultSkeleton({ key }: { key: number }) {
  return (
    <div
      key={key}
      className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-600"
    >
      <div className="my-1 w-full">
        <Skeleton baseColor="#424f64" highlightColor="#60769a" />
      </div>
    </div>
  );
}
