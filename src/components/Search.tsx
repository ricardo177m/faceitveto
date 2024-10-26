"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";

import { PlayerSearchResult } from "@/types/player-search-result";
import { env } from "@/env.mjs";

import SearchResult from "./SearchResult";
import SearchResultSkeleton from "./SearchResultSkeleton";

const minQueryLength = 2;

interface SearchProps {
  className?: string;
  placeholder?: string;
}

export default function Search({ className, placeholder }: SearchProps) {
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
    <div className={`${className} relative`}>
      <input
        type="text"
        className="w-full max-w-96 rounded-md bg-dark-600 px-4 py-1"
        placeholder={placeholder || "Nickname"}
        autoFocus
        ref={inputRef}
        onChange={handleInput}
        onFocus={() => setHidden(false)}
      />
      {query.length >= minQueryLength ? (
        <div
          className="absolute mt-1 w-full max-w-96 rounded-md bg-gray-700 px-4 py-2 text-center shadow-xl"
          hidden={hidden}
        >
          {isLoading ? (
            Array(3)
              .fill(1)
              .map((_, i) => <SearchResultSkeleton key={i} />)
          ) : searchres!.total_count > 0 ? (
            <>
              {searchres!.results.map((p) => (
                <SearchResult key={p.id} player={p} />
              ))}
              <span className="text-xs text-dark-900">
                {searchres!.total_count} player
                {searchres!.total_count !== 1 && "s"} found
              </span>
            </>
          ) : (
            <p className="">No results found.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
