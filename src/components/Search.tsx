"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useSWR from "swr";

import { PlayerSearchResult } from "@/types/player-search-result";
import { env } from "@/env.mjs";

import SearchResult from "./SearchResult";
import SearchResultSkeleton from "./SearchResultSkeleton";

const minQueryLength = 2;

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const [hidden, setHidden] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const fetcher = (url: RequestInfo | URL) => {
    if (query.length < minQueryLength) return;
    return fetch(url).then((res) => res.json());
  };

  const { data, isLoading } = useSWR(
    `${env.NEXT_PUBLIC_API_URL}/search/${query}`,
    fetcher,
    { keepPreviousData: true }
  );

  const searchres: PlayerSearchResult | null =
    data && !!query.length ? data : null;

  const handleClick = useCallback((e: MouseEvent) => {
    setHidden(e.target !== inputRef.current);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHidden(false);
    setQuery(e.target.value);
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  });

  return (
    <div className="my-32 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 rounded-lg bg-dark-500 px-8 py-12 shadow-xl">
        <Image
          src="/images/faceitveto.svg"
          alt="F-Veto Logo"
          width={300}
          height={42}
          priority
        />
        <div className="flex min-w-max flex-col gap-2">
          <p className="text-lg text-gray-200">Search for a player</p>
          <div className="relative">
            <input
              type="text"
              className="w-96 rounded-md bg-dark-600 px-4 py-1"
              placeholder="Nickname"
              autoFocus
              ref={inputRef}
              onChange={handleInput}
              onFocus={() => setHidden(false)}
            />
            {query.length >= minQueryLength && searchres ? (
              <div
                className="absolute mt-1 w-96 rounded-md bg-gray-700 px-4 py-2 text-center shadow-xl"
                hidden={hidden}
              >
                {isLoading ? (
                  Array(3)
                    .fill(1)
                    .map((_, i) => <SearchResultSkeleton key={i} />)
                ) : searchres.total_count > 0 ? (
                  <>
                    {searchres.results.map((p) => (
                      <SearchResult key={p.id} player={p} />
                    ))}
                    <span className="text-xs text-dark-900">
                      {searchres.total_count} players found
                    </span>
                  </>
                ) : (
                  <p className="">No results found.</p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
