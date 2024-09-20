"use client";

import { Tabs, Tab, BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  PlayerHeaderProfile,
  PlayerCardRankSolo,
} from "../main/player/player-cards";
import { apiData } from "@/config/api";
import { LeaderboardPlayer } from "@/types/getPlayerRanksTypes";
import MatchHistory from "../MatchHistory";

interface PlayerMatchHistoryProps {
  username: string;
}

const PlayerMatchHistory = ({ username }: PlayerMatchHistoryProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<(LeaderboardPlayer[] | null)[]>([]); // Adjusted for two items

  const fetchPlayerData = async (): Promise<(LeaderboardPlayer[] | null)[]> => {
    try {
      const response = await fetch(
        `${apiData.url}${apiData.public.getPlayerRanks}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: username,
          }),
        }
      );

      const result = await response.json();
      console.log({ result });
      return result; // Assume this returns exactly two items
    } catch (error) {
      console.error("Error fetching data:", error);
      return [null, null]; // Ensure fallback to nulls if error occurs
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedItems = await fetchPlayerData();
      setItems(fetchedItems);
      setIsLoading(false);
    };

    fetchData();
  }, [username]);

  const matchTypeNames = ["Solo", "Team"];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(items) || items.every((item) => item === null)) {
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
          {items[0] || items[1] ? (
            <Tabs
              aria-label="Options"
              className="bg-transparent"
              placement="start"
              defaultSelectedKey={items[0] ? "rmsolo" : "rmteam"}
            >
              <Tab
                key="rmsolo"
                title="Solo"
                className="text-sm"
                isDisabled={!items[0]}
              >
                {items[0] && <PlayerHeaderProfile item={items[0][0]} />}
              </Tab>

              <Tab
                key="rmteam"
                title="Team"
                className="text-sm"
                isDisabled={!items[1]}
              >
                {items[1] && <PlayerHeaderProfile item={items[1][0]} />}
              </Tab>
            </Tabs>
          ) : (
            <p className="text-center">No data available</p>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/5 mb-4 lg:mb-0">
            <PlayerCardRankSolo isLoading={isLoading}>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between gap-2 mb-2"
                >
                  <div className="w-1/4 text-sm">{matchTypeNames[index]}</div>
                  {item ? (
                    <>
                      <div className="w-1/4 text-center">
                        {item[0]?.elo || "-"}
                      </div>
                      <div className="w-2/4 flex items-center justify-end gap-1 text-sm">
                        {item[0]?.winPercent}%
                        <span className="text-green-500/80 text-xs">
                          {item[0]?.wins}W
                        </span>
                        <span className="text-red-500/80 text-xs">
                          {item[0]?.losses}L
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
            {items[0] ? (
              <MatchHistory userID={items[0][0].rlUserId || 0} />
            ) : (
              items[1] && <MatchHistory userID={items[1][0].rlUserId || 0} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerMatchHistory;
