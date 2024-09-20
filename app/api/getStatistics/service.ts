import { supabase } from "@/client/supabase";

interface MatchHistoryResult {
  race_id: number;
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

  // Check if we have valid cached data
  const cachedEntry = getCachedData(cacheKey);
  if (cachedEntry) {
    return {
      ...cachedEntry.data,
      lastCheck: cachedEntry.timestamp,
      source: 'cache'
    };
  }

  // If no valid cache, proceed with the calculation
  const allData: { race_id: number; resulttype: number }[] = [];
  let from = 0;
  let to = 1000;
  let fetching = true;

  while (fetching) {
    const { data, error } = await supabase
      .from('match_history_report_result')
      .select('race_id, resulttype')
      .range(from, to - 1);

    if (error) {
      throw new Error(`Error fetching match history report results: ${error.message}`);
    }

    if (data.length > 0) {
      allData.push(...data);
      from += 1000;
      to += 1000;
    } else {
      fetching = false;
    }
  }

  // Aggregate results
  const counts: Record<number, { wins: number; losses: number }> = {};
  const totalMatches = allData.length;

  allData.forEach(item => {
    const { race_id, resulttype } = item;

    if (!counts[race_id]) {
      counts[race_id] = { wins: 0, losses: 0 };
    }

    if (resulttype === 1) {
      counts[race_id].wins += 1;
    } else {
      counts[race_id].losses += 1;
    }
  });

  // Convert counts object to an array of results
  const results: MatchHistoryResult[] = Object.entries(counts)
    .map(([race_id, { wins, losses }]) => {
      const count = wins + losses;
      const win_rate = count > 0 ? Math.round((wins / count) * 100) : 0;
      const pick_rate = totalMatches > 0 ? Math.round((count / totalMatches) * 100) : 0;
      return {
        race_id: Number(race_id),
        count,
        wins,
        losses,
        win_rate,
        pick_rate,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 13);

  const result: ResponseFormat = {
    message: 'success',
    count: results.length,
    match_count: totalMatches,
    items: results,
    lastCheck: Date.now(),
    source: 'database'
  };

  // Cache the result
  setCachedData(cacheKey, result);

  return result;
};