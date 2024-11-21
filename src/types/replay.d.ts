interface MatchData {
  framerate: number;
  tick_frame_ratio: number;
  round_start_state: StartState;
  round_end_state: EndState;
  events: MatchEvent[];
  player_positions: MatchPlayerPosition[];
  grenades: MatchGrenade[];
}

interface StartState {
  tick: number;
  frame: number;
  data: PlayerInitialState[];
}

interface EndState {
  tick: number;
  frame: number;
}

interface MatchEvent {
  event_name: string;
  tick: number;
  frame: number;
  data: unknown;
}

interface MatchPlayerPosition {
  steamid: string;
  frames: number;
  X: (number | null)[];
  Y: (number | null)[];
  Z: (number | null)[];
  yaw: (number | null)[];
}

interface MatchGrenade {
  entity_id: number;
  type: string;
  start_tick: number;
  start_frame: number;
  end_tick: number;
  end_frame: number;
  thrower_steamid: string;
  X: number[];
  Y: number[];
  Z: number[];
}

interface PlayerInitialStateConnected {
  inventory: string[];
  balance: number;
  kills_total: number;
  deaths_total: number;
  assists_total: number;
  health: number;
  has_defuser: boolean;
  has_helmet: boolean;
  is_defusing: boolean;
  armor_value: number;
  X: number;
  Y: number;
  Z: number;
  yaw: number;
  is_alive: boolean;
  active_weapon_name: string;
  steamid: string;
  name: string;
  team: string;
  is_disconnected: false;
}

interface PlayerInitialStateDisconnected {
  inventory: string[];
  balance: number;
  kills_total: number;
  deaths_total: number;
  assists_total: number;
  health: null;
  has_defuser: null;
  has_helmet: null;
  is_defusing: null;
  armor_value: null;
  X: null;
  Y: null;
  Z: null;
  yaw: null;
  is_alive: boolean;
  active_weapon_name: null;
  steamid: string;
  name: string;
  team: null;
  is_disconnected: true;
}

type PlayerInitialState =
  | PlayerInitialStateConnected
  | PlayerInitialStateDisconnected;
