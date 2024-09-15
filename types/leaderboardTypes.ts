export interface LeaderboardData {
    wins: any;
    compressedItems: any | null;
    count: number;
    gameId: string | null;
    id: string;	
    items: LeaderboardItem[];
    lastUpdated: string;
    leaderboardId: number;
    region: number;
    }
    
  export interface LeaderboardItem {
      gameId: string;
      userId: string | null;
      rlUserId: number;
      userName: string;
      avatarUrl: string;
      playerNumber: number | null;
      elo: number;
      eloRating: number;
      eloHighest: number;
      rank: number;
      rankTotal: number;
      region: string;
      wins: number;
      winPercent: number;
      losses: number;
      winStreak: number;
      totalGames: number;
      rankLevel: string;
      rankIcon: string;
      leaderboardKey: string;
    }
  
    export interface LeaderboardStars {
      items: LeaderboardStarsItem[];
      count: number;
      leaderboardId: number;
      leaderboardStart: number;
      region: number;
    }
    
    export interface LeaderboardStarsItem {
      gameId: string;
        userId: string | null;
        rlUserId: number;
        userName: string;
        avatarUrl: string;
        playerNumber: number | null;
        elo: number;
        eloRating: number;
        eloHighest: number;
        rank: number;
        rankTotal: number;
        region: string;
        wins: number;
        winPercent: number;
        losses: number;
        winStreak: number;
        totalGames: number;
        rankLevel: string;
        rankIcon: string;
    }