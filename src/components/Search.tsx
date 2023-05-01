"use client";

import { FormEventHandler, useState } from "react";

export default function Search() {
  const [search, setSearch] = useState<string>("");

  const inputEventHandler: FormEventHandler<HTMLInputElement> = (e) =>
    setSearch(e.currentTarget.value);

  const inputKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") goBtnHandler();
  };

  const goBtnHandler = () => {
    if (search.length == 0) return;
    console.log(search);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center bg-neutral-800 rounded-lg shadow-xl px-8 py-12 gap-6">
        <img src="/images/faceitveto.svg" alt="F-Veto Logo" />
        <div className="flex flex-col gap-2 min-w-max">
          <p className="text-gray-200 text-lg">Search for a player</p>
          <input
            type="text"
            className="bg-neutral-700 px-4 py-1 rounded-lg w-96"
            placeholder="Nickname"
            id="search"
            onInput={inputEventHandler}
            onKeyUp={inputKeyUpHandler}
          />
          <button
            className="w-auto p-1 rounded-lg font-bold transition-colors text-white bg-orange-600 hover:bg-orange-700 disabled:text-gray-400 disabled:bg-neutral-700"
            onClick={goBtnHandler}
            disabled={search.length == 0}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}
