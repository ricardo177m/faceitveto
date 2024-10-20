import Link from "next/link";
import { FaCrown } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

import { CuratedMap, CuratedPlayer } from "@/types/curated-match";
import { IntervalPlayerStats } from "@/types/curated-player-stats";
import { config } from "@/config/config";

import Level from "./Level";
import PlayerAvatar from "./PlayerAvatar";

interface MapsPlayerRowProps {
  player: CuratedPlayer;
  stats: IntervalPlayerStats | undefined;
  maps: CuratedMap[];
  captain: string;
}

export default function MapsPlayerRow({
  player,
  stats,
  maps,
  captain,
}: MapsPlayerRowProps) {
  return (
    <tr
      key={player.id}
      className="h-14 rounded-md border-t-2 border-dark-300 bg-dark-500"
    >
      <td
        className="inline-flex h-14 w-56 items-center gap-4 overflow-hidden text-ellipsis border-l-2 pl-4"
        style={{
          borderLeftColor: config.premadeColors[player.partyId] ?? "gray",
        }}
      >
        <PlayerAvatar player={player} />
        <Link
          href={`/player/[nickname]`}
          as={`/player/${player.nickname}`}
          className="inline-flex items-center gap-2 transition-colors hover:text-primary"
        >
          {player.nickname}
          {captain === player.id ? (
            <FaCrown className="text-yellow-500" />
          ) : null}
        </Link>
      </td>
      <td className="px-4">
        <Level level={player.level} elo={player.elo} />
      </td>
      {!stats ? (
        <td className="min-w-[3.2rem] px-2">
          <Skeleton />
        </td>
      ) : (
        <td
          className="min-w-[3.2rem] cursor-help px-2 text-center text-xs font-bold text-neutral-400"
          title={`${Math.round(
            (stats.overall.wins / stats.overall.matches) * 100
          )}% (${stats.overall.wins} win${
            stats.overall.wins !== 1 ? "s" : ""
          }) - ${stats.overall.kdr} K/D`}
        >
          {stats?.overall.matches}
        </td>
      )}
      {maps.map((map) => {
        if (!stats)
          return (
            <td
              key={map.id}
              className="min-w-[6.5rem] px-4 text-center font-bold"
            >
              <Skeleton />
            </td>
          );

        const mapStats = stats.maps[map.id];

        if (!mapStats) {
          return (
            <td
              key={map.id}
              className="min-w-[6.5rem] px-4 text-center font-bold"
            >
              <span className="mr-2 cursor-help text-red-600" title="0 wins">
                0%
              </span>
              <span
                className="cursor-help text-xs text-neutral-400"
                title="0 K/D"
              >
                0
              </span>
            </td>
          );
        }

        const winRate = Math.round((mapStats.wins / mapStats.matches) * 100);

        return (
          <td
            key={map.id}
            className="min-w-[6.5rem] px-4 text-center font-bold"
          >
            <span
              className={`${
                winRate < 50 ? "text-red-600" : "text-green-500"
              } mr-2 cursor-help`}
              title={`${mapStats.wins} win${mapStats.wins !== 1 ? "s" : ""}`}
            >
              {winRate}%
            </span>
            <span
              className="cursor-help text-xs text-neutral-400"
              title={`${mapStats.kdr} K/D`}
            >
              {mapStats.matches}
            </span>
          </td>
        );
      })}
    </tr>
  );
}
