"use client";

import React, { useEffect, useState } from "react";
import {
  PlayerCardRankSolo,
  PlayerHeaderProfile,
} from "@/components/main/player/player-cards";
import MatchHistory from "@/components/MatchHistory";

interface Profile {
  gameId: string;
  userId: string | null;
  rlUserId: number;
  userName: string;
  avatarUrl: string;
  playerNumber: string | null;
  elo: number;
  eloRating: number;
  eloHighest: number;
  rank: number;
  rankTotal: number;
  region: string;
  wins: number;
  winPercent: number;
  losses: number;
  winStreak: number;
  totalGames: number;
  rankLevel: string;
  rankIcon: string;
  leaderboardKey: string;
}

export default function Player({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<(Profile | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  // Function to fetch data for all match types
  const fetchPlayerData = async (): Promise<(Profile | null)[]> => {
    try {
      const response = await fetch("/api/leaderboard/playerMatchTypeRanks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: params.slug,
        }),
      });

      if (!response.ok) {
        console.error("Server error:", response.statusText);
        return [null, null, null, null, null];
      }

      const result = await response.json();
      return result; // Expecting an array of profiles for match types 0 to 4
    } catch (error) {
      console.error("Error fetching data:", error);
      return [null, null, null, null, null];
    }
  };

  // Fetch data for match types 0 to 4
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedItems = await fetchPlayerData();
      setItems(fetchedItems);
      console.log(fetchedItems);
      setIsLoading(false);
    };

    fetchData();
  }, [params.slug]);

  // Match type names
  const matchTypeNames = ["Solo", "Team", "Deathmatch", "Team Deathmatch"];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!items.some((item) => item !== null)) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className="w-full py-8">
        <div>
          {items[1] && (
            <PlayerHeaderProfile
              username={items[1].userName}
              totalGames={items[1].totalGames}
              winPercent={items[1].winPercent}
              avatarUrl={items[1].avatarUrl}
              winStreak={items[1].winStreak}
              wins={items[1].wins}
              losses={items[1].losses}
            />
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/5">
          <PlayerCardRankSolo isLoading={isLoading}>
            {items.slice(1, 3).map((item, index) => (
              <div key={index} className="flex flex-row justify-evenly gap-4">
                <div className="w-1/5 text-sm">{matchTypeNames[index]}</div>{" "}
                {/* Adjusted index to match names */}
                {item ? (
                  <>
                    <div className="w-1/5">{item.elo}</div>
                    <div className="w-2/5 flex items-center gap-1">
                      {item.winPercent}{" "}
                      <span className="text-green-500/80 text-xs">
                        {item.wins}W
                      </span>
                      <span className="text-red-500/80 text-xs">
                        {item.losses}L
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-1/5">-</div>{" "}
                    {/* Dummy text for null items */}
                    <div className="w-2/5">-</div>
                  </>
                )}
              </div>
            ))}
          </PlayerCardRankSolo>
        </div>

        <div className="w-full">
          {items[1] && (
            <MatchHistory
              userID={items[1]?.rlUserId || items[2]?.rlUserId || null}
            />
          )}
        </div>
      </div>
    </>
  );
}
