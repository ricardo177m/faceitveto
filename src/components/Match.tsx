"use client";

import { CuratedMatch } from "@/types/curated-match";
import { config } from "@/config/config";
import { useLocalStorage } from "@/hooks";

import MatchHeader from "./MatchHeader";
import PlayerStats from "./PlayerStats";

interface MapsPlayerRowProps {
  match: CuratedMatch;
}

export default function Match({ match }: MapsPlayerRowProps) {
  const [showMostRecent, setShowMostRecent] = useLocalStorage(
    config.localStorage.showMostRecent,
    false
  );

  return (
    <div>
      <MatchHeader
        match={match}
        showMostRecent={showMostRecent}
        setShowMostRecent={setShowMostRecent}
      />
      <PlayerStats curatedMatch={match} showMostRecent={showMostRecent} />
    </div>
  );
}
