import { MatchHistoryStat, Profile } from '../player/getPlayerMatchHistory/types';

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
  source: 'API';
}

/**
 * Fetches the player's ELO data from the API.
 *
 * @param {number} playerId The ID of the player to fetch.
 * @param {number} matchType The ID of the match type to fetch.
 * @returns {Promise<EloData>} The player's ELO data.
 */
export const getPlayerElo = async (
  playerId: number,
  matchType: number
): Promise<EloData> => {
  if (!playerId || !matchType) {
    throw new Error('playerId and matchType are required');
  }

  // Fetch from API
  const url = `https://athens-live-api.worldsedgelink.com/community/leaderboard/getRecentMatchHistory?title=athens&profile_ids=${encodeURIComponent(
    JSON.stringify([playerId])
  )}`;

  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const data: PlayerData = await response.json();

    if (!data || !Array.isArray(data.profiles) || !Array.isArray(data.matchHistoryStats)) {
      throw new Error('Invalid response from API');
    }

    // Find the profile row for the player from data 
    const profile = data.profiles.find((profile: Profile) => profile.profile_id === playerId);
    const playerAlias = profile ? profile.alias : `Unknown Player (${playerId})`;

    // Process the data
    return processMatchData(data, playerId, playerAlias, matchType);
  } catch (error) {
    console.error("Error fetching player's ELO data:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to get ELO data for player ID ${playerId}: ${error.message}`);
    } else {
      throw new Error(`Failed to get ELO data for player ID ${playerId}: ${String(error)}`);
    }
  }
};

/**
 * Processes the match data and returns the ELO data
 * @param {PlayerData} data The match data from the API
 * @param {number} userId The ID of the player
 * @param {string} playerAlias The alias of the player
 * @param {number} matchType The type of match to process (1 = RM Solo, 2 = RM Team, etc.)
 * @returns {EloData} The processed ELO data
 */
function processMatchData(
  data: PlayerData,
  userId: number,
  playerAlias: string,
  matchType: number
): EloData {
  // Step 1: Filter the last 2 matches for the specified match type
  const filteredMatches = data.matchHistoryStats.filter(match => match.matchtype_id === matchType).slice(0, 2);
  
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
  const latestElo = filteredMatches[0].matchhistorymember?.find((m: { profile_id: number; }) => m.profile_id === userId)?.newrating || 0;
  const previousElo = filteredMatches[1].matchhistorymember?.find((m: { profile_id: number; }) => m.profile_id === userId)?.newrating || 0;
  const eloChange = latestElo - previousElo;

  // Step 3: Prepare and return ELO data
  return {
    player_id: userId,
    player_name: playerAlias,
    elo: latestElo,
    elo_change: eloChange,
    last_updated: new Date().toISOString(),
    match_type: matchType,
    source: 'API'
  };
}
