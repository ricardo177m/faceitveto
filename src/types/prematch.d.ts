import { CuratedPlayer } from "./curated-match";
import { TeamStatsData } from "./team-stats";

export interface PrematchPost {
  teamstats: TeamStatsData;
  premade: CuratedPlayer[];
  map: string;
  matchIds: string[];
  data: { [key: string]: MatchAnalysis };
}

export interface MatchAnalysis {
  createdAt: FirestoreDate;
  demoUrl: string | null;
  map: string;
  processed: boolean;
  data: {
    halfTotalRounds: number;
    grenades: MatchAnalysisGrenades[];
    plants: MatchAnalysisPlants[];
  };
}

export interface MatchAnalysisGrenades {
  pos: Position;
  round: number;
  roundTime: number;
  type: "smokegrenade" | "flashbang" | "inferno" | "hegrenade" | "decoy";
  // | "molotov"
  // | "incgrenade";
  thrownBy: {
    name: string;
    team: "T" | "CT";
    steamid: string;
    pos: Position;
  };
}

export interface MatchAnalysisPlants {
  pos: Position;
  round: number;
  roundTime: number;
  site: "A" | "B";
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface FirestoreDate {
  seconds: number;
  nanoseconds: number;
}
