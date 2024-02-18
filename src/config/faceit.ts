export const faceitConfig = {
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

  search: "https://api.faceit.com/search/v1",
  matchStatsCfg: "https://api.faceit.com/stats/v1/stats/configuration/cs2",
  userList: "https://api.faceit.com/user-summary/v1/list",
  state: "https://api.faceit.com/match/v1/matches/groupByState",

  openidConfig: "https://api.faceit.com/auth/v1/openid_configuration",
};
