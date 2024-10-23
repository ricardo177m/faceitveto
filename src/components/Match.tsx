"use client";

import { useState } from "react";

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

export default function Match({ match, stats, democracy }: MapsPlayerRowProps) {
  const [showMostRecent, setShowMostRecent] = useLocalStorage(
    config.localStorage.showMostRecent,
    false
  );

  const [democracyState, setDemocracy] = useState<Democracy | undefined>(
    democracy
  );

  // useEffect -> subscribe democracy {match.id}

  return (
    <div>
      <MatchHeader
        match={match}
        stats={stats}
        showMostRecent={showMostRecent}
        setShowMostRecent={setShowMostRecent}
      />
      <PlayerStats
        curatedMatch={match}
        showMostRecent={showMostRecent}
        democracy={democracyState}
      />
    </div>
  );
}
