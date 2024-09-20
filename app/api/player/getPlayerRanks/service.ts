import { LeaderboardItem } from "@/types/leaderboardTypes";

// Interfaces
interface PlayerRanksResponse {
  code: number;
  message: string;
  items: PlayerRanksItem[]; // Same as LeaderboardItem but redefined here for clarity
}

interface PlayerRanksItem {
  avatarUrl: string;
  elo: number;
  eloHighest: number;
  eloRating: number;
  gameId: string;
  leaderboardKey: string;
  losses: number;
  playerNumber: number | null;
  rank: number;
  rankIcon: string;
  rankLevel: string;
  rankTotal: number;
  region: string;
  rlUserId: number;
  totalGames: number;
  userId: string | null;
  userName: string;
  winPercent: number;
  winStreak: number;
  wins: number;
}

/**
 * Fetches the player's ELO data from the API.
 *
 * @param {string} userName The username of the player to fetch.
 * @returns {Promise<(LeaderboardItem[] | null)[]>} An array of processed ELO data for match types 1 and 2. Returns null for match types that don't have data.
 */
export const getPlayerRanks = async (userName: string): Promise<(LeaderboardItem[] | null)[]> => {
  if (!userName) {
    throw new Error('userName is required');
  }

  const matchTypes = [1, 2]; // Match types to check
  const eloData: (LeaderboardItem[] | null)[] = [];

  for (const matchType of matchTypes) {
    try {
      // Make POST request
      const response = await fetch(
        `https://api.ageofempires.com/api/agemyth/Leaderboard`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            consoleMatchType: 15,
            count: 100,
            matchType,
            page: 1,
            region: 7,
            searchPlayer: userName,
            sortColumn: 'rank',
            sortDirection: 'ASC',
          }),
        }
      );

      // Handle various response statuses
      if (response.status === 204) {
        eloData.push(null);
        continue;
      }

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
      }

      const data: PlayerRanksResponse = await response.json();

      // Ensure data is valid, return items or null
      if (data && data.items && Array.isArray(data.items) && data.items.length > 0) {
        eloData.push(data.items); // Push only the items array
      } else {
        eloData.push(null); // Push null if no items found
      }
    } catch (error) {
      console.error(`Error fetching data for matchType ${matchType}:`, error);
      eloData.push(null); // In case of error, return null for that matchType
    }
  }

  return eloData; // Return the array with either items or null for each match type
};
