"use client";

import { useCallback, useEffect, useState } from "react";

import { useSession } from "@/hooks";
import { env } from "@/env";

import Search from "../Search";
import Team from "../Team/Team";
import TeamStatsSkeleton from "../Team/TeamStatsSkeleton";
import PrimaryButton from "../ui/PrimaryButton";
import TogetherStats from "./TogetherStats";

interface TogetherProps {
  className?: string;
}

export default function HaveWeMet({ className }: TogetherProps) {
  const [team, setTeam] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPlayer, setIsLoadingPlayer] = useState(true);
  const [matches, setMatches] = useState<TogetherStatsData | null>(null);

  const session = useSession();

  const handleClick = (player: PlayerSearch) => fetchPlayer(player.id);

  const fetchPlayer = useCallback(
    async (playerid: string) => {
      if (team.length >= 2) return;
      if (team.find((player) => player.id === playerid)) return;
      setIsLoadingPlayer(true);
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/player/${playerid}`);
      const data = await res.json();
      setTeam([...team, data]);
      setIsLoadingPlayer(false);
    },
    [team]
  );

  const handleSubmit = async () => {
    if (isLoading || isLoadingPlayer || team.length !== 2) return;
    setIsLoading(true);
    const url = new URL(`${env.NEXT_PUBLIC_API_URL}/together`);
    team.forEach((player) => url.searchParams.append("playerid[]", player.id));

    const res = await fetch(url);
    const data = await res.json();
    setMatches(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!session.user) return setIsLoadingPlayer(false);
    fetchPlayer(session.user.id);
  }, [session.user]);

  return (
    <div className={className}>
      <div className="flex flex-row gap-4">
        <Search onClick={handleClick} className="w-full max-w-96" />
        <PrimaryButton
          disabled={isLoading || isLoadingPlayer || team.length !== 2}
          onClick={handleSubmit}
        >
          Go
        </PrimaryButton>
      </div>
      <Team
        players={team}
        isLoadingPlayer={isLoadingPlayer}
        team={team}
        setTeam={setTeam}
      />
      {isLoading && <TeamStatsSkeleton />}
      {!isLoading && matches && <TogetherStats stats={matches} />}
    </div>
  );
}
