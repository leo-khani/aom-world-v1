"use client";

import { Spinner } from "@nextui-org/react";
import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

// Interfaces
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

// Main component
const LeaderboardEloChange: React.FC<LeaderboardEloChangeProps> = ({
  rlUserId,
}) => {
  const [eloChange, setEloChange] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/matchHistory?playerId=${rlUserId}`);
        if (!response.ok) {
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
        setError("Error fetching data. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [rlUserId]);

  // Helper function to render ELO change
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

// TODO: Implement error boundary for better error handling
// TODO: Add unit tests for component and helper functions
// TODO: Optimize performance by memoizing expensive calculations
// TODO: Implement caching strategy for API responses
