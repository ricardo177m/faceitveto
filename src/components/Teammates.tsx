"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { PlayerListResponse, PlayerListResult } from "@/types/player-list";
import { PlayerSearch } from "@/types/player-search-result";
import { TeammatesData } from "@/types/teammates";
import { env } from "@/env.mjs";

import CountryFlag from "./CountryFlag";
import Level from "./Level";
import PlayerAvatar from "./PlayerAvatar";
import Search from "./Search";
import Pagination from "./table/Pagination";
import Checkbox from "./ui/Checkbox";
import RowItemSkeleton from "./ui/RowItemSkeleton";

interface TeammatesProps {
  className?: string;
}

const limit = 10;

export default function Teammates({ className }: TeammatesProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [teammatesData, setTeammatesData] = useState<TeammatesData | null>(
    null
  );
  const [playerList, setPlayerList] = useState<Map<string, PlayerListResult>>(
    new Map()
  );
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerSearch | null>(
    null
  );
  const [isEnemies, setIsEnemies] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const selectedData = (
    isEnemies ? teammatesData?.enemies : teammatesData?.teammates
  )?.slice(offset, offset + limit);

  const total =
    (isEnemies ? teammatesData?.enemies : teammatesData?.teammates)?.length ??
    0;

  const handleClick = (player: PlayerSearch) => {
    setIsLoading(true);
    setOffset(0);
    setSelectedPlayer(player);
    fetchTeammates(player.id);
  };

  const fetchTeammates = async (playerid: string) => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/teammates/${playerid}`);
    const data = (await res.json()) as TeammatesData;
    setTeammatesData(data);
  };

  const fetchPlayerList = async (list: string[]) => {
    if (!teammatesData) return;
    setIsLoading(true);
    const url = new URL(`${env.NEXT_PUBLIC_API_URL}/list`);
    list.forEach((p) => url.searchParams.append("playerid[]", p));
    const listres = await fetch(url);
    const listdata = (await listres.json()) as PlayerListResponse;
    const newlist = new Map([...playerList, ...Object.entries(listdata)]);

    // remove from teammates any players that were not found
    if (Object.keys(listdata).length !== list.length) {
      const newteammates = teammatesData.teammates.filter(
        (p) => listdata[p.playerId] !== undefined || newlist.has(p.playerId)
      );
      const newenemies = teammatesData.enemies.filter(
        (p) => listdata[p.playerId] !== undefined || newlist.has(p.playerId)
      );
      setTeammatesData({ teammates: newteammates, enemies: newenemies });
    }

    setPlayerList(newlist);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!selectedData) return;

    // check if all players have been fetched
    const allPlayersFetched = selectedData?.every((p) =>
      playerList.has(p.playerId)
    );
    if (allPlayersFetched) return setIsLoading(false);

    const missingPlayers = selectedData
      .map((p) => p.playerId)
      .filter((p) => !playerList.has(p));
    fetchPlayerList(missingPlayers);
  }, [selectedData, fetchPlayerList]);

  return (
    <div className={className}>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <Search onClick={handleClick} className="w-full max-w-96" />
        <div>
          {selectedPlayer && (
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <Checkbox
                isChecked={isEnemies}
                setIsChecked={(a) => {
                  setOffset(0);
                  setIsEnemies(a);
                }}
                label="Enemies"
                className="inline-flex items-center gap-2"
              />
              <div className="inline-flex items-center justify-center gap-4">
                <PlayerAvatar
                  player={selectedPlayer}
                  key={selectedPlayer.id}
                  size={40}
                />
                <span>{selectedPlayer.nickname}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="mt-4 flex flex-col gap-1">
          {Array(limit)
            .fill(1)
            .map((_, i) => (
              <RowItemSkeleton key={i} />
            ))}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        teammatesData &&
        (selectedData ? (
          <>
            <div className="mx-auto mt-4 overflow-x-auto scrollbar scrollbar-track-transparent scrollbar-thumb-slate-600 scrollbar-thumb-rounded-xl scrollbar-h-1">
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="w-full min-w-64 pl-6 pr-4 text-left">
                      Player
                    </th>
                    <th className="min-w-16 px-4">Level</th>
                    <th className="min-w-20 px-4">Matches</th>
                    <th className="min-w-20 px-4">Wins</th>
                    <th className="min-w-24 px-4">Winrate</th>
                  </tr>
                </thead>
                <tbody className="border-l-2 border-l-dark-700 [&>tr]:border-b [&>tr]:border-b-gray-700 last:[&>tr]:border-b-0">
                  {selectedData.map((p) => {
                    const player = playerList.get(p.playerId);
                    if (!player) return null;
                    const cs2 = player.games.find((g) => g.game === "cs2");
                    const winrate = Math.round((p.wins / p.matches) * 100);

                    return (
                      <tr
                        key={`${p.playerId}-${isEnemies ? "enemies" : "teammates"}`}
                        className="bg-dark-400 transition-colors hover:bg-dark-500"
                      >
                        <td>
                          <Link
                            href={"/player/[nickname]"}
                            as={`/player/${player.nickname}`}
                            key={p.playerId}
                            className="flex flex-row items-center gap-4 px-6 py-3"
                          >
                            <PlayerAvatar player={player} size={40} />
                            <span className="truncate">{player.nickname}</span>
                            <CountryFlag country={player.country} />
                          </Link>
                        </td>
                        <td>
                          <Level
                            level={cs2 ? cs2.skill_level : 0}
                            elo={cs2 ? cs2.elo : 0}
                            className="mx-auto size-8"
                          />
                        </td>
                        <td className="text-center">
                          <span className="my-auto">{p.matches}</span>
                        </td>
                        <td className="text-center">
                          <span className="my-auto">{p.wins}</span>
                        </td>
                        <td className="pl-4 pr-6 text-center">
                          <span
                            className={`${winrate < 50 ? "text-red-600" : "text-green-500"} my-auto`}
                          >
                            {winrate}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination
              limit={limit}
              offset={offset}
              setOffset={setOffset}
              total={total}
              className="mt-2 text-center"
            />
          </>
        ) : (
          <p>No data to show.</p>
        ))
      )}
    </div>
  );
}
