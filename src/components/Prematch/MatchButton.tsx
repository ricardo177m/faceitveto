import React from "react";
import { GrStatusCritical, GrStatusGood } from "react-icons/gr";
import { ImSpinner8 } from "react-icons/im";

import Tooltip from "../Tooltip";

interface MatchButtonProps {
  match: DetailedMatch;
  meta?: MatchMeta;
  i: number;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function MatchButton({
  match,
  meta,
  isSelected,
  i,
  setSelected,
}: MatchButtonProps) {
  const isLoading = !meta || (!meta.processed && !meta.error);
  const isError = !!(meta && meta.error);
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-md px-2 ${
        (isLoading || isError) && "text-dark-900"
      } ${isSelected && "bg-dark-600"}`}
      disabled={isLoading || isError}
      onClick={() => setSelected(match.match_id)}
    >
      {isLoading && !isError && <ImSpinner8 className="h-6 animate-spin" />}
      {!isLoading &&
        (isError ? (
          <GrStatusCritical className="h-6 text-red-500" />
        ) : (
          <GrStatusGood className="h-6" />
        ))}
      <Tooltip text={isError && meta.error} className="top-7 opacity-100">
        <span className="text-sm">
          {isLoading || isError ? meta?.progress : `Match ${i + 1}`}
        </span>
      </Tooltip>
    </button>
  );
}
