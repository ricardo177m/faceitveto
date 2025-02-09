interface Game {
  name: string;
  region: string;
  skill_level: number;
}

interface PlayerSearch {
  id: string;
  nickname: string;
  country: string;
  avatar?: string;
  verification_level: number;
  games: Game[];
}

interface PlayerSearchResult {
  payload: PlayerSearch[];
  offset: number;
  limit: number;
  total: number;
  has_more: boolean;
}
