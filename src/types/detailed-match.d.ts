export interface DetailedMatch {
  match_id: string;
  game_id: string;
  region: string;
  match_type: string;
  game_mode: string;
  max_players: number;
  teams_size: number;
  teams: Teams;
  playing_players: string[];
  competition_id: string;
  competition_name: string;
  competition_type: string;
  organizer_id: string;
  status: string;
  started_at: number;
  finished_at: number;
  results: Results;
  faceit_url: string;
  stats: MatchStats;
}

interface MatchStats {
  isWin: boolean;
  map: string;
  score: string;
  roundsWon: string;
}

interface Teams {
  faction1: Faction1;
  faction2: Faction2;
}

interface Faction1 {
  team_id: string;
  nickname: string;
  avatar: string;
  type: string;
  players: Player[];
}

interface Player {
  player_id: string;
  nickname: string;
  avatar: string;
  skill_level: number;
  game_player_id: string;
  game_player_name: string;
  faceit_url: string;
}

interface Faction2 {
  team_id: string;
  nickname: string;
  avatar: string;
  type: string;
  players: Player2[];
}

interface Player2 {
  player_id: string;
  nickname: string;
  avatar: string;
  skill_level: number;
  game_player_id: string;
  game_player_name: string;
  faceit_url: string;
}

interface Results {
  winner: string;
  score: Score;
}

interface Score {
  faction2: number;
  faction1: number;
}
