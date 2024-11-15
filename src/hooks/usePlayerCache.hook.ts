import { useCallback, useState } from "react";

import { env } from "@/env";

const usePlayerCache = () => {
  const [playerList, setList] = useState<Map<string, PlayerListResult>>(
    new Map()
  );

  const fetchPlayers = useCallback(async (ids: string[]) => {
    const url = new URL(`${env.NEXT_PUBLIC_API_URL}/list`);
    ids
      .filter((i) => i !== "" && !playerList.get(i))
      .forEach((id) => url.searchParams.append("playerid[]", id));

    const res = await fetch(url);
    const data = (await res.json()) as PlayerListResponse;
    setList((prev) => new Map([...prev, ...Object.entries(data)]));
    return data;
  }, []);

  return { playerList, fetchPlayers };
};

export default usePlayerCache;
