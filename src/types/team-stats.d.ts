interface TeamStatsData {
  stats: {
    total: number;
    wins: number;
  };
  matches: DetailedMatch[];
}

interface TogetherStatsData {
  asTeammates: TeamStatsData;
  asOpponents: TeamStatsData;
}
