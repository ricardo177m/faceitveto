import Link from "next/link";
import { FaCrown } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

import { config } from "@/config/config";

import LevelElo from "../LevelElo";
import PlayerAvatar from "../PlayerAvatar";
import Tooltip from "../Tooltip";

interface MapsPlayerRowProps {
  player: CuratedPlayer;
  stats: IntervalPlayerStats | undefined;
  maps: CuratedMap[];
  captain: string;
  drops: string[];
}

export default function MapsPlayerRow({
  player,
  stats,
  maps,
  captain,
  drops,
}: MapsPlayerRowProps) {
  const overallWinRate = stats
    ? Math.round((stats.overall.wins / stats.overall.matches) * 100)
    : 0;

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
          href={`/player/${player.nickname}`}
          className="inline-flex items-center gap-2 transition-colors hover:text-primary"
        >
          {player.nickname}
          {captain === player.id ? (
            <FaCrown className="text-yellow-500" />
          ) : null}
        </Link>
      </td>
      <td className="px-4 text-center">
        <LevelElo level={player.level} elo={player.elo} />
      </td>
      {!stats ? (
        <td className="min-w-[3.2rem] px-2">
          <Skeleton />
        </td>
      ) : (
        <td className="min-w-[3.2rem] px-2 text-center text-xs font-bold text-neutral-400">
          <Tooltip
            text={
              <>
                <span
                  className={`font-bold ${overallWinRate >= 50 ? "text-green-500" : "text-red-600"}`}
                >{`${overallWinRate}%`}</span>{" "}
                ({stats.overall.wins} win{stats.overall.wins !== 1 ? "s" : ""})
                | {stats.overall.kdr} K/D
              </>
            }
          >
            {stats?.overall.matches}
          </Tooltip>
        </td>
      )}
      {maps.map((map) => {
        if (!stats)
          return (
            <td
              key={map.id}
              className="min-w-[6.5rem] px-4 text-center font-bold transition-opacity"
            >
              <Skeleton />
            </td>
          );

        const mapStats = stats.maps[map.id];
        const drop = drops.find((m) => m === map.id);

        if (!mapStats) {
          return (
            <td
              key={map.id}
              className={`min-w-[6.5rem] px-4 text-center font-bold transition-opacity ${drop ? "opacity-30" : ""}`}
            >
              <Tooltip text="0 wins | 0 K/D" className="text-xs">
                <span className="mr-2 text-red-600">0%</span>
              </Tooltip>
              <span className="text-xs text-neutral-400">0</span>
            </td>
          );
        }

        const winRate = Math.round((mapStats.wins / mapStats.matches) * 100);

        return (
          <td
            key={map.id}
            className={`min-w-[6.5rem] px-4 text-center font-bold transition-opacity ${drop ? "opacity-30" : ""}`}
          >
            <span
              className={`${
                winRate < 50 ? "text-red-600" : "text-green-500"
              } mr-2`}
            >
              <Tooltip
                text={`${mapStats.wins} win${mapStats.wins !== 1 ? "s" : ""} | ${mapStats.kdr} K/D`}
                className="text-xs"
              >
                <span>{winRate}%</span>
              </Tooltip>
            </span>
            <span className="top-7 text-xs text-neutral-400">
              {mapStats.matches}
            </span>
          </td>
        );
      })}
    </tr>
  );
}
