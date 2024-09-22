import { supabase } from "@/client/supabase";

interface DbResponse {
  id: number;
  winner_race_id: number;
  wins: number;
  total_matches: number;
  win_rate: number;
}

interface ApiResponse {
  message: 'success' | 'failed';
  count: number;
  match_count: number;
  data: DbResponse[];
}

export const getMostPlayedCivs = async (): Promise<ApiResponse> => {
  try {
    const { data, error } = await supabase
      .from('matches_24_09_winrate_elo_all')
      .select('*');

    if (error) {
      throw error;
    }

    // process the data
    const processedData: DbResponse[] = data.map((d) => ({
      id: d.id,
      winner_race_id: d.winner_race_id,
      wins: d.wins,
      total_matches: d.total_matches,
      win_rate: d.win_rate
    }));

    return {
      message: "success",
      count: processedData.length,
      match_count: processedData.reduce((sum, d) => sum + d.total_matches, 0),
      data: processedData
    };
  } catch (error) {
    console.error("Error in getMostPlayedCivs:", error);
    throw new Error(`Failed to fetch statistics: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
