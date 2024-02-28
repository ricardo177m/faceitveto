import { fetchMatch } from "@/lib/match";
import Match from "@/components/Match";

interface MatchPageProps {
  params: {
    id: string;
  };
}

export default async function MatchPage({ params: { id } }: MatchPageProps) {
  const curatedMatch = await fetchMatch(id);
  return <Match match={curatedMatch} />;
}
