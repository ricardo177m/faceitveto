"use client";

import { useState } from "react";

import { CuratedMatch } from "@/types/curated-match";

import MatchHeader from "./MatchHeader";
import PlayerStats from "./PlayerStats";

interface MapsPlayerRowProps {
  match: CuratedMatch;
}

export default function Match({ match }: MapsPlayerRowProps) {
  const [showMostRecent, setShowMostRecent] = useState(false);

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
