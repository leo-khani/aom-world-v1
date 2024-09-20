const defaultApiUrl = "https://www.aomworld.pro/api";  // Default Production API URL
const devApiUrl = "http://localhost:3000/api";  // Development API URL

const apiUrl = process.env.NEXT_PUBLIC_DEV_MODE === '1' && devApiUrl 
  ? devApiUrl 
  : defaultApiUrl;

export const apiData = {
    url: apiUrl,
    version: "v1",
    public: {
        getLeaderboard: "/getLeaderboard",
        getPlayerElo: "/getPlayerElo",
        playerMatchTypeRanks: "/leaderboard/playerMatchTypeRanks",
        getPlayerMatchHistory: "/player/getPlayerMatchHistory",
        getPlayerRanks: "/player/getPlayerRanks",
        getStatistics: "/getStatistics",
    },
};
