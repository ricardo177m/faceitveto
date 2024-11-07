interface Match {
  id: string;
  type: string;
  game: string;
  region: string;
  organizerId: string;
  entity: MatchEntity;
  entityCustom: MatchEntityCustom;
  allowOngoingJoin: boolean;
  anticheatRequired: boolean;
  anticheatMode: string;
  calculateElo: boolean;
  skillFeedback: string;
  afkAction: string;
  fbiManagement: boolean;
  adminTool: boolean;
  checkIn: MatchCheckIn;
  state: MatchStates;
  status: string;
  states: MatchStates[];
  teams: MatchFactions<MatchFaction>;
  spectators: object[];
  matchCustom: MatchCustom;
  voting?: MatchVoting;
  maps: MatchElement[];
  locations: MatchElement[];
  summaryResults?: MatchSummaryResults;
  results?: MatchSummaryResults[];
  demoURLs?: string[];
  startedAt?: string;
  configuredAt?: string;
  finishedAt?: string;
  timeToConnect: number;
  version: number;
  createdAt: string;
  lastModified: string;
  parties: MatchParty[];
}

interface MatchCheckIn {
  time: number;
  totalCheckedIn: number;
  totalPlayers: number;
  endTime: string;
  checkedIn: boolean;
}

interface MatchEntity {
  type: string;
  id: string;
  name: string;
}

interface MatchEntityCustom {
  effectiveRanking: number;
  matcherMatchId: string;
  parties: { [key: string]: string[] };
  partyQueueDurations: { [key: string]: number };
  queueId: string;
}

interface MatchElement {
  class_name: string;
  game_location_id?: string;
  guid: string;
  image_lg: string;
  image_sm: string;
  name: string;
  game_map_id?: string;
}

interface MatchCustom {
  id: string;
  overview: MatchOverview;
  tree: MatchTree;
}

interface MatchOverview {
  description: MatchDescription;
  game: Game;
  label: MatchDescription;
  name: string;
  region: string;
  round: MatchRound;
  detections: MatchDetections;
  spectators: boolean;
  elo_mode: string;
  expire_seconds: number;
  grouping_stats: string;
  max_players: number;
  min_players: number;
  team_size: number;
  time_to_connect: number;
  time_out_select_random: boolean;
  organizer_id: string;
  elo_type: string;
  match_configuration_type: MatchType;
  match_finished_type: MatchType;
  game_type: string;
}

interface MatchDescription {
  en: string;
}

interface MatchDetections {
  afk: boolean;
  leavers: boolean;
}

interface MatchType {
  value: string;
  label: MatchDescription;
}

interface MatchRound {
  label: MatchDescription;
  id: string;
  type: string;
  to_play: number;
  to_win: number;
}

interface MatchTree {
  game_config: MatchGameConfig;
  location: MatchTreeLocation;
  map: MatchMap;
  server_config: MatchServerConfig;
  stream: MatchStream;
}

interface MatchGameConfig {
  data_type: string;
  flags: object;
  id: string;
  leaf_node: boolean;
  values: MatchGameConfigValues;
}

interface MatchGameConfigValues {
  value: string;
}

interface MatchTreeLocation {
  data_type: string;
  display: MatchDisplay;
  flags: MatchLocationFlags;
  id: string;
  label: MatchDescription;
  leaf_node: boolean;
  name: string;
  values: MatchLocationValues;
}

interface MatchDisplay {
  priority: number;
}

interface MatchLocationFlags {
  votable: boolean;
}

interface MatchLocationValues {
  value: MatchElement[];
  voting_steps: string[];
}

interface MatchMap {
  data_type: string;
  display: MatchDisplay;
  flags: MatchLocationFlags;
  id: string;
  label: MatchDescription;
  leaf_node: boolean;
  name: string;
  values: MatchMapValues;
}

