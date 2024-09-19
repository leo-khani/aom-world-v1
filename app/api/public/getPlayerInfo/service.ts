import { supabase } from '../../../../client/supabase';
import { MatchHistoryStat, Profile } from '../../auth/player/getPlayerMatchHistory/types';

interface PlayerData {
  matchHistoryStats: MatchHistoryStat[];
  profiles: Profile[];
}

interface EloData {
  player_id: number;
  player_name: string;
  elo: number;
  elo_change: number;
  last_updated: string;
  match_type: number;
  source: 'API' | 'DB';
}

/**
 * Fetches the player's ELO data from the DB or API.
 *
 * @param {number} playerId The ID of the player to fetch.
 * @param {number} matchType The ID of the match type to fetch.
 * @returns {Promise<EloData>} The player's ELO data.
 */
export const getPlayerElo = async (
  playerId: number,
  matchType: number,
): Promise<EloData> => {

  if (!playerId || !matchType) {
    throw new Error('playerId and matchType are required');
  }

  const { data: existingData, error: fetchError } = await supabase
    .from('player_elos')
    .select('*')
    .eq('player_id', playerId)
    .eq('match_type', matchType)
    .single();

  if (existingData && !fetchError) {
    const timeDiffMinutes = (Date.now() - new Date(existingData.last_updated).getTime()) / (1000 * 60);

    if (timeDiffMinutes < 20) {
      return { ...existingData, source: 'DB' };
    }
  }

  // Fetch from API
  const url = `https://athens-live-api.worldsedgelink.com/community/leaderboard/getRecentMatchHistory?title=athens&profile_ids=${encodeURIComponent(
    JSON.stringify([playerId])
  )}`;

  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
  }

  const data: PlayerData = await response.json();

  if (!data || !data.profiles || !data.matchHistoryStats) {
    throw new Error('Invalid response from API');
  }

  // Find the profile row for the player from data 
  const profile = data.profiles.find((profile: Profile) => profile.profile_id === playerId);
  let playerAlias: string;
  
  if (!profile) { 
    playerAlias = `Unknown Player (${playerId})`;
  } else {
    playerAlias = profile.alias;
  }

  // Process and save the data
  const savedData = await processAndSaveMatchData(data, playerId, playerAlias, matchType);

  // Return data indicating it came from the API
  return { ...savedData, source: 'API' };
};

/**
 * Processes the match data and saves the ELO data to the database
 * @param {PlayerData} data The match data from the API
 * @param {number} userId The ID of the player
 * @param {string} playerAlias The alias of the player
 * @param {number} matchType The type of match to process (1 = RM Solo, 2 = RM Team, etc.)
 * @returns {Promise<EloData>} The saved ELO data
 */
async function processAndSaveMatchData(
  data: PlayerData,
  userId: number,
  playerAlias: string,
  matchType: number
): Promise<EloData> {
  // Step 1: Filter the last 2 matches for the specified match type
  const filteredMatches = data.matchHistoryStats?.filter(match => match.matchtype_id === matchType)?.slice(0, 2);
  if (!filteredMatches || filteredMatches.length < 2) {
    console.log('Not enough relevant matches found');
    return {
      player_id: userId,
      player_name: playerAlias,
      elo: 0,
      elo_change: 0,
      last_updated: new Date().toISOString(),
      match_type: matchType,
      source: 'API'
    } as EloData;
  }

  // Step 2: Calculate ELO and ELO change
  const latestElo = filteredMatches[0].matchhistorymember?.find((m: { profile_id: number; }) => m.profile_id === userId)?.newrating || 0;
  const previousElo = filteredMatches[1].matchhistorymember?.find((m: { profile_id: number; }) => m.profile_id === userId)?.newrating || 0;
  const eloChange = latestElo - previousElo;

  // Step 3: Prepare ELO data for `player_elos`
  const eloData: EloData = {
    player_id: userId,
    player_name: playerAlias,
    elo: latestElo,
    elo_change: eloChange,
    last_updated: new Date().toISOString(),
    match_type: matchType,
    source: 'API'
  };

  try {
    // Step 4: Upsert ELO data in `player_elos` (Update if exists, Insert if not)
    const { data: savedData, error } = await supabase
      .from('player_elos')
      .upsert(eloData, {
        onConflict: 'player_id,match_type',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting ELO data:', error);
      throw error;
    }

    console.log('Saved data:', savedData);

    return savedData;
  } catch (error) {
    console.error('Error saving ELO data:', error);
    throw error;
  }
}

