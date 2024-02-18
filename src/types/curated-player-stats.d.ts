export interface MapStats {
  matches: number;
  wins: number;
  kdr: number;
}

export interface IMaps {
  [name: string]: MapStats;
}

export interface CuratedPlayerStats {
  playerId: string;
  overall: MapStats;
  maps: IMaps;
}
