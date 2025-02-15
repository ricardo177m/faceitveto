interface Game {
  name: string;
  region?: string;
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

interface PlayerSearchOpen {
  player_id: string;
  nickname: string;
  country: string;
  avatar?: string;
  status?: string;
  verified: boolean;
  games: Game[];
}

interface PlayerSearchResult {
  payload: PlayerSearch[];
  offset: number;
  limit: number;
  total: number;
  has_more: boolean;
}

interface PlayerSearchResultOpen {
  items: PlayerSearchOpen[];
  start: number;
  end: boolean;
}

interface PlayerOpen {
  activated_at: string,
  avatar: string,
  country: string,
  cover_featured_image: string,
  cover_image: string,
  faceit_url: string,
  friends_ids: string[],
  games: PlayerGame,
  infractions: null,
  membership_type: string,
  memberships: string[],
  new_steam_id: string,
  nickname: string,
  platforms: unknown,
  player_id: string,
  settings: {
    language: string
  },
  steam_id_64: string,
  steam_nickname: string,
  verified: true
}

interface GameOpen {
  faceit_elo: number,
  game_player_id: string,
  game_player_name: string,
  game_profile_id: string,
  region: string,
  regions: null,
  skill_level: number,
  skill_level_label: string
}

interface PlayerGame {
  [key: string]: GameOpen
}
