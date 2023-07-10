import MatchHeader from "@/components/MatchHeader";
import PlayerStats from "@/components/PlayerStats";
import TeamMaps from "@/components/TeamMaps";
import { fetchMatch } from "@/lib/match";
import { Suspense } from "react";

interface MatchPageProps {
  params: {
    id: string;
  };
}

export default async function MatchPage({ params: { id } }: MatchPageProps) {
  const curatedMatch = await fetchMatch(id);

  return (
    <div>
      <MatchHeader match={curatedMatch} />

      {/* @ts-expect-error Async Server Component */}
      <PlayerStats curatedMatch={curatedMatch} />
    </div>
  );
}
