export interface MatchHistoryItem {
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
  
  export interface MatchHistoryStat {
    matchhistoryitems: any;
    matchhistorymember: any;
    matchurls: any;
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
  }
  export interface MatchHistoryItem {
    matchhistory_id: number;
    profile_id: number;
    resulttype: number;
    teamid: number;
    race_id: number;
    xpgained: number;
    counters: string; // Use 'string' for consistency with the first declaration
    matchstartdate: number;
    civilization_id: number;
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
  
  export interface MatchURL {
    matchhistory_id: number;
    profile_id: number;
    url: string;
    size: number;
    datatype: number;
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
  

  