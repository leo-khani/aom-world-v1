"use client";

import { apiData } from "@/config/api";
import React, { useEffect, useState } from "react";
import PlayerMatchHistory from "./section/PlayerMatchHistory";

interface PlayerProps {
  playerId: string;
}

const Player: React.FC<PlayerProps> = ({ playerId }) => {
  const [playerName, setPlayerName] = useState<string>("");

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch(
          `${apiData.url}${apiData.public.getPlayerElo}?userId=${playerId}&matchType=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch player ELO data");
        }

        const data = await response.json();
        setPlayerName(data.player_name);
        console.log(data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  return (
    <div>{playerName && <PlayerMatchHistory username={playerName} />}</div>
  );
};

export default Player;
