/**
 * Fetches the leaderboard data from the Age of Empires 4 API for each matchType (0 to 4)
 * and returns an array containing the first matching player for each matchType.
 *
 * @param {string} searchPlayer The player to search for in the leaderboard.
 * @returns {Promise<Array<LeaderboardPlayer | null>>} An array of the first matching player from each matchType or null if no match is found.
 */
export const getLeaderboard = async (
  searchPlayer: string
): Promise<Array<LeaderboardPlayer | null>> => {
  const items: Array<LeaderboardPlayer | null> = []; // Array to store the results for each matchType

  // Loop over the matchTypes from 0 to 4
  for (let matchType = 0; matchType <= 4; matchType++) {
    try {
      const response = await fetch(
        "https://api.ageofempires.com/api/agemyth/Leaderboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            region: 7,
            matchType: matchType,
            consoleMatchType: 15,
            searchPlayer: searchPlayer,
            page: 1,
            count: 10,
            sortColumn: "rank",
            sortDirection: "ASC",
          }),
        }
      );

      if (!response.ok) {
        console.error(`Error fetching data for matchType ${matchType}:`, response.statusText);
        items.push(null); // Add null if there's an error
        continue; // Continue to the next iteration
      }

      const result = (await response.json()) as LeaderboardResponse;

      // Filter the result items to include only the player matching the searchPlayer
      const filteredItems = result.items.filter(
        (item) => item.userName.toLowerCase() === searchPlayer.toLowerCase()
      );

      // Add the first matching item or null if no match is found
      items.push(filteredItems.length > 0 ? filteredItems[0] : null);
    } catch (error) {
      console.error(`Error fetching data for matchType ${matchType}:`, error);
      items.push(null); // Add null to maintain the order
    }
  }

  return items; // Return the array of results
};

/**
 * The response from the Age of Empires 4 API when fetching the leaderboard.
 */
export interface LeaderboardResponse {
  items: LeaderboardPlayer[];
  total: number;
}

/**
 * A player in the leaderboard.
 */
export interface LeaderboardPlayer {
  rank: number;
  rlUserId: number;
  userName: string;
  elo: number;
  eloHighest: number;
  wins: number;
  losses: number;
  winStreak: number;
  totalGames: number;
  region: string;
  rankLevel: string;
  rankIcon: string;
  leaderboardKey: string;
  avatarUrl: string;
}
