const apiUrl = process.env.NEXT_PUBLIC_DEV_MODE === '1' 
  ? "http://localhost:3000/api"  // Development API URL
  : "https://www.aomworld.pro/api";  // Production API URL

const createAbsolutePath = (path: string) => `${apiUrl}/${path}`;
const createRelativePath = (path: string) => `/api/${path}`;

export const apiDataAbsolute = {
    url: apiUrl,
    version: "v1",
    public: {
        getLeaderboard: createAbsolutePath("/getLeaderboard"),
        getPlayerElo: createAbsolutePath("/getPlayerElo"),
        getPlayerInfo: createAbsolutePath("/getPlayerInfo"),
        getRaceStatistics: createAbsolutePath("/getRaceStatistics"),
        getStatistics: createAbsolutePath("/getStatistics"),
        playerMatchTypeRanks: createAbsolutePath("/playerMatchTypeRanks"),
        player: {
            getPlayerById: createAbsolutePath("/player/getPlayerById"),
            getPlayerMatchHistory: createAbsolutePath("/player/getPlayerMatchHistory"),
            getPlayerRanks: createAbsolutePath("/player/getPlayerRanks"),
            getPlayerSteam: createAbsolutePath("/player/getPlayerSteam"),
            getPlayerStats: createAbsolutePath("/player/getPlayerStats"),
        
        }
    },
    private: {
        hotkey: {
            addHotkey: createAbsolutePath("/private/hotkey/addHotkey"),
            getHotkey: createAbsolutePath("/private/hotkey/getHotkey"),
            modifyHotkey: createAbsolutePath("/private/hotkey/modifyHotkey"),
        }
    },
};

const apiDataRelative = {
    url: "api",
    version: "v1",
    public: {
        getLeaderboard: createRelativePath("/getLeaderboard"),
        getPlayerElo: createRelativePath("/getPlayerElo"),
        getPlayerInfo: createRelativePath("/getPlayerInfo"),
        getRaceStatistics: createRelativePath("/getRaceStatistics"),
        getStatistics: createRelativePath("/getStatistics"),
        playerMatchTypeRanks: createRelativePath("/playerMatchTypeRanks"),
        player: {
            getPlayerById: createRelativePath("/player/getPlayerById"),
            getPlayerMatchHistory: createRelativePath("/player/getPlayerMatchHistory"),
            getPlayerRanks: createRelativePath("/player/getPlayerRanks"),
            getPlayerSteam: createRelativePath("/player/getPlayerSteam"),
            getPlayerStats: createRelativePath("/player/getPlayerStats"),
        }
    },
    private: {
        hotkey: {
            addHotkey: createRelativePath("/private/hotkey/addHotkey"),
            getHotkey: createRelativePath("/private/hotkey/getHotkey"),
            modifyHotkey: createRelativePath("/private/hotkey/modifyHotkey"),
        }
    },
};

export default apiDataRelative;