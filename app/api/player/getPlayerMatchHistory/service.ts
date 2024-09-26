import { supabase } from "@/client/supabase";
import { MatchHistoryResponse, Profile } from "@/types/getPlayerMatchHistoryTypes";

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
    throw new Error(`Failed to fetch match history for player ID ${playerId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const saveMatchData = async (data: MatchHistoryResponse) => {
  if (!data.matchHistoryStats || data.matchHistoryStats.length === 0) {
    console.log("No match history stats to save");
    return;
  }

  // Collect all match history report results with matchtype_id 1
  const allMatchHistoryReportResults = data.matchHistoryStats
    .filter(stat => stat.matchtype_id === 1) // Filter for matchtype_id 1
    .flatMap(stat => stat.matchhistoryreportresults || []);

  if (allMatchHistoryReportResults.length === 0) {
    console.log("No match history report results to save");
    return;
  }

  // Prepare the data for upsert into match history report results
  const upsertMatchData = allMatchHistoryReportResults.map(result => ({
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

  // Prepare the data for upsert into profiles
  const profiles: Profile[] = data.profiles.map(profile => ({
    profile_id: profile.profile_id,
    name: profile.name,
    alias: profile.alias,
    personal_statgroup_id: profile.personal_statgroup_id,
    xp: profile.xp,
    level: profile.level,
    leaderboardregion_id: profile.leaderboardregion_id,
    country: profile.country,
  })).filter((profile, index, self) =>
    index === self.findIndex((p) => p.profile_id === profile.profile_id)
  ); // Remove duplicates

  try {
    // Upsert match history report results
    const { data: insertedMatchData, error: matchError } = await supabase
      .from('match_history_report_result')
      .upsert(upsertMatchData, {
        onConflict: 'matchhistory_id',
        ignoreDuplicates: true,
      });

    if (matchError) {
      throw new Error(`Error inserting match history report results: ${matchError.message}`);
    }

    console.log('Successfully inserted/updated match history report results:', insertedMatchData);

    // Upsert profiles
    const { data: insertedProfiles, error: profileError } = await supabase
      .from('profiles')
      .upsert(profiles, {
        onConflict: 'profile_id',
        ignoreDuplicates: true,
      });

    if (profileError) {
      throw new Error(`Error inserting profiles: ${profileError.message}`);
    }

    console.log('Successfully inserted/updated profiles:', insertedProfiles);

    return { insertedMatchData, insertedProfiles };
  } catch (error) {
    console.error('Error saving match data:', error);
    throw new Error(`Failed to save match data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
