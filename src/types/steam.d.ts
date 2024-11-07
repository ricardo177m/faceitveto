interface RecentPlayedGamesResult {
  response: {
    total_count: number;
    games: SteamGame[];
  };
}

interface SteamGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever?: number;
  playtime_mac_forever?: number;
  playtime_linux_forever?: number;
  playtime_deck_forever?: number;
}

interface PlayerSummaryResult {
  response: { players: PlayerSummary[] };
}

interface PlayerSummary {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  lastlogoff: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
}
