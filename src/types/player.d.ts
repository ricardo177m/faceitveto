interface Player {
  id: string;
  activated_at: string;
  avatar: string;
  country: string;
  cover_image_url: string;
  created_at: string;
  flag: string;
  friends: string[];
  games: PlayerGames;
  gender: string;
  guest_info: object;
  matching_sound: string;
  memberships: string[];
  nickname: string;
  phone_verified: boolean;
  registration_status: string;
  status: string;
  streaming: PlayerStreaming;
  tags: string[];
  updated_by: string;
  user_type: string;
  verified: boolean;
  version: number;
  platforms?: PlayerPlatforms;
}

interface PlayerGames {
  csgo?: PlayerGame;
  cs2?: PlayerGame;
}

interface PlayerGame {
  game_id: string;
  game_name: string;
  faceit_elo: number;
  region: string;
  region_updated_at: string;
  skill_level: number;
  skill_level_label: string;
  tags: string[];
  elo_refreshed_by_user_at: string;
}

interface PlayerPlatforms {
  steam?: SteamPlatform;
}

interface SteamPlatform {
  id: string;
  nickname: string;
  id64: string;
}

interface PlayerStreaming {
  twitch_id: string;
}

interface PlayerPlaytime {
  "2weeks": number;
  forever: number;
}
