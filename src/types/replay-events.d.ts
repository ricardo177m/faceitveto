interface ReplayEvent {
  game_time: number;
  round_start_time: number;
}

interface ReplayPlayerEvent extends ReplayEvent {
  user_steamid: string;
}

interface PlayerHurt extends ReplayPlayerEvent {
  health: number;
}

interface ItemEquip extends ReplayPlayerEvent {
  item: string;
  issilenced: boolean;
}

interface WeaponFire extends ReplayPlayerEvent {
  weapon: string;
  silenced: boolean;
}

interface BeginDefuse extends ReplayPlayerEvent {
  has_kit: boolean;
}

interface InvChange extends ReplayPlayerEvent {
  inventory: string[];
}