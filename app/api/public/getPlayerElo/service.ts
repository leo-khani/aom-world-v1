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
  last_updated: string; // Changed to string for ISO format
  match_type: number;
  source: 'API' | 'DB';
}

export const getPlayerMatchHistory = async (playerId: string, matchType: number): Promise<EloData> => {
  console.log(`Fetching data for player ${playerId} and match type ${matchType}`);

  const { data: existingData, error: fetchError } = await supabase
    .from('player_elos')
    .select('*')
    .eq('player_id', playerId)
    .eq('match_type', matchType)
    .single();

  if (existingData && !fetchError) {
    const lastUpdated = new Date(existingData.last_updated).getTime();
    const now = Date.now();
    const timeDiffMinutes = (now - lastUpdated) / (1000 * 60);

    console.log('Current Time (UTC):', new Date(now).toISOString());
    console.log('Last Updated from DB (UTC):', new Date(lastUpdated).toISOString());
    console.log('Time Difference (minutes):', timeDiffMinutes.toFixed(2));

    if (timeDiffMinutes < 20) {
      console.log("Returning data from DB");
      return { ...existingData, source: 'DB' } as EloData;
    } else {
      console.log("Data is outdated, fetching from API");
    }
  } else {
    console.log("No existing data found or error occurred, fetching from API");
  }

  // If no recent data, fetch from API
  const url = `https://athens-live-api.worldsedgelink.com/community/leaderboard/getRecentMatchHistory?title=athens&profile_ids=${encodeURIComponent(
    JSON.stringify([playerId])
  )}`;

  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
  }

  const data: PlayerData = await response.json();
  console.log(`Received data from API for player ${playerId}`);

  // Find the profile row for the player from data 
  const profile = data.profiles.find((profile: Profile) => profile.profile_id === parseInt(playerId));
  
  let playerAlias: string;
  
  if (!profile) { 
    console.warn("Player not found in data, saving with default alias");
    playerAlias = `Unknown Player (${playerId})`;
  } else {
    playerAlias = profile.alias;
  }

  // Process and save the data
  const savedData = await processAndSaveMatchData(data, parseInt(playerId), playerAlias, matchType);

  // Return data indicating it came from the API
  return { ...savedData, source: 'API' };
};

async function processAndSaveMatchData(data: PlayerData, userId: number, playerAlias: string, matchType: number): Promise<EloData> {
  // Step 1: Filter the last 2 matches for the specified match type
  const filteredMatches = data.matchHistoryStats
    .filter(match => match.matchtype_id === matchType)
    .sort((a, b) => b.completiontime - a.completiontime)
    .slice(0, 2);

  if (filteredMatches.length < 2) {
    console.log('Not enough relevant matches found');
    return {
      player_id: userId,
      player_name: playerAlias,
      elo: 0,
      elo_change: 0,
      last_updated: new Date().toISOString(),
      match_type: matchType,
      source: 'API'
    };
  }

  // Step 2: Calculate ELO and ELO change
  const latestMatch = filteredMatches[0];
  const previousMatch = filteredMatches[1];

  const latestElo = latestMatch.matchhistorymember.find((m: { profile_id: number; }) => m.profile_id === userId)?.newrating || 0;
  const previousElo = previousMatch.matchhistorymember.find((m: { profile_id: number; }) => m.profile_id === userId)?.newrating || 0;
  const eloChange = latestElo - previousElo;

  // Step 3: Prepare ELO data for `player_elos`
  const eloData = {
    player_id: userId,
    player_name: playerAlias,
    elo: latestElo,
    elo_change: eloChange,
    last_updated: new Date().toISOString(),
    match_type: matchType
  };

  console.log('ELO Data to be saved:', eloData);

  // Step 4: Upsert ELO data in `player_elos` (Update if exists, Insert if not)
  const { data: savedData, error } = await supabase
    .from('player_elos')
    .upsert([eloData], {
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

  return { ...savedData, source: 'API' };
}