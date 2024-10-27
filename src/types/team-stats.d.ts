import { DetailedMatch } from "./detailed-match";

export interface TeamStatsData {
  stats: {
    total: number;
    wins: number;
  };
  matches: DetailedMatch[];
}
