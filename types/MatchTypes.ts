export interface Counters {
    mapID: number;
    postGameAward_HighestScore: number;
    postGameAward_MostDeaths: number;
    postGameAward_MostImprovements: number;
    postGameAward_MostKills: number;
    postGameAward_MostResources: number;
    postGameAward_MostTitanKills: number;
    postGameAward_largestArmy: number;
    rankedMatch: number;
    score_Economic: number;
    score_Military: number;
    score_Technology: number;
    score_Total: number;
    stat_BuildingsRazed: number;
    stat_UnitsKilled: number;
    stat_UnitsLost: number;
    civDefeated_1?: number;
  }
  
  export interface MatchHistoryReportResult {
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
  
  export interface MatchData {
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
    matchhistoryreportresults: MatchHistoryReportResult[];
    matchhistoryitems: any[]; // Assuming this can be any type of item
    matchurls: MatchUrl[];
    matchhistorymember: MatchHistoryMember[];
  }