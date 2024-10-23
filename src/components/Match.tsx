"use client";

import { useContext, useEffect, useState } from "react";

import { CuratedMatch } from "@/types/curated-match";
import { Democracy } from "@/types/democracy";
import { MatchStats } from "@/types/match-stats";
import { config } from "@/config/config";
import { useLocalStorage } from "@/hooks";
import EdgeContext from "@/contexts/EdgeContext";

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

  const edgeContext = useContext(EdgeContext);

  const handleUpdateDemocracy = (payload: Democracy) => {
    setDemocracy(payload);
  };

  useEffect(() => {
    edgeContext.subscribeDemocracy(match.id, handleUpdateDemocracy);
    return () => {
      edgeContext.unsubscribeDemocracy(match.id, handleUpdateDemocracy);
    };
  }, [match.id]);

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
