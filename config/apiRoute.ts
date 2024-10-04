import Player from "@/components/Player";
import { Plaster } from "next/font/google";

const apiUrl = process.env.NEXT_PUBLIC_DEV_MODE === '1' 
  ? "http://localhost:3000/api"  // Development API URL
  : "https://www.aomworld.pro/api";  // Production API URL

const createAbsolutePath = (path: string) => `${apiUrl}/${path}`;
const createRelativePath = (path: string) => `/api/v1/${path}`;

export const apiDataAbsolute = {
    url: apiUrl,
    version: "v1",
};

const apiRouteRelative = {
    url: "api",
    version: "v1",
    routes: {
        Player : {
            getPlayer: createRelativePath("/player/getPlayer"),
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

export default apiRouteRelative;