


/**
 * Fetches the leaderboard data from the Age of Empires 4 API.
 *
 * @param {number} [region=7] The region to fetch the leaderboard for.
 * @param {number} [matchType=1] The match type to fetch the leaderboard for.
 * @param {number} [consoleMatchType=15] The console match type to fetch the leaderboard for.
 * @param {string} [searchPlayer=""] The player to search for in the leaderboard.
 * @param {number} [page=1] The page number of the leaderboard to fetch.
 * @param {number} [count=100] The number of players to fetch per page.
 * @param {string} [sortColumn="rank"] The column to sort the leaderboard by.
 * @param {string} [sortDirection="ASC"] The direction to sort the leaderboard in.
 *
 * @returns {Promise<LeaderboardResponse>} The leaderboard response from the API.
 */

import { LeaderboardData } from "@/types/leaderboardTypes";

export const getLeaderboard = async (
  region: number = 7,
  matchType: number = 1,
  consoleMatchType: number = 15,
  searchPlayer: string = "",
  page: number = 1,
  count: number = 100,
  sortColumn: string = "rank",
  sortDirection: string = "ASC"
): Promise<LeaderboardData> => {
  try {
    const response = await fetch(
      "https://api.ageofempires.com/api/agemyth/Leaderboard",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          region,
          matchType,
          consoleMatchType,
          searchPlayer,
          page,
          count,
          sortColumn,
          sortDirection,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = (await response.json()) as LeaderboardData;
    return result;

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


