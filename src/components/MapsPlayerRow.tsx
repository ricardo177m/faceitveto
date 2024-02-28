import Image from "next/image";
import Link from "next/link";
import { FaCrown } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

import { CuratedMap, CuratedPlayer } from "@/types/curated-match";
import { IntervalPlayerStats } from "@/types/curated-player-stats";
import { config } from "@/config/config";
import NextImageWithFallback from "@/components/ui/NextImageWithFallback";

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
        <NextImageWithFallback
          src={player.avatar}
          fallbackSrc="/assets/default-avatar.svg"
          alt={`${player.nickname}'s avatar`}
          width={36}
          height={36}
          className="aspect-square rounded-full border border-dark-700"
          unoptimized={true}
          loading="lazy"
        />
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
        <Image
          src={`/assets/faceit-levels/${player.level}.svg`}
          alt={`Level ${player.level}`}
          title={`${player.elo} elo`}
          width={16}
          height={16}
          className="h-8 min-w-[2rem]"
        />
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
