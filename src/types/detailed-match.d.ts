interface DetailedMatch {
  match_id: string;
  game_id: string;
  region: string;
  match_type: string;
  game_mode: string;
  max_players: number;
  teams_size: number;
  teams: DetailedMatchTeams;
  playing_players: string[];
  competition_id: string;
  competition_name: string;
  competition_type: string;
  organizer_id: string;
  status: string;
  started_at: number;
  finished_at: number;
  results: DetailedMatchResults;
  faceit_url: string;
  stats: DetailedMatchStats;
}

interface DetailedMatchStats {
  isWin: boolean;
  map: string;
  score: string;
  roundsWon: string;
}

interface DetailedMatchTeams {
  faction1: DetailedMatchFaction1;
  faction2: DetailedMatchFaction2;
}

interface DetailedMatchFaction1 {
  team_id: string;
  nickname: string;
  avatar: string;
  type: string;
  players: DetailedMatchPlayer[];
}

interface DetailedMatchPlayer {
  player_id: string;
  nickname: string;
  avatar: string;
  skill_level: number;
  game_player_id: string;
  game_player_name: string;
  faceit_url: string;
}

interface DetailedMatchFaction2 {
  team_id: string;
  nickname: string;
  avatar: string;
  type: string;
  players: DetailedMatchPlayer[];
}

interface DetailedMatchResults {
  winner: string;
  score: DetailedMatchScore;
}

interface DetailedMatchScore {
  faction2: number;
  faction1: number;
}
