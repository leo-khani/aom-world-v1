  export interface LeaderboardPlayer {
    avatarUrl: string;
    elo: number;
    eloHighest: number;
    eloRating: number;
    gameId: string;
    leaderboardKey: string;
    losses: number;
    playerNumber: number | null;
    rank: number;
    rankIcon: string;
    rankLevel: string;
    rankTotal: number;
    region: string;
    rlUserId: number;
    totalGames: number;
    userId: string | null;
    userName: string;
    winPercent: number;
    winStreak: number;
    wins: number;
  }
  