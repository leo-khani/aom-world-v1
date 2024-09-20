import { supabase } from "@/client/supabase";

interface MatchHistoryResult {
  race_id: number;
  count: number; // Total matches played
  wins: number; // Number of wins
  losses: number; // Number of losses
  win_rate: number; // Win rate as a percentage
  pick_rate: number; // Pick rate as a percentage
}

interface ResponseFormat {
  message: string;
  count: number;
  match_count: number;
  items: MatchHistoryResult[];
}

export const getMostPlayedCivs = async (): Promise<ResponseFormat> => {
  const allData: { race_id: number; resulttype: number }[] = [];
  let from = 0;
  let to = 1000; // Adjust the range as needed
  let fetching = true;

  while (fetching) {
    const { data, error } = await supabase
      .from('match_history_report_result')
      .select('race_id, resulttype')
      .range(from, to - 1); // Fetch from `from` to `to`

    if (error) {
      throw new Error(`Error fetching match history report results: ${error.message}`);
    }

    if (data.length > 0) {
      allData.push(...data);
      from += 1000; // Move the range for the next fetch
      to += 1000;
    } else {
      fetching = false; // No more data to fetch
    }
  }

  // Aggregate results
  const counts: Record<number, { wins: number; losses: number }> = {};
  const totalMatches = allData.length; // Total matches fetched

  allData.forEach(item => {
    const { race_id, resulttype } = item;

    if (!counts[race_id]) {
      counts[race_id] = { wins: 0, losses: 0 };
    }

    if (resulttype === 1) { // Assuming resulttype 1 indicates a win
      counts[race_id].wins += 1;
    } else {
      counts[race_id].losses += 1;
    }
  });

  // Convert counts object to an array of results
  const results: MatchHistoryResult[] = Object.entries(counts)
    .map(([race_id, { wins, losses }]) => {
      const count = wins + losses; // Total matches for this race_id
      const win_rate = count > 0 ? Math.round((wins / count) * 100) : 0; // Round win rate
      const pick_rate = totalMatches > 0 ? Math.round((count / totalMatches) * 100) : 0; // Round pick rate
      return {
        race_id: Number(race_id),
        count,
        wins,
        losses,
        win_rate,
        pick_rate,
      };
    })
    .sort((a, b) => b.count - a.count) // Sort by total matches descending
    .slice(0, 13); // Limit to the top 13

  return {
    message: 'success',
    count: results.length,
    match_count: totalMatches, // Total number of matches
    items: results,
  };
};
