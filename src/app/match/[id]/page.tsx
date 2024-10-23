import { Metadata } from "next";

import { config } from "@/config/config";
import { fetchDemocracy, fetchMatch, fetchMatchStats } from "@/lib/match";
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
  const stats = await fetchMatchStats(id);
  const democracy = await fetchDemocracy(id);

  return <Match match={curatedMatch} democracy={democracy} stats={stats} />;
}

export async function generateMetadata(
  props: MatchPageProps
): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;

  const curatedMatch = await fetchMatch(id);

  return {
    title: `${curatedMatch.teams.faction1.name} vs ${curatedMatch.teams.faction2.name} - ${config.title}`,
    description: config.description,
  };
}
