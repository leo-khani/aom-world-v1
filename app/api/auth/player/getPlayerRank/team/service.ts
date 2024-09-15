/**
 * Fetches the leaderboard data from the Age of Empires 4 API and returns the first matching player.
 *
 * @param {string} searchPlayer The player to search for in the leaderboard.
 * @returns {Promise<LeaderboardPlayer | null>} The first matching player from the leaderboard or null if no match is found.
 */
export const getLeaderboard = async (
  searchPlayer: string
): Promise<LeaderboardPlayer | null> => {
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
          matchType: 2,
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
      throw new Error("Network response was not ok");
    }

    const result = (await response.json()) as LeaderboardResponse;

    // Filter the result items to include only the player matching the searchPlayer
    const filteredItems = result.items.filter(
      (item) => item.userName.toLowerCase() === searchPlayer.toLowerCase()
    );

    // Return the first matching item or null if no match is found
    return filteredItems.length > 0 ? filteredItems[0] : null;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch leaderboard data");
  }
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
