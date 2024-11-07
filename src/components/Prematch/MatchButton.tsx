import React from "react";
import { ImSpinner8 } from "react-icons/im";

import { DetailedMatch } from "@/types/detailed-match";
import { MatchAnalysis } from "@/types/prematch";

interface MatchButtonProps {
  match: DetailedMatch;
  analysis?: MatchAnalysis;
  i: number;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function MatchButton({
  match,
  analysis,
  isSelected,
  i,
  setSelected,
}: MatchButtonProps) {
  const isLoading = !analysis || !analysis.processed;
  return (
    <button
      className={`inline-flex items-center gap-3 border-l-2 border-l-gray-600 px-6 py-3 transition-colors ${isSelected ? "bg-dark-500" : isLoading ? "bg-dark-400 opacity-75" : "bg-dark-400 hover:bg-dark-500"}`}
      disabled={isLoading}
      onClick={() => setSelected(match.match_id)}
    >
      {isLoading && <ImSpinner8 className="h-6 animate-spin" />}
      Match {i + 1}
    </button>
  );
}
