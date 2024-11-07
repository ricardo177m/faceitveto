export const faceit = {
  democracy: (matchId: string) =>
    `https://api.faceit.com/democracy/v1/match/${matchId}`,
  match: (matchId: string) =>
    `https://api.faceit.com/match/v2/match/${matchId}`,
  matchStats: (matchId: string) =>
    `https://api.faceit.com/stats/v1/stats/matches/${matchId}`,
  matches: (playerId: string) =>
    `https://api.faceit.com/stats/v1/stats/time/users/${playerId}/games/cs2`,
  player: (playerNickname: string) =>
    `https://api.faceit.com/users/v1/nicknames/${playerNickname}`,
  stats: (playerId: string) =>
    `https://api.faceit.com/stats/v1/stats/users/${playerId}/games/cs2`,
  user: (playerId: string) =>
    `https://api.faceit.com/users/v1/users/${playerId}`,
  detailedMatches: (playerId: string) =>
    `https://api.faceit.com/match-history/v5/players/${playerId}/history/`, // user token

  search: "https://api.faceit.com/search/v1",
  matchStatsCfg: "https://api.faceit.com/stats/v1/stats/configuration/cs2", // has map covers
  state: "https://api.faceit.com/match/v1/matches/groupByState",
  list: "https://api.faceit.com/user-summary/v2/list",
  skillGroups: "https://www.faceit.com/api/skills/v3/configs/games/cs2",

  openidConfig: "https://api.faceit.com/auth/v1/openid_configuration",

  edge: "wss://edge.faceit.com/v1/ws",
};

export const faceitopen = {
  history: (playerId: string) =>
    `https://open.faceit.com/data/v4/players/${playerId}/history`,
  demos: "https://open.faceit.com/download/v2/demos/download",
};

export const steam = {
  recentPlayedGames:
    "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001",
  resolveVanityUrl:
    "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001",
  playerSummaries:
    "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002",
};
