interface TeammatesData {
  teammates: Teammate[];
  enemies: Teammate[];
}

interface Teammate {
  matches: number;
  wins: number;
  playerId: string;
}
