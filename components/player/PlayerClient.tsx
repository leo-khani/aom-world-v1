"use client";
import React, { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import apiRouteRelative from "@/config/apiRoute";
import { ReturnData } from "@/app/api/v1/player/getPlayer/types";
import { Tabs, Tab } from "@nextui-org/react";

interface PlayerClientProps {
  playerId: string;
}

const PlayerClient: React.FC<PlayerClientProps> = ({ playerId }) => {
  const [dataPlayerSolo, setDataPlayerSolo] = useState<ReturnData>();

  const [dataPlayerTeam, setDataPlayerTeam] = useState<ReturnData>();

  const fetchDataSoloRank = async () => {
    try {
      const response = await fetch(
        `${apiRouteRelative.routes.Player.getPlayer}?userId=${playerId}`,
        {
          method: "POST", // "Post" should be uppercase
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            playerId: Number(playerId),
            matchType: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setDataPlayerSolo(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataTeamRank = async () => {
    try {
      const response = await fetch(
        `${apiRouteRelative.routes.Player.getPlayer}?userId=${playerId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            playerId: Number(playerId),
            matchType: 2,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setDataPlayerTeam(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDataSoloRank();
    fetchDataTeamRank();
    console.log(setDataPlayerSolo);
  }, [playerId]);

  if (!dataPlayerSolo || !dataPlayerTeam) {
    return <div>Loading...</div>;
  }

  if (!dataPlayerSolo.player || !dataPlayerTeam.player) {
    return <div>No player found</div>;
  }

  if (
    !dataPlayerSolo.player_leaderboard ||
    !dataPlayerTeam.player_leaderboard
  ) {
    return <div>No player leaderboard found</div>;
  }

  return (
    <div>
      <Tabs
        aria-label="Options"
        className="bg-transparent"
        placement="start"
        defaultSelectedKey={dataPlayerSolo ? "rmsolo" : "rmteam"}
      >
        <Tab
          key="rmsolo"
          title="Solo"
          className="text-sm"
          isDisabled={!dataPlayerSolo}
        >
          <PlayerCard
            profile={dataPlayerSolo.player}
            playerLeaderboard={dataPlayerSolo.player_leaderboard}
          />
        </Tab>

        <Tab
          key="rmteam"
          title="Team"
          className="text-sm"
          isDisabled={!dataPlayerTeam}
        >
          <PlayerCard
            profile={dataPlayerTeam.player}
            playerLeaderboard={dataPlayerTeam.player_leaderboard}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default PlayerClient;
