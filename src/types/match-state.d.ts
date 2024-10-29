export interface MatchState {
  configuredAt: string;
  createdAt: string;
  entity: Entity;
  entityCustom: EntityCustom;
  game: string;
  gameModeType: string;
  id: string;
  lastModified: string;
  region: string;
  round: number;
  state: string;
  status: string;
  timeToConnect: number;
  version: number;
}

interface Entity {
  id: string;
  name: string;
  type: string;
}

export interface EntityCustom {
  effectiveRanking: number;
  matcherMatchId: string;
  parties: {
    [key: string]: string[];
  };
  partyQueueDurations: {
    [key: string]: string[];
  };
  queueId: string;
}

export interface PartialMatchState {
  payload: {
    [key: string]: {
      id: string;
      state: string;
    }[];
  };
}
