interface MapStats {
  matches: number;
  wins: number;
  kdr: number;
}

interface IMaps {
  [name: string]: MapStats;
}

interface CuratedPlayerStats {
  total: IntervalPlayerStats;
  mostRecent: IntervalPlayerStats;
}

interface IntervalPlayerStats {
  playerId: string;
  overall: MapStats;
  maps: IMaps;
}
