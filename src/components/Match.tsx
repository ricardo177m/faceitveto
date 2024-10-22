"use client";

import { CuratedMatch } from "@/types/curated-match";
import { Democracy } from "@/types/democracy";
import { MatchStats } from "@/types/match-stats";
import { config } from "@/config/config";
import { useLocalStorage } from "@/hooks";

import MatchHeader from "./MatchHeader";
import PlayerStats from "./PlayerStats";

interface MapsPlayerRowProps {
  match: CuratedMatch;
  democracy?: Democracy;
  stats: MatchStats[];
}

export default function Match({ match, stats }: MapsPlayerRowProps) {
  const [showMostRecent, setShowMostRecent] = useLocalStorage(
    config.localStorage.showMostRecent,
    false
  );

  return (
    <div>
      <MatchHeader
        match={match}
        stats={stats}
        showMostRecent={showMostRecent}
        setShowMostRecent={setShowMostRecent}
      />
      <PlayerStats curatedMatch={match} showMostRecent={showMostRecent} />
    </div>
  );
}
