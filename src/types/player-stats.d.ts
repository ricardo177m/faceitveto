export interface PlayerStats {
  _id: ID;
  created_at: number;
  updated_at: number;
  i9: string;
  nickname: string;
  i10: string;
  i13: string;
  i15: string;
  i6: string;
  i14: string;
  i7: string;
  i16: string;
  i8: string;
  playerId: string;
  c2: string;
  c4: string;
  c3: string;
  c1: string;
  i19: string;
  teamId: string;
  i3: string;
  i4: string;
  i5: string;
  premade: boolean;
  c5: string;
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
  status: string;
  elo: string;
}

export interface ID {
  matchId: string;
  playerId: string;
}
