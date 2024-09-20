import { LeaderboardPlayer } from "@/types/getPlayerRanksTypes";

/**
 * Fetches the leaderboard data from the Age of Empires 4 API for matchType 1 and 2
 * and returns an array containing the first matching player for each matchType.
 *
 * @param {string} searchPlayer The player to search for in the leaderboard.
 * @returns {Promise<Array<LeaderboardPlayer | null>>} An array of the first matching player from each matchType or null if no match is found.
 */
export const getLeaderboard = async (
  searchPlayer: string
): Promise<Array<LeaderboardPlayer | null>> => {
  const items: Array<LeaderboardPlayer | null> = [];

  // Check only for matchType 1 and 2
  const matchTypes = [1, 2];

  for (const matchType of matchTypes) {
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

      if (response.status === 204) {
        console.log(`No content received for matchType ${matchType}`);
        items.push(null);
        continue;
      }

      if (!response.ok) {
        console.error(`Error fetching data for matchType ${matchType}: ${response.statusText}`);
        items.push(null);
        continue;
      }

      const responseText = await response.text();

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (error) {
        console.error(`Error parsing JSON for matchType ${matchType}:`, error);
        console.log(`Raw response for matchType ${matchType}:`, responseText);
        items.push(null);
        continue;
      }

      if (!result || !Array.isArray(result.items)) {
        console.error(`Invalid response format for matchType ${matchType}:`, result);
        items.push(null);
        continue;
      }

      const filteredItems = result.items.filter(
        (item: { userName: string }) => item.userName.toLowerCase() === searchPlayer.toLowerCase()
      );

      items.push(filteredItems.length > 0 ? filteredItems[0] : null);
    } catch (error) {
      console.error(`Unexpected error fetching data for matchType ${matchType}:`, error);
      items.push(null);
    }
  }

  return items;
};

/**
 * The response from the Age of Empires 4 API when fetching the leaderboard.
 */
export interface LeaderboardResponse {
  items: LeaderboardPlayer[];
  total: number;
}
