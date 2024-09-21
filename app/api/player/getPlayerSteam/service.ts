import { MatchHistoryResponse, Profile } from "@/types/getPlayerMatchHistoryTypes";

interface ReturnData {
  profiles: Profile[];
  result: {
    code: number;
    message: string;
  };
  steamId?: string;
  steamProfileUrl?: string;
  country?: string;
}

export const getPlayerSteamProfile = async (
  playerId: string
): Promise<ReturnData> => {
  const url = `https://athens-live-api.worldsedgelink.com/community/leaderboard/getRecentMatchHistory?title=athens&profile_ids=${encodeURIComponent(
    JSON.stringify([playerId])
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: MatchHistoryResponse = await response.json();

    // Find the profile that matches the given playerId
    const matchingProfile = data.profiles.find(profile => profile.profile_id.toString() === playerId);

    let returnData: ReturnData = {
      profiles: [],
      result: data.result
    };

    if (matchingProfile) {
      // Extract Steam ID from the name field
      const steamId = matchingProfile.name.split('/')[2];
      
      // Create Steam profile URL
      const steamProfileUrl = `https://steamcommunity.com/profiles/${steamId}`;

      // Create Country flag URL
      const country = `https://flagcdn.com/${matchingProfile.country}.svg`;

      returnData = {
        profiles: [matchingProfile],
        result: data.result,
        steamId,
        steamProfileUrl,
        country,
      };
    }

    return returnData;
  } catch (error) {
    console.error('Error fetching match history:', error);
    throw error;
  }
};