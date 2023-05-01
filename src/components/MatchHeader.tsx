import { CuratedMatch } from "@/types/curated-match";

interface MatchHeaderProps {
  match: CuratedMatch;
}

export default function MatchHeader({ match }: MatchHeaderProps) {
  return (
    <div className="w-full">
      MatchHeader: {match.teams.faction1.name} vs {match.teams.faction2.name}
    </div>
  );
}
