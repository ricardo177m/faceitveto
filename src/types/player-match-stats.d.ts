interface PlayerMatchStats {
  _id: ID;
  created_at: number;
  updated_at: number;
  nickname: string;
  i10: string; // is win
  i13: string;
  i15: string;
  i3: string;
  i4: string;
  i5: string;
  i6: string; // frags
  i7: string; // assists
  i8: string; // deaths
  i9: string;
  i14: string;
  i16: string;
  playerId: string;
  c2: string; // kdr
  c4: string;
  c3: string;
  c1: string;
  i19: string;
  teamId: string;
  premade: boolean;
  c5: string;
  bestOf: string;
  competitionId: string;
  date: number;
  game: string;
  gameMode: string;
  i0: string;
  i1: string; // map
  i12: string;
  i18: string; // score
  i2: string;
  matchId: string;
  matchRound: string;
  played: string;
  status: string;
  elo: string;
}

interface ID {
  matchId: string;
  playerId: string;
}
