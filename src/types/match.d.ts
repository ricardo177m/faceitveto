export interface Match {
  id: string;
  type: string;
  game: string;
  region: string;
  organizerId: string;
  entity: Entity;
  entityCustom: EntityCustom;
  allowOngoingJoin: boolean;
  anticheatRequired: boolean;
  anticheatMode: string;
  calculateElo: boolean;
  skillFeedback: string;
  afkAction: string;
  fbiManagement: boolean;
  adminTool: boolean;
  checkIn: CheckIn;
  state: States;
  status: string;
  states: States[];
  teams: Factions<Faction>;
  spectators: object[];
  matchCustom: MatchCustom;
  voting?: Voting;
  maps: Element[];
  locations: Element[];
  summaryResults?: SummaryResults;
  results?: SummaryResults[];
  demoURLs?: string[];
  startedAt?: string;
  configuredAt?: string;
  finishedAt?: string;
  timeToConnect: number;
  version: number;
  createdAt: string;
  lastModified: string;
  parties: Party[];
}

enum States {
  CHECK_IN,
  CAPTAIN_PICK,
  VOTING,
  CONFIGURING,
  READY,
  ONGOING,
  CANCELED,
  FINISHED,
}

export interface CheckIn {
  time: number;
  totalCheckedIn: number;
  totalPlayers: number;
  endTime: string;
  checkedIn: boolean;
}

export interface Entity {
  type: string;
  id: string;
  name: string;
}

export interface EntityCustom {
  effectiveRanking: number;
  matcherMatchId: string;
  parties: { [key: string]: string[] };
  partyQueueDurations: { [key: string]: number };
  queueId: string;
}

export interface Element {
  class_name: string;
  game_location_id?: string;
  guid: string;
  image_lg: string;
  image_sm: string;
  name: string;
  game_map_id?: string;
}

export interface MatchCustom {
  id: string;
  overview: Overview;
  tree: Tree;
}

export interface Overview {
  description: Description;
  game: Game;
  label: Description;
  name: string;
  region: string;
  round: Round;
  detections: Detections;
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

export interface Description {
  en: string;
}

export interface Detections {
  afk: boolean;
  leavers: boolean;
}

export interface MatchType {
  value: string;
  label: Description;
}

export interface Round {
  label: Description;
  id: string;
  type: string;
  to_play: number;
  to_win: number;
}

export interface Tree {
  game_config: GameConfig;
  location: TreeLocation;
  map: Map;
  server_config: ServerConfig;
  stream: Stream;
}

export interface GameConfig {
  data_type: string;
  flags: object;
  id: string;
  leaf_node: boolean;
  values: GameConfigValues;
}

export interface GameConfigValues {
  value: string;
}

export interface TreeLocation {
  data_type: string;
  display: Display;
  flags: LocationFlags;
  id: string;
  label: Description;
  leaf_node: boolean;
  name: string;
  values: LocationValues;
}

export interface Display {
  priority: number;
}

export interface LocationFlags {
  votable: boolean;
}

export interface LocationValues {
  value: Element[];
  voting_steps: string[];
}

export interface Map {
  data_type: string;
  display: Display;
  flags: LocationFlags;
  id: string;
  label: Description;
  leaf_node: boolean;
  name: string;
  values: MapValues;
}

export interface MapValues {
  multi_select: MultiSelect;
  value: Element[];
  voting_steps: string[];
}

export interface MultiSelect {
  memberships: string[];
  minimum: number;
}

export interface ServerConfig {
  children: Children;
  id: string;
}

export interface Children {
  bots: Stream;
  botsDifficulty: BotsDifficulty;
  deadTalk: DeadTalk;
  freezeTime: FreezeTime;
  friendlyFire: Stream;
  gameMode: FreezeTime;
  gameType: BotsDifficulty;
  knifeRound: Stream;
  maxRounds: BotsDifficulty;
  overtimeHalftimePausetimer: Stream;
  overtimeMaxRounds: BotsDifficulty;
  overtimeStartMoney: FreezeTime;
  pause: Stream;
  pauseTime: BotsDifficulty;
  respawnImmunityTime: FreezeTime;
  startMoney: BotsDifficulty;
  startOnReady: Stream;
  timeToConnect: TimeToConnect;
  timeoutMax: Timeout;
  timeoutTime: Timeout;
  tvDelay: BotsDifficulty;
  voteKick: Stream;
}

export interface Stream {
  data_type: string;
  flags: object;
  id: string;
  leaf_node: boolean;
  values: StreamValues;
}

export interface StreamValues {
  value: boolean;
}

export interface BotsDifficulty {
  data_type: string;
  flags: object;
  id: string;
  leaf_node: boolean;
  values: PurpleValues;
}

export interface PurpleValues {
  max_value: number;
  min_value: number;
  value: number;
}

export interface DeadTalk {
  data_type: string;
  display: Display;
  flags: object;
  id: string;
  label: Description;
  leaf_node: boolean;
  name: string;
  values: StreamValues;
}

export interface FreezeTime {
  data_type: string;
  flags: object;
  id: string;
  leaf_node: boolean;
  values: FreezeTimeValues;
  optional?: boolean;
}

export interface FreezeTimeValues {
  value: number;
}

export interface TimeToConnect {
  data_type: string;
  flags: object;
  id: string;
  leaf_node: boolean;
  link: string;
  optional: boolean;
  values: PurpleValues;
}

export interface Timeout {
  data_type: string;
  display: Display;
  flags: object;
  id: string;
  label: Description;
  leaf_node: boolean;
  name: string;
  values: PurpleValues;
}

export interface Party {
  partyId: string;
  users: string[];
}

export interface SummaryResults {
  ascScore: boolean;
  winner: string;
  leavers: string[];
  afk: string[];
  factions: Factions<FactionResult>;
}

export interface Factions<T> {
  faction1: T;
  faction2: T;
}

export interface FactionResult {
  score: number;
}

export interface Faction {
  id: string;
  type?: string;
  name: string;
  avatar: string;
  leader: string;
  roster: RosterPlayer[];
  stats?: Stats;
  substituted: boolean;
}

export interface RosterPlayer {
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

export interface Stats {
  winProbability: number;
  skillLevel: SkillLevel;
  rating: number;
}

export interface SkillLevel {
  average: number;
  range: Range;
}

export interface Range {
  min: number;
  max: number;
}

export interface Voting {
  voted_entity_types: string[];
  location: VotingEntity;
  map: VotingEntity;
}

export interface VotingEntity {
  entities: Element[];
  pick: string[];
}

interface PartialMatchState {
  payload: {
    [key: string]: {
      id: string;
    }[];
  };
}
