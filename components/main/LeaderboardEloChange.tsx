"use client";

import { apiData } from "@/config/api";
import { globalRequestQueue } from "@/utils/requestQueue";
import { Spinner } from "@nextui-org/react";
import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons-react";
import React, { useEffect, useState, useCallback } from "react";

type PlayerEloAPI = {
  player_id: number;
  match_type: number;
  player_name: string;
  elo: number;
  elo_change: number;
  last_updated: string;
  source: string;
};

interface LeaderboardEloChangeProps {
  playerId: number;
  matchType: number;
}
const LeaderboardEloChange: React.FC<LeaderboardEloChangeProps> = ({
  playerId,
  matchType,
}) => {
  const [eloData, setEloData] = useState<PlayerEloAPI | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataWithRetry = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiData.url}${apiData.public.getPlayerElo}?userId=${playerId}&matchType=${matchType}`
      );
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please wait.");
        }
        throw new Error("Failed to fetch player ELO");
      }

      const result: PlayerEloAPI = await response.json();
      setEloData(result);
    } catch (error) {
      // ... (keep the existing error handling logic)
    }
  }, [playerId, matchType]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await globalRequestQueue.enqueue(fetchDataWithRetry);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [fetchDataWithRetry]);

  const renderEloChange = () => {
    if (!eloData || eloData.elo_change === null) return null;
    const Icon =
      eloData.elo_change > 0 ? IconArrowNarrowUp : IconArrowNarrowDown;
    const colorClass =
      eloData.elo_change > 0 ? "text-green-500" : "text-red-500";
    return (
      <div className={`flex items-center gap-1 ${colorClass}`}>
        <Icon size={16} />
        <span>{Math.abs(eloData.elo_change)}</span>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center">
      {isLoading ? (
        <Spinner size="sm" color="success" />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        renderEloChange()
      )}
    </div>
  );
};

export default LeaderboardEloChange;
