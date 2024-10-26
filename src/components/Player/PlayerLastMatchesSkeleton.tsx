import RowItemSkeleton from "../ui/RowItemSkeleton";

interface PlayerLastMatchesProps {
  player: {
    id: string;
    nickname: string;
  };
  self: boolean;
  size?: number;
}

export default function PlayerLastMatchesSkeleton({
  player,
  self,
  size = 5,
}: PlayerLastMatchesProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold">
        {self ? "Your" : player.nickname + "'s"} Latest Match
        {size > 1 ? "es" : ""}
      </h2>
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
