interface PrematchPost {
  teamstats: TeamStatsData;
  premade: CuratedPlayer[];
  map: string;
  matchIds: string[];
  data: { [key: string]: MatchAnalysis };
}

interface MatchAnalysis {
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

interface MatchAnalysisGrenades {
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

interface MatchAnalysisPlants {
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
