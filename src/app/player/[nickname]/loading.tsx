import PlayerHeaderSkeleton from "@/components/PlayerHeaderSkeleton";

export default function PlayerPageLoading() {
  return (
    <div className="px-4 flex flex-col gap-8 mb-16">
      <PlayerHeaderSkeleton />
    </div>
  );
}
