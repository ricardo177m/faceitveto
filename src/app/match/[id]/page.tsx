import { Metadata } from "next";

import { config } from "@/config/config";
import { NotFoundError } from "@/lib/exceptions";
import { fetchDemocracy, fetchMatch, fetchMatchStats } from "@/lib/match";
import Match from "@/components/Match/Match";

interface MatchPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MatchPage(props: MatchPageProps) {
  const params = await props.params;
  const { id } = params;

  try {
    const curatedMatch = await fetchMatch(id);
    const stats = await fetchMatchStats(id);
    const democracy = await fetchDemocracy(id);

    return <Match match={curatedMatch} democracy={democracy} stats={stats} />;
  } catch (error) {
    if (error instanceof NotFoundError) return <div>Match not found.</div>;
    throw error;
  }
}

export async function generateMetadata(
  props: MatchPageProps
): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;

  try {
    const curatedMatch = await fetchMatch(id);

    return {
      title: `${curatedMatch.teams.faction1.name} vs ${curatedMatch.teams.faction2.name} - ${config.title}`,
      description: config.description,
      keywords:
        "faceit, veto, match, stats, democracy, players, teams, faceit veto",
    };
  } catch (error) {
    if (error instanceof NotFoundError)
      return {
        title: "Match not found",
        description: config.description,
        keywords:
          "faceit, veto, match, stats, democracy, players, teams, faceit veto",
      };
    throw error;
  }
}
