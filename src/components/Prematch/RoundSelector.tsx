import React from "react";
import { FaRotate } from "react-icons/fa6";

interface RoundSelectorProps {
  meta: MatchMeta;
  selectedRoundState: ReactState<number>;
  coreIds: string[];
  className?: string;
}

export default function RoundSelector({
  meta,
  selectedRoundState,
  coreIds,
  className,
}: RoundSelectorProps) {
  const [selectedRound, setSelectedRound] = selectedRoundState;

  const round = meta.rounds[selectedRound];

  const roundButton = (r: RoundMeta, index: number) => (
    <button
      key={r.round}
      onClick={() => setSelectedRound(meta.rounds.indexOf(r))}
      className={`aspect-square h-8 rounded-md border-slate-500 text-center ${
        round && round.round === r.round ? "border-2" : "border"
      } ${r.teams.CT.includes(coreIds[0]) ? "bg-blue-600/30" : "bg-yellow-600/30"}`}
    >
      {r.round}
    </button>
  );

  return (
    <div
      className={`${className} flex h-10 flex-row items-center gap-2 rounded-md bg-slate-700 px-3`}
    >
      {meta.rounds.filter((r) => r.round <= r.half_total).map(roundButton)}
      <FaRotate />
      {meta.rounds.filter((r) => r.round > r.half_total).map(roundButton)}
    </div>
  );
}
