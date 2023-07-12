import PlayerHeaderSkeleton from "@/components/PlayerHeaderSkeleton";

export default function PlayerPageLoading() {
  return (
    <div className="mb-16 flex flex-col gap-8 px-4">
      <PlayerHeaderSkeleton />
    </div>
  );
}
