import React from "react";
import { ImSpinner8 } from "react-icons/im";

import Tooltip from "../Tooltip";

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
  const isLoading = !analysis || (!analysis.processed && !analysis.error);
  const isError = !!(analysis && analysis.error);
  return (
    <button
      className={`inline-flex items-center gap-3 border-l-2 border-l-gray-600 px-6 transition-colors ${
        isSelected
          ? "bg-dark-500"
          : isLoading
            ? "bg-dark-400 opacity-75"
            : isError
              ? "bg-dark-400"
              : "bg-dark-400 hover:bg-dark-500"
      }`}
      disabled={isLoading || isError}
      onClick={() => setSelected(match.match_id)}
    >
      {isLoading && !isError && <ImSpinner8 className="h-6 animate-spin" />}
      <span className="flex h-14 flex-col items-start justify-center">
        <span>Match {i + 1}</span>
        <Tooltip text={isError && analysis.error} className="top-7 opacity-100">
          <span className="text-sm text-gray-400">
            {(isLoading || isError) && analysis?.progress}
          </span>
        </Tooltip>
      </span>
    </button>
  );
}
