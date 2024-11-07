import { CuratedPlayer } from "./curated-match";
import { TeamStatsData } from "./team-stats";

export interface PrematchPost {
  teamstats: TeamStatsData;
  premade: CuratedPlayer[];
  map: string;
  matchIds: string[];
}
