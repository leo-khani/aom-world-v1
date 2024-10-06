"use client";
import React, { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import apiRouteRelative from "@/config/apiRoute";
import { ReturnData } from "@/app/api/v1/player/getPlayer/types";
import { Tabs, Tab } from "@nextui-org/react";
import PlayerLastMatchCard from "./PlayerLastMatchCard";
import PlayerMatchHistoryContent from "./PlayerMatchHistoryContent";

interface PlayerClientProps {
  playerId: string;
}

const PlayerClient: React.FC<PlayerClientProps> = ({ playerId }) => {
  const [dataPlayerSolo, setDataPlayerSolo] = useState<ReturnData>();

  const [dataPlayerTeam, setDataPlayerTeam] = useState<ReturnData>();
  const [selectedTab, setSelectedTab] = useState<string>("rmsolo"); // Add state to track the selected tab

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

  const fetchDataAllMatches = async () => {
    try {
      const response = await fetch(
        `${apiRouteRelative.routes.Player.getPlayer}?userId=${playerId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            playerId: Number(playerId),
            matchType: 3,
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
  useEffect(() => {
    fetchDataSoloRank();
    fetchDataTeamRank();
    fetchDataAllMatches();
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

  if (!dataPlayerSolo.solo_rank || !dataPlayerTeam.solo_rank) {
    return <div>No solo rank found</div>;
  }

  if (!dataPlayerSolo.team_rank || !dataPlayerTeam.team_rank) {
    return <div>No team rank found</div>;
  }

  return (
    <div>
      <Tabs
        aria-label="Options"
        className="bg-transparent"
        placement="start"
        defaultSelectedKey="rmsolo" // Solo tab is selected by default
        selectedKey={selectedTab} // Bind the selected tab to state
        onSelectionChange={(key) => setSelectedTab(key as string)} // Update selected tab state
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

      <div className="flex justify-center mt-4">
        {/* Conditionally render last match and second last match based on the selected tab */}
        <PlayerLastMatchCard
          lastMatch={
            selectedTab === "rmsolo"
              ? dataPlayerSolo.solo_rank.last_match
              : dataPlayerTeam.team_rank.last_match
          }
          secondLastMatch={
            selectedTab === "rmsolo"
              ? dataPlayerSolo.solo_rank.second_last_match
              : dataPlayerTeam.team_rank.second_last_match
          }
        />
      </div>

      <PlayerMatchHistoryContent userID={Number(playerId)} />
    </div>
  );
};

export default PlayerClient;
