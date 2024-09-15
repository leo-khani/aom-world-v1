"use client";
import { Tabs, Tab, BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  PlayerHeaderProfile,
  PlayerCardRankSolo,
} from "./main/player/player-cards";
import MatchHistory from "./MatchHistory";

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

interface PlayerProps {
  username: string;
}

const Player = ({ username }: PlayerProps) => {
  // Your code here
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
      const response = await fetch(
        "/api/auth/leaderboard/playerMatchTypeRanks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
          },
          body: JSON.stringify({
            username: username,
          }),
        }
      );

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
      setIsLoading(false);
    };

    fetchData();
  }, [username]);

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
      <div className="px-8 py-1">
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem isDisabled>Player</BreadcrumbItem>
          <BreadcrumbItem isCurrent>{username}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="w-full mb-8">
          {items[1] || items[2] ? (
            <Tabs
              aria-label="Options"
              className="bg-transparent"
              placement="start"
              defaultSelectedKey={items[1] ? "rmsolo" : "rmteam"}
            >
              <Tab
                key="rmsolo"
                title="Solo"
                className="text-sm"
                isDisabled={!items[1]}
              >
                {items[1] && (
                  <PlayerHeaderProfile
                    username={items[1].userName}
                    totalGames={items[1].totalGames}
                    winPercent={items[1].winPercent}
                    avatarUrl={items[1].avatarUrl}
                    winStreak={items[1].winStreak}
                    wins={items[1].wins}
                    losses={items[1].losses}
                    rank={items[1].rank}
                  />
                )}
              </Tab>

              <Tab
                key="rmteam"
                title="Team"
                className="text-sm"
                isDisabled={!items[2]}
              >
                {items[2] && (
                  <PlayerHeaderProfile
                    username={items[2].userName}
                    totalGames={items[2].totalGames}
                    winPercent={items[2].winPercent}
                    avatarUrl={items[2].avatarUrl}
                    winStreak={items[2].winStreak}
                    wins={items[2].wins}
                    losses={items[2].losses}
                    rank={items[2].rank}
                  />
                )}
              </Tab>
            </Tabs>
          ) : (
            <p className="text-center">No data available</p>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/5 mb-4 lg:mb-0">
            <PlayerCardRankSolo isLoading={isLoading}>
              {items.slice(1, 3).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between gap-2 mb-2"
                >
                  <div className="w-1/4 text-sm">{matchTypeNames[index]}</div>
                  {item ? (
                    <>
                      <div className="w-1/4 text-center">{item.elo}</div>
                      <div className="w-2/4 flex items-center justify-end gap-1 text-sm">
                        {item.winPercent}%
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
                      <div className="w-1/4 text-center">-</div>
                      <div className="w-2/4 text-center">-</div>
                    </>
                  )}
                </div>
              ))}
            </PlayerCardRankSolo>
          </div>

          <div className="w-full lg:w-4/5">
            {items[1] ? (
              <MatchHistory userID={items[1].rlUserId || 0} />
            ) : (
              items[2] && <MatchHistory userID={items[2].rlUserId || 0} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
