"use client";

import React, { useState, useEffect } from "react";
import apiDataRelative from "@/config/api";
import CivImage from "../main/match/CivImage";
import { Progress } from "@nextui-org/react";
import { getProgressColor } from "@/utils/progressColorUtil";

interface PlayerStats {
  playerId: number;
  totalGames: number;
  winRate: number;
  favoriteCivs: {
    civId: number;
    games: number;
    winRate: number;
  }[];
  bestMap: {
    mapId: number | null;
    wins: number;
    games: number;
  };
  currentRating: number;
}

interface MatchHistoryPlayerFavoritesProps {
  id: number;
  matchType: number;
}

export const MatchHistoryPlayerFavorites: React.FC<
  MatchHistoryPlayerFavoritesProps
> = ({ id, matchType }) => {
  const [playerFavorites, setPlayerFavorites] = useState<PlayerStats | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlayerData();
  }, [id, matchType]);

  const fetchPlayerData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(
        apiDataRelative.public.player.getPlayerStats,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, matchType }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = (await response.json()) as PlayerStats;
      setPlayerFavorites(data);
    } catch (error: any) {
      console.error("Error fetching player data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (
    !playerFavorites ||
    !playerFavorites.favoriteCivs ||
    playerFavorites.favoriteCivs.length === 0
  ) {
    return <div>No favorites found.</div>;
  }

  return (
    <div className="">
      {playerFavorites.favoriteCivs.map((favorite, index) => (
        <div key={index} className="flex flex-col gap-2 items-center py-2">
          <CivImage civid={favorite.civId.toString()} />
          <span>Games: {favorite.games}</span>
          <span>
            <Progress
              value={favorite.winRate}
              label={"Win Rate: " + favorite.winRate.toFixed(1) + "%"}
              color={getProgressColor(favorite.winRate)}
            />
          </span>
        </div>
      ))}
      <span className="text-xs">
        This is in beta and may not be accurate...
      </span>
    </div>
  );
};

export default MatchHistoryPlayerFavorites;
