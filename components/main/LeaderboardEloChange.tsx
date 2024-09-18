"use client";

import { Spinner } from "@nextui-org/react";
import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons-react";
import React, { useEffect, useState, useCallback } from "react";

// Interfaces (unchanged)
interface Match {
  oldrating: number;
  newrating: number;
}

interface MatchData {
  mappedMatchHistoryData: {
    matchHistoryMap: Record<string, Match[]>;
  }[];
}

interface LeaderboardEloChangeProps {
  rlUserId: number;
}

// Helper function for delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Main component
const LeaderboardEloChange: React.FC<LeaderboardEloChangeProps> = ({
  rlUserId,
}) => {
  const [eloChange, setEloChange] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataWithRetry = useCallback(
    async (retries = 3, backoff = 300) => {
      try {
        const response = await fetch(`/api/matchHistory?playerId=${rlUserId}`);
        if (!response.ok) {
          if (response.status === 429) {
            // Too Many Requests
            throw new Error("Too many requests. Please wait.");
          }
          throw new Error("Failed to fetch match history");
        }

        const result: MatchData = await response.json();
        const playerMatches = result.mappedMatchHistoryData
          .flatMap((match) => match.matchHistoryMap[rlUserId.toString()])
          .slice(0, 2);

        if (playerMatches.length === 2) {
          const change =
            playerMatches[0].newrating - playerMatches[1].newrating;
          setEloChange(change);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (retries > 0) {
          if (error instanceof Error) {
            setError(
              `${error.message} Retrying in ${backoff / 1000} seconds...`
            );
          } else {
            setError(`Unknown error. Retrying in ${backoff / 1000} seconds...`);
          }
          await delay(backoff);
          return fetchDataWithRetry(retries - 1, backoff * 2);
        }
        setError("Error fetching data. Please wait and try again later.");
      }
    },
    [rlUserId]
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await fetchDataWithRetry();
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

  // Helper function to render ELO change (unchanged)
  const renderEloChange = () => {
    if (eloChange === null) return null;
    const Icon = eloChange > 0 ? IconArrowNarrowUp : IconArrowNarrowDown;
    const colorClass = eloChange > 0 ? "text-green-500" : "text-red-500";
    return (
      <div className={`flex items-center gap-1 ${colorClass}`}>
        <Icon size={16} />
        <span>{Math.abs(eloChange)}</span>
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
