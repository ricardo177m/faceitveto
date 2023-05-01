export type CuratedMatch = {
  id: string;
  region: string;
  matchRanking: number;
  state: string;
  maps: CuratedMap[];
  mapPicks: CuratedMap[];
  teams: {
    faction1: CuratedFaction;
    faction2: CuratedFaction;
  };
  winner?: string;
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
};

type CuratedMap = {
  name: string;
  id: string;
  image: string;
};

type CuratedFaction = {
  name: string;
  avatar?: string;
  winProbability: number;
  captain: string;
  players: CuratedPlayer[];
};

type CuratedPlayer = {
  id: string;
  nickname: string;
  avatar?: string;
  gameId: string;
  memberships: string[];
  elo: number;
  level: number;
  partyId: number;
};
