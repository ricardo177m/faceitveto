export interface PlayerListResult {
  id: string;
  nickname: string;
  avatar: string;
  verification_level: number;
  country: string;
  games: Game[];
  subscriber_badges: SubscriberBadge[];
  cover_image_url: string;
}

export interface Game {
  game: string;
  elo: number;
  skill_level: number;
}

export interface SubscriberBadge {
  badge_url: string;
  entity_id: string;
  entity_type: string;
  badge_length: number;
  next_badge_length: number;
  tiers: number[];
}
