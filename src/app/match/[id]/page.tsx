import Maps from "@/components/Maps";
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
      {curatedMatch.finishedAt ? <p>Finished</p> : <p>Ongoing</p>}
      <Maps />
    </div>
  );
}
