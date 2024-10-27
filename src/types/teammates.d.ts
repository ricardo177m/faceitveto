export interface TeammatesData {
  teammates: Teammate[];
  enemies: Teammate[];
}

export interface Teammate {
  matches: number;
  wins: number;
  playerId: string;
}
