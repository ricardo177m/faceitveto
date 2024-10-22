import Skeleton from "react-loading-skeleton";

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
              <div
                className={`flex h-14 flex-row border-l-2 border-l-gray-600 bg-dark-400 px-2 transition-colors hover:bg-dark-500`}
              >
                <div className="mx-4 my-auto w-full">
                  <Skeleton />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
