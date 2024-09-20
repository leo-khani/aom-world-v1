

const apiUrl = process.env.NEXT_PUBLIC_DEV_MODE === '1' 
  ? "http://localhost:3000/api"  // Development API URL
  : "https://aomworld.com/api";  // Production API URL

export const apiData = {
    url: apiUrl,
    version: "v1",
    public: {
        getLeaderboard: "/public/getLeaderboard",
        getPlayerElo: "/public/getPlayerElo",
    },
    auth: {
        playerMatchTypeRanks: "/auth/leaderboard/playerMatchTypeRanks",
    }
}