interface MatchMapValues {
  multi_select: MatchMultiSelect;
  value: MatchElement[];
  voting_steps: string[];
}

interface MatchMultiSelect {
  memberships: string[];
  minimum: number;
}

interface MatchServerConfig {
  children: MatchChildren;
  id: string;
}

interface MatchChildren {
  bots: MatchStream;
  botsDifficulty: MatchBotsDifficulty;
  deadTalk: MatchDeadTalk;
  freezeTime: MatchFreezeTime;
  friendlyFire: MatchStream;
  gameMode: MatchFreezeTime;
  gameType: MatchBotsDifficulty;
  knifeRound: MatchStream;
  maxRounds: MatchBotsDifficulty;
  overtimeHalftimePausetimer: MatchStream;
  overtimeMaxRounds: MatchBotsDifficulty;
  overtimeStartMoney: MatchFreezeTime;
  pause: MatchStream;
  pauseTime: MatchBotsDifficulty;
  respawnImmunityTime: MatchFreezeTime;
  startMoney: MatchBotsDifficulty;
  startOnReady: MatchStream;
  timeToConnect: MatchTimeToConnect;
  timeoutMax: MatchTimeout;
  timeoutTime: MatchTimeout;
  tvDelay: MatchBotsDifficulty;
  voteKick: MatchStream;
}

interface MatchStream {
  data_type: string;
  flags: object;
  id: string;
  leaf_node: boolean;
  values: MatchStreamValues;
}

interface MatchStreamValues {
  value: boolean;
}

interface MatchBotsDifficulty {
  data_type: string;
  flags: object;
  id: string;
  leaf_node: boolean;
  values: MatchPurpleValues;
}

interface MatchPurpleValues {
  max_value: number;
  min_value: number;
  value: number;
}

interface MatchDeadTalk {
  data_type: string;
  display: MatchDisplay;
  flags: object;
  id: string;
  label: MatchDescription;
  leaf_node: boolean;
  name: string;
  values: MatchStreamValues;
}

interface MatchFreezeTime {
  data_type: string;
  flags: object;
  id: string;
  leaf_node: boolean;
  values: MatchFreezeTimeValues;
  optional?: boolean;
}

interface MatchFreezeTimeValues {
  value: number;
}

interface MatchTimeToConnect {
  data_type: string;
  flags: object;
  id: string;
  leaf_node: boolean;
  link: string;
  optional: boolean;
  values: MatchPurpleValues;
}

interface MatchTimeout {
  data_type: string;
  display: MatchDisplay;
  flags: object;
  id: string;
  label: MatchDescription;
  leaf_node: boolean;
  name: string;
  values: MatchPurpleValues;
}

interface MatchParty {
  partyId: string;
  users: string[];
}

interface MatchSummaryResults {
  ascScore: boolean;
  winner: string;
  leavers: string[];
  afk: string[];
  factions: MatchFactions<MatchFactionResult>;
}

interface MatchFactions<T> {
  faction1: T;
  faction2: T;
}

interface MatchFactionResult {
  score: number;
}

interface MatchFaction {
  id: string;
  type?: string;
  name: string;
  avatar: string;
  leader: string;
  roster: Match[];
  stats?: MatchStats;
  substituted: boolean;
}

interface Match {
  id: string;
  nickname: string;
  avatar: string;
  gameId: string;
  gameName: string;
  memberships: string[];
  elo: number;
  gameSkillLevel: number;
  acReq: boolean;
  partyId: string;
}

interface MatchStats {
  winProbability: number;
  skillLevel: MatchSkillLevel;
  rating: number;
}

interface MatchSkillLevel {
  average: number;
  range: MatchRange;
}

interface MatchRange {
  min: number;
  max: number;
}

interface MatchVoting {
  voted_entity_types: string[];
  location: MatchVotingEntity;
  map: MatchVotingEntity;
}

interface MatchVotingEntity {
  entities: MatchElement[];
  pick: string[];
}
