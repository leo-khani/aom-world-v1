

const apiUrl = process.env.NEXT_PUBLIC_DEV_MODE === '1' 
  ? "http://localhost:3000/api"  // Development API URL
  : "https://www.aomworld.pro/api";  // Production API URL

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
   
}
