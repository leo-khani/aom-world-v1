import {supabase} from '@/client/supabase';

/**
 * Fetches player stats from the match history table.
 *
 * @param {string} searchPlayer The player ID to search for.
 * @param {number} matchType The match type to filter by.
 * @returns {Promise<PlayerStats | null>} The player stats, or null if no matches are found.
 */
export const getPlayerStats = async (
  searchPlayer: string,
  matchType: number
): Promise<PlayerStats | null> => {
  try {
    // Fetch player's match history
    const { data: matchHistory, error: matchError } = await supabase
      .from('match_history_members')
      .select('*')
      .eq('profile_id', searchPlayer)
      .eq('reporttype', matchType);

    if (matchError) throw matchError;

    if (!matchHistory || matchHistory.length === 0) {
      return null;
    }

    // Calculate favorite civs
    const civStats = matchHistory.reduce<{ [civId: string]: { games: number; wins: number } }>((acc, match) => {
      const civId = match.civilization_id;
      if (!acc[civId]) {
        acc[civId] = { games: 0, wins: 0 };
      }
      acc[civId].games++;
      if (match.outcome === 1) {  // Assuming 1 means win
        acc[civId].wins++;
      }
      return acc;
    }, {});

    const favoriteCivs = Object.entries(civStats)
      .sort((a, b) => b[1].games - a[1].games)
      .slice(0, 3)
      .map(([civId, stats]) => ({
        civId: parseInt(civId),
        games: stats.games,
        winRate: (stats.wins / stats.games) * 100
      }));

    // Find map with most wins
    const mapStats = matchHistory.reduce<{ [mapId: string]: { games: number; wins: number } }>((acc, match) => {
      const mapId = match.map_id;  // Assuming there's a map_id field
      if (!acc[mapId]) {
        acc[mapId] = { games: 0, wins: 0 };
      }
      acc[mapId].games++;
      if (match.outcome === 1) {
        acc[mapId].wins++;
      }
      return acc;
    }, {});

    const bestMap = Object.entries(mapStats)
      .sort((a, b) => b[1].wins - a[1].wins)[0];

    // Calculate overall stats
    const totalGames = matchHistory.length;
    const totalWins = matchHistory.filter(match => match.outcome === 1).length;

    return {
      playerId: searchPlayer,
      totalGames,
      winRate: (totalWins / totalGames) * 100,
      favoriteCivs,
      bestMap: {
        mapId: parseInt(bestMap[0]),
        wins: bestMap[1].wins,
        games: bestMap[1].games
      },
      currentRating: matchHistory[matchHistory.length - 1].newrating
    };
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return null;
  }
};

interface PlayerStats {
  playerId: string;
  totalGames: number;
  winRate: number;
  favoriteCivs: Array<{
    civId: number;
    games: number;
    winRate: number;
  }>;
  bestMap: {
    mapId: number;
    wins: number;
    games: number;
  };
  currentRating: number;
}