import { supabase } from "@/client/supabase";

interface MatchHistoryResult {
  civilization_id: number;
  count: number;
  wins: number;
  losses: number;
  win_rate: number;
  pick_rate: number;
}

interface ResponseFormat {
  message: string;
  count: number;
  match_count: number;
  items: MatchHistoryResult[];
  lastCheck: number;
  source: 'cache' | 'database';
}

interface CacheEntry {
  timestamp: number;
  data: ResponseFormat;
}

const cache: { [key: string]: CacheEntry } = {};

function isCacheValid(key: string): boolean {
  if (cache[key]) {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    return now - cache[key].timestamp < oneHour;
  }
  return false;
}

function getCachedData(key: string): CacheEntry | null {
  if (isCacheValid(key)) {
    return cache[key];
  }
  return null;
}

function setCachedData(key: string, data: ResponseFormat): void {
  cache[key] = {
    timestamp: Date.now(),
    data: data,
  };
}

export const getMostPlayedCivs = async (): Promise<ResponseFormat> => {
  const cacheKey = 'mostPlayedCivs';

  try {
    const cachedEntry = getCachedData(cacheKey);
    if (cachedEntry) {
      return {
        ...cachedEntry.data,
        lastCheck: cachedEntry.timestamp,
        source: 'cache'
      };
    }

    const { data, error } = await supabase.rpc('get_most_played_civs');

    if (error) {
      console.error("Error fetching match history report results:", error);
      throw new Error(`Failed to fetch statistics: ${error.message}`);
    }

    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid data received from the database");
    }

    const totalMatches = data.reduce((sum, item) => sum + Number(item.count), 0);

    const results: MatchHistoryResult[] = data.map(item => ({
      civilization_id: Number(item.civilization_id),
      count: Number(item.count),
      wins: Number(item.wins),
      losses: Number(item.losses),
      win_rate: item.count > 0 ? Math.round((Number(item.wins) / Number(item.count)) * 100) : 0,
      pick_rate: totalMatches > 0 ? Math.round((Number(item.count) / totalMatches) * 100) : 0,
    }));

    const result: ResponseFormat = {
      message: 'success',
      count: results.length,
      match_count: totalMatches,
      items: results,
      lastCheck: Date.now(),
      source: 'database'
    };

    setCachedData(cacheKey, result);

    return result;
  } catch (error) {
    console.error("Error in getMostPlayedCivs:", error);
    throw new Error(`Failed to fetch statistics: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};