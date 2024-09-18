
import { MatchHistoryStat, Profile } from './types';

interface PlayerData {
  matchHistoryStats: MatchHistoryStat[];
  playerName: string;
  profiles: Profile[];
}
  export const getPlayerMatchHistory = async (
    playerId: string
  ): Promise<PlayerData> => {
    const url = `https://athens-live-api.worldsedgelink.com/community/leaderboard/getRecentMatchHistory?title=athens&profile_ids=${encodeURIComponent(
      JSON.stringify([playerId])
    )}`;
  
    const response = await fetch(url, { method: "GET" });

  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const data: PlayerData = await response.json();
    return data;
  };


  
  

  