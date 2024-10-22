import { fetchDemocracy, fetchMatch } from "@/lib/match";
import Match from "@/components/Match";

interface MatchPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MatchPage(props: MatchPageProps) {
  const params = await props.params;
  const { id } = params;

  const curatedMatch = await fetchMatch(id);
  const democracy =
    curatedMatch.state.toString() === "VOTING"
      ? await fetchDemocracy(id)
      : undefined;

  return <Match match={curatedMatch} democracy={democracy} />;
}
