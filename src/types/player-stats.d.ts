interface PlayerStats {
  lifetime: LifetimeStats;
  segments: Segment[];
}

interface LifetimeStats {
  _id: {
    game: string;
    playerId: string;
  };
  pendingStats: unknown[];
  rev: number;
  created_at: number;
  updated_at: number;
  m1: string;
  m2: string;
  m7: string;
  m13: string;
  k5: string;
  k6: string;
  k8: string;
  s0: string[];
  s1: string;
  s2: string;
  s3: string;
  s4: string;
  s5: string;
  s6: string;
  s7: string;
}

interface Segment {
  segments: Test;
  _id: {
    game: string;
    gameMode: string;
    segmentId: "csgo_map" | "competitions";
    playerId: string;
  };
}

interface Test {
  [key: string]: SegmentStats;
}

interface SegmentStats {
  k1: string;
  k10: string;
  k11: string;
  k12: string;
  k2: string;
  k3: string;
  k4: string;
  k5: string;
  k6: string;
  k7: string;
  k8: string;
  k9: string;
  m1: string;
  m10: string;
  m11: string;
  m12: string;
  m13: string;
  m14: string;
  m2: string;
  m3: string;
  m4: string;
  m5: string;
  m6: string;
  m7: string;
  m8: string;
  m9: string;
}
