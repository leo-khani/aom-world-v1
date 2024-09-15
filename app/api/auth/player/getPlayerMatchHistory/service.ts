interface MatchHistoryItem {
    matchhistory_id: number;
    profile_id: number;
    resulttype: number;
    teamid: number;
    race_id: number;
    xpgained: number;
    counters: string;
    matchstartdate: number;
    civilization_id: number;
  }
  
  interface MatchHistoryStat {
    completiontime: number;
    creator_profile_id: number;
    description: string;
    id: number;
    mapname: string;
    matchhistoryitems: MatchHistoryItem[];
    matchhistorymember: {
      profile_id: number;
      name: string;
      alias: string;
      xp: number;
      level: number;
      country: string;
    }[];
    matchhistoryreportresults: MatchHistoryItem[];
    matchtype_id: number;
    matchurls: string[];
    maxplayers: number;
    observertotal: number;
    options: string;
    slotinfo: string;
    startgametime: number;
  }
  
  interface Profile {
    profile_id: number;
    name: string;
    alias: string;
    personal_statgroup_id: number;
    xp: number;
    level: number;
    leaderboardregion_id: number;
    country: string;
  }
  
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
  
    const data = await response.json();
  
  
    return data;
  };
  