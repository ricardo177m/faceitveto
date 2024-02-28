export interface MapStats {
  matches: number;
  wins: number;
  kdr: number;
}

export interface IMaps {
  [name: string]: MapStats;
}

export interface CuratedPlayerStats {
  total: IntervalPlayerStats;
  mostRecent: IntervalPlayerStats;
}

export interface IntervalPlayerStats {
  playerId: string;
  overall: MapStats;
  maps: IMaps;
}
