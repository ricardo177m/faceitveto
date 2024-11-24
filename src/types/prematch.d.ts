interface PrematchPost {
  teamstats: TeamStatsData;
  premade: CuratedPlayer[];
  map: string;
  matchIds: string[];
}

interface MatchMeta {
  map: string;
  processed: boolean;
  rounds: RoundMeta[];
  progress: string;
  error: string | null;
  metrics: {
    dlDc: number;
    parse: number;
  } | null;
  createdAt: string;
  requestedBy: string | null;
}

interface RoundMeta {
  round: number;
  winner: "T" | "CT";
  reason: string;
  t_score: number;
  ct_score: number;
  teams: {
    T: string[];
    CT: string[];
  };
}

interface Position {
  x: number;
  y: number;
  z: number;
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
