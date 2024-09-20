<<<<<<< HEAD
const defaultApiUrl = "https://www.aomworld.pro/api";  // Default Production API URL
const devApiUrl = "http://localhost:3000/api";  // Development API URL

const apiUrl = process.env.NEXT_PUBLIC_DEV_MODE === '1' && devApiUrl 
  ? devApiUrl 
  : defaultApiUrl;
=======
const apiUrl = process.env.NEXT_PUBLIC_DEV_MODE === '1' 
  ? "http://localhost:3000/api"  // Development API URL
  : "https://www.aomworld.pro/api";  // Production API URL
>>>>>>> d99291ea2030bbe4507f7938dd0be2f159c0a8a0

  

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
