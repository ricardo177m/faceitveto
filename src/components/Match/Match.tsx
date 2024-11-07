"use client";

import { useContext, useEffect, useState } from "react";

import { CuratedMatch, States } from "@/types/curated-match";
import { Democracy } from "@/types/democracy";
import { MatchState } from "@/types/match-state";
import { MatchStats } from "@/types/match-stats";
import { config } from "@/config/config";
import { useLocalStorage } from "@/hooks";
import EdgeContext from "@/contexts/EdgeContext";

import MatchHeader from "./MatchHeader";
import MatchPlayerStats from "./MatchPlayerStats";

interface MapsPlayerRowProps {
  match: CuratedMatch;
  democracy?: Democracy;
  stats: MatchStats[];
}

export default function Match({ match, stats, democracy }: MapsPlayerRowProps) {
  const [showMostRecent, setShowMostRecent] = useLocalStorage<boolean>(
    config.localStorage.showMostRecent,
    false
  );

  const [matchState, setMatch] = useState<CuratedMatch>(match);
  const [democracyState, setDemocracy] = useState<Democracy | undefined>(
    democracy
  );

  const edgeContext = useContext(EdgeContext);

  const handleUpdateMatch = (payload: MatchState) => {
    matchState.state = payload.state as unknown as States;
    setMatch(matchState);
  };

  const handleUpdateDemocracy = (payload: Democracy) => {
    setDemocracy(payload);
  };

  useEffect(() => {
    edgeContext.subscribeMatchState(match.id, handleUpdateMatch);
    edgeContext.subscribeDemocracy(match.id, handleUpdateDemocracy);

    return () => {
      edgeContext.unsubscribeMatchState(match.id, handleUpdateMatch);
      edgeContext.unsubscribeDemocracy(match.id, handleUpdateDemocracy);
    };
  }, [match.id]);

  return (
    <div>
      <MatchHeader
        match={matchState}
        stats={stats}
        showMostRecent={showMostRecent}
        setShowMostRecent={setShowMostRecent}
        democracy={democracyState}
      />
      <MatchPlayerStats
        curatedMatch={match}
        showMostRecent={showMostRecent}
        democracy={democracyState}
      />
    </div>
  );
}
