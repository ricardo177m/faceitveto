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
    rounds: MatchAnalysisRound[];
  };
}

interface MatchAnalysisRound {
  round: number;
  grenades: MatchAnalysisGrenade[];
  plants: MatchAnalysisPlant[];
  equipment: MatchAnalysisEquipment[];
}

interface MatchAnalysisGrenade {
  round: number;
  roundTime: number;
  pos: Position;
  type: MatchAnalysisGrenadeType;
  thrownBy: MatchAnalysisPlayer;
}

type MatchAnalysisGrenadeType =
  | "decoy"
  | "inferno"
  | "smokegrenade"
  | "flashbang"
  | "hegrenade";

interface MatchAnalysisPlant {
  round: number;
  roundTime: number;
  pos: Position;
  site: "A" | "B";
}

interface MatchAnalysisEquipment {
  name: string;
  steamid: string;
  team: "T" | "CT";
  round: number;
  equipment: string[];
}

interface MatchAnalysisPlayer {
  name: string;
  steamid: string;
  team: "T" | "CT";
  pos?: Position;
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
