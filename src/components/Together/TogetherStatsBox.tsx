interface TogetherStatsBoxProps {
  stats: TeamStatsData;
  title: string;
}

export default function TogetherStatsBox({
  stats,
  title,
}: TogetherStatsBoxProps) {
  const winrate = !stats.stats.total
    ? 0
    : Math.round((stats.stats.wins / stats.stats.total) * 1000) / 10;
  return (
    <div className="my-4 flex flex-col items-center justify-center rounded-md bg-dark-500 md:gap-4">
      <h2 className="pt-4 text-lg font-bold max-md:pb-4">{title}</h2>
      <div className="flex flex-col items-center justify-center md:flex-row">
        <div className="flex w-32 flex-col items-center gap-1 px-4 pb-4">
          <span className="text-lg font-bold">{stats.stats.total}</span>
          <span className="text-sm text-dark-900">Matches</span>
        </div>
        <div className="flex w-32 flex-col items-center gap-1 px-4 pb-4">
          <span className="text-lg font-bold">{stats.stats.wins}</span>
          <span className="text-sm text-dark-900">Wins</span>
        </div>
        <div className="flex w-32 flex-col items-center gap-1 px-4 pb-4">
          <span
            className={`${winrate >= 50 ? "text-green-500" : "text-red-600"} text-lg font-bold`}
          >
            {winrate}%
          </span>
          <span className="text-sm text-dark-900">Win Rate</span>
        </div>
      </div>
    </div>
  );
}
