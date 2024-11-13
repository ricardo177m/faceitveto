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
  progress: string;
  error?: string;
  expiresAt: FirestoreDate;
  metrics: {
    dlDc: number;
    parse: number;
  };
}

interface MatchAnalysisRound {
  round: number;
  grenades: MatchAnalysisGrenade[];
  plants: MatchAnalysisPlant[];
  equipment: MatchAnalysisEquipment[];
  frags: MatchAnalysisFrag[];
}

interface MatchAnalysisGrenade {
  round: number;
  roundTime: number;
  pos: Position;
  type: MatchAnalysisGrenadeType;
  thrownBy: {
    name: string;
    steamid: string;
    team: "T" | "CT";
    pos?: Position;
  };
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
  armor: number;
  hasHelmet: boolean;
  hasDefuser: boolean;
}

interface MatchAnalysisFrag {
  round: number;
  roundTime: number;
  name: string;
  steamid: string;
  team: "T" | "CT";
  pos: Position;
  attacker: Attacker;
  assist: Assist | null;
  headshot: boolean;
  penetrated: boolean;
  thruSmoke: boolean;
  weapon: string;
  dmgHealth: number;
  dmgArmor: number;
  lastPlaceName: string;
}

interface MatchAnalysisAttacker {
  name: string;
  steamid: string;
  team: "T" | "CT";
  pos: Position;
  blind: boolean;
  inAir: boolean;
  lastPlaceName: string;
}

interface MatchAnalysisAssist {
  name: string;
  steamid: string;
  team: "T" | "CT";
  pos: Position;
  assistedFlash: boolean;
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
