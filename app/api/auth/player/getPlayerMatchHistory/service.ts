import { supabase } from "@/client/supabase";
import { MatchHistoryResponse } from "@/types/getPlayerMatchHistoryTypes";



  export const getPlayerMatchHistory = async (
    playerId: string
  ): Promise<MatchHistoryResponse> => {
    const url = `https://athens-live-api.worldsedgelink.com/community/leaderboard/getRecentMatchHistory?title=athens&profile_ids=${encodeURIComponent(
      JSON.stringify([playerId])
    )}`;
  
    const response = await fetch(url, { method: "GET" });

  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const data: MatchHistoryResponse = await response.json();

    await saveMatchData(data);
    return data;
  };

  export const saveMatchData = async (data: MatchHistoryResponse) => {
    if (!data.matchHistoryStats || data.matchHistoryStats.length === 0) {
      console.log("No match history stats to save");
      return;
    }
  
    const matchHistoryReportResults = data.matchHistoryStats[0].matchhistoryreportresults;
  
    if (!matchHistoryReportResults || matchHistoryReportResults.length === 0) {
      console.log("No match history report results to save");
      return;
    }
  
    // Prepare the data for upsert
    const upsertData = matchHistoryReportResults.map(result => ({
      matchhistory_id: result.matchhistory_id,
      profile_id: result.profile_id,
      resulttype: result.resulttype,
      teamid: result.teamid,
      race_id: result.race_id,
      xpgained: result.xpgained,
      counters: result.counters,
      matchstartdate: result.matchstartdate,
      civilization_id: result.civilization_id
    }));
  
    const { data: insertedData, error } = await supabase
      .from('match_history_report_result')
      .upsert(upsertData, {
        onConflict: 'matchhistory_id',
        ignoreDuplicates: true 
      });
  
    if (error) {
      console.error('Error inserting match history report results:', error);
      throw error;
    }
  
    console.log('Successfully inserted/updated match history report results:', insertedData);
    return insertedData;
  };

  
  

  