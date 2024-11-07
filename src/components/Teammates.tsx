"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { env } from "@/env";

import CountryFlag from "./CountryFlag";
import LevelElo from "./LevelElo";
import PlayerAvatar from "./PlayerAvatar";
import Pagination from "./table/Pagination";
import Checkbox from "./ui/Checkbox";

interface TeammatesProps {
  player: Player | null;
  self: boolean;
}

const limit = 10;

export default function Teammates({ player, self }: TeammatesProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [teammatesData, setTeammatesData] = useState<TeammatesData | null>(
    null
  );
  const [playerList, setPlayerList] = useState<Map<string, PlayerListResult>>(
    new Map()
  );
  const [isEnemies, setIsEnemies] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const selectedData = (
    isEnemies ? teammatesData?.enemies : teammatesData?.teammates
  )?.slice(offset, offset + limit);

  const total =
    (isEnemies ? teammatesData?.enemies : teammatesData?.teammates)?.length ??
    0;

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

  useEffect(() => {
    if (!player) return;
    fetchTeammates(player.id);
  }, [player]);

  if (!player) return null;

  const LoadingPlayer = (key: string) => (
    <tr
      key={key}
      className="bg-dark-400 px-4 transition-colors hover:bg-dark-500"
    >
      <td className="px-4 py-5">
        <Skeleton height={22} />
      </td>
    </tr>
  );

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">
        {self ? "Your" : player.nickname + "'s"} Teammates
      </h2>
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
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
          </div>
        </div>
      </div>
      <div className="mx-auto mt-4 overflow-x-auto scrollbar scrollbar-track-transparent scrollbar-thumb-slate-600 scrollbar-thumb-rounded-xl scrollbar-h-1">
        {isLoading ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4">
                  <Skeleton />
                </th>
              </tr>
            </thead>
            <tbody className="border-l-2 border-l-dark-700 [&>tr]:border-b [&>tr]:border-b-gray-700 last:[&>tr]:border-b-0">
              {Array(limit)
                .fill(0)
                .map((_, i) => LoadingPlayer(`${i}`))}
            </tbody>
          </table>
        ) : selectedData ? (
          <table className="table-auto">
            <thead>
              <tr>
                <th className="w-full min-w-64 pl-6 pr-4 text-left">Player</th>
                <th className="min-w-24 px-4">Level</th>
                <th className="min-w-20 px-4">Matches</th>
                <th className="min-w-20 px-4">Wins</th>
                <th className="min-w-24 px-4">Winrate</th>
              </tr>
            </thead>
            <tbody className="border-l-2 border-l-dark-700 [&>tr]:border-b [&>tr]:border-b-gray-700 last:[&>tr]:border-b-0">
              {selectedData.map((p) => {
                const player = playerList.get(p.playerId);
                if (!player)
                  return LoadingPlayer(
                    `${p.playerId}-${isEnemies ? "enemies" : "teammates"}`
                  );
                const cs2 = player.games.find((g) => g.game === "cs2");
                const winrate = Math.round((p.wins / p.matches) * 100);

                return (
                  <tr
                    key={`${p.playerId}-${isEnemies ? "enemies" : "teammates"}`}
                    className="bg-dark-400 transition-colors hover:bg-dark-500"
                  >
                    <td>
                      <Link
                        href={`/player/${player.nickname}`}
                        key={p.playerId}
                        className="flex flex-row items-center gap-4 px-6 py-3"
                      >
                        <PlayerAvatar player={player} size={40} />
                        <span className="truncate">{player.nickname}</span>
                        <CountryFlag country={player.country} />
                      </Link>
                    </td>
                    <td className="text-center">
                      <LevelElo
                        level={cs2 ? cs2.skill_level : 0}
                        elo={cs2 ? cs2.elo : 0}
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
        ) : (
          <p>No data to show.</p>
        )}
      </div>
      <Pagination
        limit={limit}
        offset={offset}
        setOffset={setOffset}
        total={total}
        className="mt-2 text-center"
      />
    </section>
  );
}
