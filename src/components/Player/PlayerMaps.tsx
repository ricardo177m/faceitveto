"use client";

import { useCallback, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import { CuratedPlayerStats } from "@/types/curated-player-stats";
import { config } from "@/config/config";
import { useLocalStorage } from "@/hooks";
import { env } from "@/env.mjs";

import MapIcon from "../MapIcon";
import Checkbox from "../ui/Checkbox";

interface PlayerMapsProps {
  player: {
    id: string;
    nickname: string;
  };
  self: boolean;
}

export default function PlayerMaps({ player, self }: PlayerMapsProps) {
  const [playerStats, setPlayerStats] = useState<CuratedPlayerStats | null>(
    null
  );

  const [showMostRecent, setShowMostRecent] = useLocalStorage<boolean>(
    config.localStorage.showMostRecent,
    false
  );

  const fetchStats = useCallback(async () => {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/player/${player.id}/stats`,
      { next: { revalidate: 60 } }
    );
    setPlayerStats(await res.json());
  }, [player.id]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const data =
    playerStats &&
    (showMostRecent ? playerStats.mostRecent : playerStats.total);

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">
        {self ? "Your" : player.nickname + "'s"} Map Statistics
      </h2>
      {data && !Object.keys(data.maps).length ? (
        <p>No data to show.</p>
      ) : data ? (
        <>
          <Checkbox
            isChecked={showMostRecent}
            setIsChecked={setShowMostRecent}
            label="Most Recent Matches"
            className="mb-2 inline-flex items-center gap-2"
          />
          <div className="mx-auto overflow-x-auto scrollbar scrollbar-track-transparent scrollbar-thumb-slate-600 scrollbar-thumb-rounded-xl scrollbar-h-1">
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="w-full min-w-40 pl-6 pr-4 text-left">Map</th>
                  <th className="min-w-28 px-4">Matches</th>
                  <th className="min-w-24 px-4">Winrate</th>
                  <th className="min-w-24 pl-4 pr-6">K/D</th>
                </tr>
              </thead>

              <tbody className="[&>tr]:border-b [&>tr]:border-b-gray-700 last:[&>tr]:border-b-0">
                {Object.entries(data.maps)
                  .sort((a, b) => b[1].matches - a[1].matches)
                  .map(([map, stats]) => {
                    const winrate = Math.round(
                      (stats.wins / stats.matches) * 100
                    );

                    return (
                      <tr
                        key={map}
                        className="bg-dark-400 transition-colors hover:bg-dark-500"
                      >
                        <td className="flex flex-row gap-4 px-6 py-3">
                          <MapIcon mapId={map} />
                          <span className="my-auto capitalize">
                            {map.split("_")[1] || map}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="my-auto">{stats.matches}</span>
                        </td>
                        <td className="text-center">
                          <span
                            className={`${winrate < 50 ? "text-red-600" : "text-green-500"} my-auto`}
                          >
                            {winrate}%
                          </span>
                        </td>
                        <td className="pl-4 pr-6 text-center">
                          <span className="my-auto">{stats.kdr}</span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto overflow-x-auto scrollbar scrollbar-track-transparent scrollbar-thumb-slate-600 scrollbar-thumb-rounded-xl scrollbar-h-1">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="w-full min-w-40 pl-6 pr-4">
                    <Skeleton />
                  </th>
                </tr>
              </thead>
              <tbody className="[&>tr]:border-b [&>tr]:border-b-gray-700 last:[&>tr]:border-b-0">
                {Array(7)
                  .fill(1)
                  .map((_, i) => (
                    <tr
                      key={i}
                      className="bg-dark-400 transition-colors hover:bg-dark-500"
                    >
                      <td className="px-6 py-4">
                        <Skeleton height={20} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
