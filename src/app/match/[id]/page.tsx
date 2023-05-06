import MatchHeader from "@/components/MatchHeader";
import PlayerStats from "@/components/PlayerStats";
import TeamMaps from "@/components/TeamMaps";
import TeamMapsSkeleton from "@/components/TeamMapsSkeleton";
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

      <Suspense
        fallback={
          <div className="mx-4 mt-2 mb-4 py-4 space-y-4 overflow-x-auto">
            <TeamMaps
              team={curatedMatch.teams.faction1}
              maps={curatedMatch.maps}
              playerStats={null}
            />
            <TeamMaps
              team={curatedMatch.teams.faction2}
              maps={curatedMatch.maps}
              playerStats={null}
            />
          </div>
        }
      >
        {/* https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error */}
        {/* @ts-expect-error Async Server Component */}
        <PlayerStats curatedMatch={curatedMatch} />
      </Suspense>
    </div>
  );
}
