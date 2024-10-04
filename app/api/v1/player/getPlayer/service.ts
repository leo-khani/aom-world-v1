import { MatchHistory, MatchHistoryResponse, Profile } from "@/types/getPlayerMatchHistoryTypes";
import { LeaderboardData, LeaderboardItem } from "@/types/leaderboardTypes";
import { RankData, ReturnData } from "./types";

// Interfaces for player profile and rank data



// Main function to assemble the return data
export const getPlayerObject = async (
  playerId: string,
  matchType: number
): Promise<ReturnData | null> => {
  const startTime = Date.now();
  // Fetch player data
  const getPlayerData = await FetchPlayerData(Number(playerId));
  

  if (!getPlayerData || !getPlayerData.matchHistoryStats) {
    return {
      message: "No match history available",
      player: null,
      player_leaderboard: null,
      solo_rank: null,
      team_rank: null,
      // api_response: getPlayerData,
      request_time: 0,
    };
  }

  const playerProfile = getProfile(getPlayerData.profiles, Number(playerId));

  // Extract and sort matches by solo and team rank
  const soloRank = getSoloRankMatches(getPlayerData.matchHistoryStats);
  const teamRank = getTeamRankMatches(getPlayerData.matchHistoryStats);

  // Extract leaderboard data for the player based of requested match type
  const playerLeaderboardData = await fetchLeaderboard(7, matchType, 15, playerProfile?.alias || "", 1, 100, "rank", "ASC");

  // End time
  const endTime = Date.now();
  const requestTime = (endTime - startTime) / 1000 ; // Calculate the time it took to handle the request to seconds



  // Assemble return data
  return {
    message: "Success",
    player: playerProfile, // You can add player profile logic here if needed
    player_leaderboard: playerLeaderboardData, // You can add leaderboard logic here if needed
    solo_rank: soloRank,
    team_rank: teamRank,
    // api_response: getPlayerData,
    request_time: requestTime,
  };
};


// Fetching player data from API
const FetchPlayerData = async (playerId: number): Promise<MatchHistoryResponse> => {
  try {
    const response = await fetch(
      `https://athens-live-api.worldsedgelink.com/community/leaderboard/getRecentMatchHistory?title=athens&profile_ids=${encodeURIComponent(
        JSON.stringify([playerId])
      )}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch player profile");
    }

    const data: MatchHistoryResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow error to handle it upstream
  }
};

// Fetching leaderboard data
const fetchLeaderboard = async (
  region: number = 7,
  matchType: number = 1,
  consoleMatchType: number = 15,
  searchPlayer: string = "",
  page: number = 1,
  count: number = 100,
  sortColumn: string = "rank",
  sortDirection: string = "ASC"
): Promise<LeaderboardItem> => {
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
      throw new Error("Failed to fetch leaderboard data");
    }

    const data: LeaderboardData = await response.json();
    console.log("Leaderboard data:", data.items[0]);
    return data.items[0];
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(error); // Reject the promise on error
  }
};

// Filtring and find player profile
const getProfile = (profiles: Profile[], playerId: number): Profile | null => {
  const profile = profiles.find((profile) => profile.profile_id === playerId);

  
  return profile || null;
};

// Filtering and sorting solo rank matches
const getSoloRankMatches = (matches: MatchHistory[]): RankData | null => {
  const soloRankMatches = matches
    .filter((match) => match.matchtype_id === 1)
    .sort((a, b) => b.completiontime - a.completiontime); // Sort by completiontime descending

  if (soloRankMatches.length === 0) {
    return null;
  }

  return {
    last_match: soloRankMatches[0],
    second_last_match: soloRankMatches[1] || null,
    elo_change: soloRankMatches[0].matchhistorymember[0].newrating - soloRankMatches[0].matchhistorymember[0].oldrating,
    current_elo: soloRankMatches[0].matchhistorymember[0].newrating,
  };
};

// Filtering and sorting team rank matches
const getTeamRankMatches = (matches: MatchHistory[]): RankData | null => {
  const teamRankMatches = matches
    .filter((match) => match.matchtype_id === 2)
    .sort((a, b) => b.completiontime - a.completiontime); // Sort by completiontime descending

  if (teamRankMatches.length === 0) {
    return null;
  }

  return {
    last_match: teamRankMatches[0],
    second_last_match: teamRankMatches[1] || null,
    elo_change: teamRankMatches[0].matchhistorymember[0].newrating - teamRankMatches[0].matchhistorymember[0].oldrating,
    current_elo: teamRankMatches[0].matchhistorymember[0].newrating,
  };
};

