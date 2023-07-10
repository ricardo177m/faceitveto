import Image from "next/image";

import NextImageWithFallback from "./ui/NextImageWithFallback";
import { siteConfig } from "@/config/site";
import defaultAvatar from "@/lib/default-avatar";
import toBase64 from "@/services/toBase64";
import { CuratedMap, CuratedPlayer } from "@/types/curated-match";
import { CuratedPlayerStats } from "@/types/curated-player-stats";
import { FaCrown } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

interface MapsPlayerRowProps {
  player: CuratedPlayer;
  stats: CuratedPlayerStats | undefined;
  maps: CuratedMap[];
  captain: string;
}

export default function MapsPlayerRow({
  player,
  stats,
  maps,
  captain,
}: MapsPlayerRowProps) {
  const avatar = defaultAvatar();

  return (
    <tr
      key={player.id}
      className="h-14 bg-dark-500 border-t-2 border-dark-300 rounded-md"
    >
      <td
        className="inline-flex items-center gap-4 w-56 h-14 pl-4 overflow-hidden text-ellipsis border-l-2"
        style={{
          borderLeftColor: siteConfig.premadeColors[player.partyId] ?? "gray",
        }}
      >
        <NextImageWithFallback
          src={player.avatar}
          fallbackSrc="/assets/default-avatar.svg"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(avatar)}`}
          alt={`${player.nickname}'s avatar`}
          width={36}
          height={36}
          className="rounded-full border border-dark-700 aspect-square"
        />
        <span className="inline-flex items-center gap-2">
          {player.nickname}
          {captain === player.id ? (
            <FaCrown className="text-yellow-500" />
          ) : null}
        </span>
      </td>
      <td className="px-4">
        <Image
          src={`/assets/faceit-levels/${player.level}.svg`}
          alt={`Level ${player.level}`}
          width={16}
          height={16}
          className="min-w-[2rem] h-8"
        />
      </td>
      {maps.map((map) => {
        if (!stats)
          return (
            <td
              key={map.id}
              className="px-4 min-w-[6.5rem] font-bold text-center"
            >
              <Skeleton />
            </td>
          );

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
