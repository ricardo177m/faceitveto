"use client";

import { useRef, useState } from "react";

import { env } from "@/env";

import CountryFlag from "./CountryFlag";
import LevelElo from "./LevelElo";
import PlayerAvatar from "./PlayerAvatar";
import PrimaryButton from "./ui/PrimaryButton";
import RowItem from "./ui/RowItem";
import RowItemSkeleton from "./ui/RowItemSkeleton";

interface FinderProps {
  className?: string;
}

export default function Finder({ className }: FinderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PlayerListResult[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || !inputRef.current.value.length) return;
    setError(null);
    setIsLoading(true);

    const query = inputRef.current.value.split(/[\s,]+/);

    const url = new URL(`${env.NEXT_PUBLIC_API_URL}/find`);
    query.forEach((q) => url.searchParams.append("query[]", q));

    try {
      const data = await fetch(url).then((res) => res.json());
      setData(data);
      if (!data.length) setError("No results found.");
    } catch (error) {
      setError("Error.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-row gap-4">
        <input
          type="text"
          className={`w-full max-w-96 rounded-md bg-dark-600 px-4 py-1`}
          placeholder="URLs/Steam ID/Vanity ID"
          autoFocus
          ref={inputRef}
        />
        <PrimaryButton disabled={isLoading}>Find</PrimaryButton>
      </form>
      <div className="mt-8 flex flex-col gap-1">
        {isLoading ? (
          Array(3)
            .fill(1)
            .map((_, i) => <RowItemSkeleton key={i} />)
        ) : error ? (
          <p>{error}</p>
        ) : (
          data &&
          data.map((p) => {
            const cs2 = p.games.find((g) => g.game === "cs2");

            return (
              <RowItem
                key={p.id}
                href={`/player/${p.nickname}`}
                className="flex flex-row items-center gap-4 border-l-2 border-gray-600 px-4 py-2"
              >
                <PlayerAvatar player={p} size={40} />
                <span className="truncate">{p.nickname}</span>
                <CountryFlag country={p.country} className="ml-auto" />
                <LevelElo
                  level={cs2 ? cs2.skill_level : 0}
                  elo={cs2 ? cs2.elo : 0}
                />
              </RowItem>
            );
          })
        )}
      </div>
    </div>
  );
}
