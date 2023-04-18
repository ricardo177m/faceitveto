export const faceitConfig = {
  democracy: (matchId: string) =>
    `https://api.faceit.com/democracy/v1/match/${matchId}`,
  match: (matchId: string) =>
    `https://api.faceit.com/match/v2/match/${matchId}`,
  matchStats: (matchId: string) =>
    `https://api.faceit.com/stats/v1/stats/matches/${matchId}`,
  matches: (playerId: string) =>
    `https://api.faceit.com/stats/v1/stats/time/users/${playerId}/games/csgo`,
  player: (playerNickname: string) =>
    `https://api.faceit.com/users/v1/nicknames/${playerNickname}`,
  user: (playerId: string) =>
    `https://api.faceit.com/users/v1/users/${playerId}`,

  search: "https://api.faceit.com/search/v1",
  matchStatsCfg: "https://api.faceit.com/stats/v1/stats/configuration/csgo",
  userList: "https://api.faceit.com/user-summary/v1/list",
};
