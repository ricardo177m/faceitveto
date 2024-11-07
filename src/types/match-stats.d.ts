interface MatchStats {
  _id: string;
  created_at: number;
  updated_at: number;
  bestOf: string;
  competitionId: string;
  date: number;
  game: string;
  gameMode: string;
  i0: string;
  i1: string;
  i12: string;
  i18: string;
  i2: string;
  matchId: string;
  matchRound: string;
  played: string;
  teams: Team[];
}

interface Team {
  i19: string;
  players: Player[];
  teamId: string;
  i3: string;
  i4: string;
  i5: string;
  premade: boolean;
  i17: string;
  c5: string;
  c9: string;
}

interface Player {
  i31: string;
  i30: string;
  i33: string;
  i10: string;
  i32: string;
  i13: string;
  i35: string;
  i34: string;
  i37: string;
  i15: string;
  i36: string;
  i14: string;
  i39: string;
  i38: string;
  i16: string;
  nickname: string;
  playerId: string;
  i40: string;
  i20: string;
  i22: string;
  i21: string;
  i24: string;
  i23: string;
  i26: string;
  i6: string;
  i25: string;
  i28: string;
  i7: string;
  i8: string;
  i27: string;
  i9: string;
  i29: string;
  c10: string;
  c11: string;
  c12: string;
  c13: string;
  c14: string;
  c15: string;
  c16: string;
  c17: string;
  c18: string;
  c19: string;
  c2: string;
  c20: string;
  c21: string;
  c22: string;
  c3: string;
  c36: string;
  c4: string;
}
