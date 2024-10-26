export interface Player {
  id: string;
  activated_at: string;
  avatar: string;
  country: string;
  cover_image_url: string;
  created_at: string;
  flag: string;
  friends: string[];
  games: Games;
  gender: string;
  guest_info: object;
  matching_sound: string;
  memberships: string[];
  nickname: string;
  phone_verified: boolean;
  registration_status: string;
  status: string;
  streaming: Streaming;
  tags: string[];
  updated_by: string;
  user_type: string;
  verified: boolean;
  version: number;
  platforms?: Platforms;
}

export interface Games {
  csgo?: Csgo;
  cs2?: Csgo;
}

export interface Csgo {
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

export interface Platforms {
  steam?: Steam;
}

export interface Steam {
  id: string;
  nickname: string;
  id64: string;
}

export interface Streaming {
  twitch_id: string;
}

export interface Playtime {
  "2weeks": number;
  forever: number;
}
