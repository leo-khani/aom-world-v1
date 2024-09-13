"use client";
import { Spinner } from "@nextui-org/react";
import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

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

const LeaderboardEloChange: React.FC<LeaderboardEloChangeProps> = ({
  rlUserId,
}) => {
  const [eloChange, setEloChange] = useState<number | null>(null); // State to store the calculated ELO change

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/matchHistory?playerId=${rlUserId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result: MatchData = await response.json();

        // Access match history map for the given player
        const playerMatches = result.mappedMatchHistoryData
          .map((match) => match.matchHistoryMap[rlUserId.toString()])
          .flat()
          .slice(0, 2); // Get the last two matches

        // Calculate the ELO change between the last two matches
        if (playerMatches.length === 2) {
          const eloChange =
            playerMatches[1].newrating - playerMatches[0].newrating;
          setEloChange(eloChange);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [rlUserId]);

  return (
    <div>
      {eloChange !== null ? (
        <div>
          {eloChange > 0 ? (
            <div className="text-green-500 flex items-center gap-1">
              <IconArrowNarrowUp size={16} /> {eloChange}{" "}
            </div>
          ) : (
            <div className="text-red-500 flex items-center gap-1">
              <IconArrowNarrowDown size={16} />
              {Math.abs(eloChange)}
            </div>
          )}
        </div>
      ) : (
        <div>
          <Spinner size="sm" color="success" />
        </div>
      )}
    </div>
  );
};

export default LeaderboardEloChange;
