import Skeleton from "react-loading-skeleton";

export default function PlayerHeaderSkeleton() {
  return (
    <header>
      <div className="relative">
        <Skeleton className="rounded-md border border-dark-700 object-cover w-full h-40 md:h-56" />
        <Skeleton className="rounded-full border border-dark-700 aspect-square ml-6 md:ml-8 w-28 md:w-44 absolute bottom-4 md:bottom-8 transform translate-y-1/2" />
      </div>
      <div className="ml-40 md:ml-60 mt-4 inline-flex items-center gap-4">
        <Skeleton className="text-2xl md:text-3xl font-bold text-white" />
      </div>
    </header>
  );
}
