interface Game {
  name: string;
  skill_level: number;
}

export interface PlayerSearch {
  id: string;
  guid: string;
  nickname: string;
  status?: string;
  games: Game[];
  country: string;
  avatar?: string;
  verified: boolean;
  verification_level?: number;
}

export interface PlayerSearchResult {
  total_count: number;
  results: PlayerSearch[];
}
