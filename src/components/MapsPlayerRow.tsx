import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { CuratedMap, CuratedPlayer } from "@/types/curated-match";
import { CuratedPlayerStats } from "@/types/curated-player-stats";

interface MapsPlayerRowProps {
  player: CuratedPlayer;
  stats: CuratedPlayerStats | undefined;
  maps: CuratedMap[];
}

export default function MapsPlayerRow({
  player,
  stats,
  maps,
}: MapsPlayerRowProps) {
  if (!stats) return null;

  return (
    <tr
      key={player.id}
      className="h-16 bg-dark-500 border-t-2 border-dark-300 rounded-md"
    >
      <td className="inline-flex items-center gap-4 w-56 h-16 pl-4 overflow-hidden text-ellipsis">
        <ImageWithFallback
          src={player.avatar}
          fallbackSrc="/assets/default-avatar.svg"
          alt="Player avatar"
          width="36"
          height="36"
          className="rounded-full border border-dark-700 aspect-square"
        />
        {player.nickname}
      </td>
      <td className="px-4">
        <img
          src={`/assets/faceit-levels/${player.level}.svg`}
          alt={`Level ${player.level}`}
          className="min-w-[2rem] h-8"
        />
      </td>
      {maps.map((map) => {
        const mapStats = stats.maps[map.id];

        if (!mapStats) {
          return (
            <td
              key={map.id}
              className="px-4 min-w-[6.5rem] font-bold text-center"
            >
              <span className="text-red-600 mr-2">0%</span>
              <span className="text-neutral-400 text-xs">0</span>
            </td>
          );
        }

        const winRate = Math.round((mapStats.wins / mapStats.matches) * 100);

        return (
          <td
            key={map.id}
            className="px-4 min-w-[6.5rem] font-bold text-center"
          >
            <span
              className={`${
                winRate < 50 ? "text-red-600" : "text-green-500"
              } mr-2`}
              title={`${mapStats.wins} wins`}
            >
              {winRate}%
            </span>
            <span className="text-neutral-400 text-xs">{mapStats.matches}</span>
          </td>
        );
      })}
    </tr>
  );
}
