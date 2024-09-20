import { supabase } from "@/client/supabase";
import { MatchHistoryResponse } from "@/types/getPlayerMatchHistoryTypes";

export const getPlayerMatchHistory = async (
  playerId: string
): Promise<MatchHistoryResponse> => {
  const url = `https://athens-live-api.worldsedgelink.com/community/leaderboard/getRecentMatchHistory?title=athens&profile_ids=${encodeURIComponent(
    JSON.stringify([playerId])
  )}`;

  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data: MatchHistoryResponse = await response.json();
    await saveMatchData(data);
    return data;
  } catch (error) {
    console.error("Error fetching match history:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch match history for player ID ${playerId}: ${error.message}`);
    } else {
      throw new Error(`Failed to fetch match history for player ID ${playerId}: Unknown error`);
    }
  }
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
    civilization_id: result.civilization_id,
  }));

  try {
    const { data: insertedData, error } = await supabase
      .from('match_history_report_result')
      .upsert(upsertData, {
        onConflict: 'matchhistory_id',
        ignoreDuplicates: true,
      });

    if (error) {
      throw new Error(`Error inserting match history report results: ${error.message}`);
    }

    console.log('Successfully inserted/updated match history report results:', insertedData);
    return insertedData;
  } catch (error) {
    console.error('Error saving match data:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to save match data: ${error.message}`);
    } else {
      throw new Error('Failed to save match data: Unknown error');
    }
  }
};
