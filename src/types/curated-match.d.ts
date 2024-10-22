export type CuratedMatch = {
  id: string;
  region: string;
  matchRanking: number;
  state: States;
  bestOf: number;
  maps: CuratedMap[];
  mapPicks?: CuratedMap[];
  teams: {
    faction1: CuratedFaction;
    faction2: CuratedFaction;
  };
  winner?: string;
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
};

export enum States {
  CHECK_IN,
  CAPTAIN_PICK,
  VOTING,
  CONFIGURING,
  READY,
  ONGOING,
  CANCELED,
  FINISHED,
  SCHEDULED,
}

type CuratedMap = {
  name: string;
  id: string;
  image: string;
};

type CuratedFaction = {
  name: string;
  avatar: string;
  winProbability?: number;
  captain: string;
  players: CuratedPlayer[];
};

type CuratedPlayer = {
  id: string;
  nickname: string;
  avatar: string;
  gameId: string;
  memberships: string[];
  elo: number;
  level: number;
  partyId: number;
};
