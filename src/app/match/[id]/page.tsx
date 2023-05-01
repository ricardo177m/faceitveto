import TeamMaps from "@/components/Maps";
import MatchHeader from "@/components/MatchHeader";
import { fetchMatch } from "@/lib/match";

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
      <div className="mx-4 my-4 pt-4 space-y-4 overflow-x-auto pb-4">
        <TeamMaps team={curatedMatch.teams.faction1} maps={curatedMatch.maps} />
        <TeamMaps team={curatedMatch.teams.faction2} maps={curatedMatch.maps} />
      </div>
    </div>
  );
}
