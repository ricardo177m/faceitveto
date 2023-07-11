"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import getSession from "@/lib/getSession";
import { fetchPlayerByNickname, fetchPlayerState } from "@/lib/player";
import { Player } from "@/types/player";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { ImSpinner8 } from "react-icons/im";

export default function Search() {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const goBtnRef = useRef<HTMLButtonElement>(null);

  const inputEventHandler: FormEventHandler<HTMLInputElement> = () =>
    setSearch(searchInputRef.current?.value as string);

  const inputKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") goBtnHandler();
  };

  const goBtnHandler = async () => {
    console.log(search);

    if (search.length == 0 || loading) return;
    setLoading(true);

    try {
      const player: Player = await fetchPlayerByNickname(search);
      const state = await fetchPlayerState(player.id);

      if (state !== null) {
        router.push(`/match/${state}`);
        setError(null);
      } else throw new Error("player is not in a match");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      searchInputRef.current?.focus();
      setLoading(false);
    }
  };

  const fetchSession = async () => {
    const session = await getSession();
    if (session) {
      searchInputRef.current!.value = session.nickname;
      setSearch(session.nickname);
      goBtnRef.current?.focus();
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <div className="flex items-center justify-center my-32">
      <div className="flex flex-col items-center bg-dark-500 rounded-lg shadow-xl px-8 py-12 gap-6">
        <Image
          src="/images/faceitveto.svg"
          alt="F-Veto Logo"
          width={300}
          height={42}
          priority
        />
        <div className="flex flex-col gap-2 min-w-max">
          <p className="text-gray-200 text-lg">Search for a player</p>
          <input
            type="text"
            className="bg-dark-600 px-4 py-1 rounded-lg w-96"
            placeholder="Nickname"
            id="search"
            onInput={inputEventHandler}
            onKeyUp={inputKeyUpHandler}
            ref={searchInputRef}
          />
          <button
            className="w-auto flex justify-center p-1 rounded-lg font-bold transition-colors text-white bg-orange-600 hover:bg-orange-700 disabled:text-gray-400 disabled:bg-dark-600"
            onClick={goBtnHandler}
            disabled={search.length == 0}
            ref={goBtnRef}
          >
            {loading ? (
              <span>
                <ImSpinner8 className="animate-spin h-6" />
              </span>
            ) : (
              <span>Go</span>
            )}
          </button>
          {error !== null && !loading ? (
            <p className="text-center text-red-600 font-bold">Error: {error}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
