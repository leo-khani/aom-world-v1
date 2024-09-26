import { supabase } from "@/client/supabase";

// Define your response format
interface ResponseFormat {
  race_id_1: number;
  race_id_2: number;
  wins_race_1: number;
  wins_race_2: number;
  total_matches: number;
}

// Define the overall response structure
type GetRaceStatisticsResponse = {
  data: ResponseFormat[];
  error: string | null;
}

export const getRaceStatistics = async (): Promise<GetRaceStatisticsResponse> => {
  try {
    const { data, error } = await supabase
      .from('race_matchups')         
      .select('race_id_1, race_id_2, wins_race_1, wins_race_2, total_matches');            

    if (error) {
      throw error;             
    }

    return { data: data as ResponseFormat[], error: null }; // Return data as an array of ResponseFormat

  } catch (error: any) {
    console.error('Error fetching data:', error);
    return {
      data: [], // Return an empty array if there's an error
      error: error.message || 'An error occurred'
    };
  }
};
