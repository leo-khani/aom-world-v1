export interface MatchHistoryResponse {
    result: {
      code: number;
      message: string;
    };
    matchHistoryStats: MatchHistory[];
    profiles: Profile[];
  }
  
export interface MatchHistory {
    id: number;
    creator_profile_id: number;
    mapname: string;
    maxplayers: number;
    matchtype_id: number;
    options: string;
    slotinfo: string;
    description: string;
    startgametime: number;
    completiontime: number;
    observertotal: number;
    matchhistoryreportresults: matchhistoryreportresults[];
    matchhistoryitems: any[]; // Assuming this is always an empty array
    matchurls: MatchUrl[];
    matchhistorymember: MatchHistoryMember[];
  }
  
  export interface matchhistoryreportresults {
    matchhistory_id: number;
    profile_id: number;
    resulttype: number;
    teamid: number;
    race_id: number;
    xpgained: number;
    counters: string; // This is a JSON string
    matchstartdate: number;
    civilization_id: number;
  }
  
  export interface MatchUrl {
    profile_id: number;
    url: string;
    size: number;
    datatype: number;
  }
  
  export interface MatchHistoryMember {
    matchhistory_id: number;
    profile_id: number;
    race_id: number;
    statgroup_id: number;
    teamid: number;
    wins: number;
    losses: number;
    streak: number;
    arbitration: number;
    outcome: number;
    oldrating: number;
    newrating: number;
    reporttype: number;
    civilization_id: number;
  }
  
  export interface Profile {
    profile_id: number;
    name: string;
    alias: string;
    personal_statgroup_id: number;
    xp: number;
    level: number;
    leaderboardregion_id: number;
    country: string;
  }