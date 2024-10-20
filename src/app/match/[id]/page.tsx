import { fetchDemocracy, fetchMatch } from "@/lib/match";
import Match from "@/components/Match";

interface MatchPageProps {
  params: {
    id: string;
  };
}

export default async function MatchPage({ params: { id } }: MatchPageProps) {
  const curatedMatch = await fetchMatch(id);
  const democracy =
    curatedMatch.state.toString() === "VOTING"
      ? await fetchDemocracy(id)
      : undefined;

  return <Match match={curatedMatch} democracy={democracy} />;
}
