interface PlayerHurt {
  user_steamid: string;
  health: number;
}

interface ItemEquip {
  user_steamid: string;
  item: string;
  issilenced: boolean;
}

interface WeaponFire {
  user_steamid: string;
  weapon: string;
  silenced: boolean;
}
