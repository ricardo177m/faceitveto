"use client";

import { FormEventHandler, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";

import { useSession } from "@/hooks";
import { env } from "@/env.mjs";

export default function Search() {
  const router = useRouter();
  const session = useSession();

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
    if (search.length == 0 || loading) return;
    setLoading(true);

    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/nickname/${search}`);
      const data = await res.json();

      if (res.status !== 200) {
        setError(data.error);
        setLoading(false);
        throw new Error(data.error);
      }

      router.push(`/player/${search}`);
      setError(null);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      searchInputRef.current?.focus();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.user !== null && searchInputRef.current!.value.length === 0) {
      searchInputRef.current!.value = session.user.nickname;
      setSearch(session.user.nickname);
      goBtnRef.current?.focus();
    }
  }, [session]);

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
          <input
            type="text"
            className="w-96 rounded-lg bg-dark-600 px-4 py-1"
            placeholder="Nickname"
            id="search"
            onInput={inputEventHandler}
            onKeyUp={inputKeyUpHandler}
            ref={searchInputRef}
          />
          <button
            className="flex w-auto justify-center rounded-lg bg-orange-600 p-1 font-bold text-white transition-colors hover:bg-orange-700 disabled:bg-dark-600 disabled:text-gray-400"
            onClick={goBtnHandler}
            disabled={search.length == 0}
            ref={goBtnRef}
          >
            {loading ? (
              <span>
                <ImSpinner8 className="h-6 animate-spin" />
              </span>
            ) : (
              <span>Go</span>
            )}
          </button>
          {error !== null && !loading ? (
            <p className="text-center font-bold text-red-600">Error: {error}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
