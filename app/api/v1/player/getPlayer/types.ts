import { MatchHistory, MatchHistoryResponse, Profile } from "@/types/getPlayerMatchHistoryTypes";
import { LeaderboardData, LeaderboardItem } from "@/types/leaderboardTypes";


export interface PlayerProfile {
    profile_id: number;
    name: string;
    alias: string;
    personal_statgroup_id: number;
    xp: number;
    level: number;
    leaderboardregion_id: number;
    country: string;
}
  
export interface RankData {
    last_match: MatchHistory;
    second_last_match: MatchHistory | null;
    elo_change: number;
    current_elo: number;
}

export interface ReturnData {
    message: string;
    player: PlayerProfile | null;
    player_leaderboard: LeaderboardItem | null;
    solo_rank: RankData | null;
    team_rank: RankData | null;
    // api_response: any;
    request_time: number;
}