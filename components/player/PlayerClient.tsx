"use client";
import React, { use, useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import apiRouteRelative from "@/config/apiRoute";
import { ReturnData } from "@/app/api/v1/player/getPlayer/types";
import { Tabs, Tab } from "@nextui-org/react";
import { PlayerHeaderProfile } from "../main/player/player-cards";

interface PlayerClientProps {
  playerId: string;
}

const PlayerClient: React.FC<PlayerClientProps> = ({ playerId }) => {
  const [dataPlayer, setDataPlayer] = useState<ReturnData>();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${apiRouteRelative.routes.Player.getPlayer}?userId=${playerId}`,
        {
          method: "Post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playerId }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setDataPlayer(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(dataPlayer);
  }, [playerId]);

  if (!dataPlayer) {
    return <div>Loading...</div>;
  }

  if (!dataPlayer.player) {
    return <div>No player found</div>;
  }

  if (!dataPlayer.player_leaderboard) {
    return <div>No player leaderboard found</div>;
  }
  const data = dataPlayer;
  return (
    <div>
      <Tabs
        aria-label="Options"
        className="bg-transparent"
        placement="start"
        //defaultSelectedKey={"rmsolo" : "rmteam"}
      >
        <Tab
          key="rmsolo"
          title="Solo"
          className="text-sm"
          //isDisabled={!items[0]}
        >
          <PlayerCard
            profile={dataPlayer.player}
            playerLeaderboard={data.player_leaderboard}
          />
        </Tab>

        <Tab
          key="rmteam"
          title="Team"
          className="text-sm"
          //isDisabled={!items[1]}
        >
          <PlayerCard
            profile={dataPlayer.player}
            playerLeaderboard={data.player_leaderboard}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default PlayerClient;
