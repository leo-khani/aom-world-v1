import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconInfoCircleFilled,
  IconPacman,
  IconSkull,
} from "@tabler/icons-react";
import Link from "next/link";
import MapImage from "./main/match/MapImage";
import CivImage from "./main/match/CivImage";
import { apiData } from "@/config/api";
// Types for the match history data
interface MatchHistoryItem {
  matchhistory_id: number;
  profile_id: number;
  resulttype: number;
  teamid: number;
  race_id: number;
  xpgained: number;
  counters: string;
  matchstartdate: number;
  civilization_id: number;
}

interface MatchHistoryStat {
  completiontime: number;
  creator_profile_id: number;
  description: string;
  id: number;
  mapname: string;
  matchhistoryitems: MatchHistoryItem[];
  matchhistorymember: {
    teamid: number;
    newrating: number;
    oldrating: number;
    profile_id: number;
    name: string;
    alias: string;
    xp: number;
    level: number;
    country: string;
  }[];
  matchhistoryreportresults: MatchHistoryItem[];
  matchtype_id: number;
  matchurls: string[];
  maxplayers: number;
  observertotal: number;
  options: string;
  slotinfo: string;
  startgametime: number;
  profiles: Profile[];
}

interface Profile {
  profile_id: number;
  name: string;
  alias: string;
  personal_statgroup_id: number;
  xp: number;
  level: number;
  leaderboardregion_id: number;
  country: string;
}

interface PlayerData {
  options: any;
  slotinfo: any;
  decodedSlotinfo: any;
  matchHistoryStats: MatchHistoryStat[];
  playerName: string;
  profiles: Profile[];
}

interface MatchHistoryProps {
  userID: number;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ userID }) => {
  const [matchHistory, setMatchHistory] = useState<MatchHistoryStat[] | null>(
    []
  );
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      if (!userID) return;
      try {
        const response = await fetch(
          `${apiData.url}${apiData.public.getPlayerMatchHistory}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profileId: userID,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch match history");
        }

        const data: PlayerData = await response.json();

        // Sort matches by date in descending order and take the most recent ones
        const sortedMatches = data.matchHistoryStats.sort((a, b) => {
          return b.startgametime - a.startgametime; // Latest matches first
        });

        // Optional: Limit the number of displayed matches if needed
        const numberOfMatchesToShow = 20; // Show only the latest 10 matches
        const latestMatches = sortedMatches.slice(0, numberOfMatchesToShow);

        setMatchHistory(latestMatches);
        setProfiles(data.profiles);
      } catch (error) {
        setError("Error fetching match history");
        console.error("Error fetching match history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchHistory();
  }, [userID]);

  // Helper functions
  const formatMapName = (mapname: string) => {
    return mapname
      .replace(/^rm_/, "") // Remove "rm_"
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

  const matchIdFormatter = (matchId: number) => {
    switch (matchId) {
      case 0:
        return "Custom";
      case 1:
        return "RM Solo";
      case 2:
        return "RM Team";
      case 3:
        return "DM Solo";
      case 4:
        return "DM Team";
      default:
        return "Custom";
    }
  };

  const matchDuration = (startTime: number, endTime: number) => {
    const duration = endTime - startTime;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`; // Include seconds for more accuracy
  };
  const matchDate = (startgametime: number) => {
    // Include seconds for more accuracy
    // output format x Days ago
    const date = new Date(startgametime * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) {
      return "Today";
    }
    return `${days} Days ago`;
  };

  if (!userID) return <div>Loading...</div>;
  if (loading) return <div>Loading match history...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="w-full overflow-x-auto sm:overflow-x-visible">
        <div className="w-[800px] sm:w-full">
          {matchHistory && matchHistory.length > 0 ? (
            <Table
              aria-label="Match History Table"
              className=""
              topContent={
                <>
                  <div className="flex w-full gap-2 items-center text-2xl font-bold pt-4">
                    <IconSkull size={32} />
                    Recent Games
                  </div>
                  <hr className="border-neutral-600" />
                </>
              }
            >
              <TableHeader>
                <TableColumn className="uppercase text-xs font-semibold">
                  Map / Mode / Duration
                </TableColumn>
                <TableColumn className="uppercase text-xs font-semibold text-right">
                  Date
                </TableColumn>
                <TableColumn className="uppercase text-xs font-semibold">
                  Rating Δ
                </TableColumn>

                <TableColumn className="uppercase text-xs font-semibold">
                  Team(s)
                </TableColumn>
              </TableHeader>
              <TableBody>
                {matchHistory.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell className="">
                      <div className="flex items-center gap-4">
                        <MapImage
                          mapname={match.mapname}
                          width={100}
                          height={100}
                        />
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-1 text-sm">
                            <Tooltip
                              content={match.id.toString()}
                              className="bg-neutral-700"
                            >
                              <IconInfoCircleFilled size={18} />
                            </Tooltip>
                            {match.description}
                          </div>
                          <div>{formatMapName(match.mapname)}</div>
                          <div>
                            {matchIdFormatter(match.matchtype_id)}{" "}
                            <span className="text-neutral-400">
                              {matchDuration(
                                match.startgametime,
                                match.completiontime
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className=" text-sm">
                        {matchDate(match.startgametime)}
                      </span>
                      {match.matchtype_id == 0 ? (
                        <div className="flex gap-1 items-center text-right justify-end text-white/60 hover:text-white hover:underline duration-200 mt-1 cursor-not-allowed">
                          No Summary <IconPacman size={18} />
                        </div>
                      ) : (
                        <Link
                          href={`/match/${userID}/${match.id}`}
                          className="flex gap-1 items-center text-right justify-end text-white/60 hover:text-white hover:underline duration-200 mt-1"
                        >
                          View Summary <IconPacman size={18} />
                        </Link>
                      )}
                    </TableCell>
                    <TableCell className="text-md">
                      <div className="text-center">
                        {match.matchtype_id !== 0 ? (
                          getRatingChange(match, userID)
                        ) : (
                          <div className="text-neutral-400 text-xs">N/A</div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="flex flex-row gap-2">
                      {/* Teams */}
                      {Object.entries(
                        match.matchhistorymember.reduce(
                          (acc: { [key: string]: any[] }, member) => {
                            if (!acc[member.teamid]) acc[member.teamid] = [];
                            acc[member.teamid].push(member);
                            return acc;
                          },
                          {}
                        )
                      ).map(([teamId, members]) => (
                        <div key={teamId} className="mb-2 gap-4 w-1/2">
                          <div className="font-bold">
                            Team {parseInt(teamId) + 1}
                          </div>
                          <div className="flex flex-col">
                            {members.map((member) => {
                              const playerProfile = profiles.find(
                                (profile: any) =>
                                  member.profile_id === profile.profile_id
                              );
                              const playerAlias = playerProfile
                                ? playerProfile.alias
                                : "Unknown";
                              return (
                                <div
                                  key={member.profile_id}
                                  className="flex flex-col gap-2 bg-neutral-800 p-2 m-2 rounded-md w-full"
                                >
                                  <div className="flex flex-row items-center gap-2 ">
                                    <CivImage civid={member.civilization_id} />
                                    <div>
                                      <div>
                                        {member.profile_id !== userID ? (
                                          <Link
                                            href={`/player/${member.profile_id}`}
                                            className="hover:underline"
                                          >
                                            <div
                                              className={
                                                member.profile_id === userID
                                                  ? "font-bold text-yellow-500"
                                                  : ""
                                              }
                                            >
                                              {playerAlias}
                                            </div>
                                          </Link>
                                        ) : (
                                          <div className="font-bold text-yellow-500">
                                            {playerAlias}
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        {match.matchtype_id !== 0 && (
                                          <span>
                                            {member.newrating -
                                              member.oldrating >
                                            0 ? (
                                              <div className="flex flex-row gap-1">
                                                {member.newrating}
                                                <div className="text-green-500 flex items-center gap-1">
                                                  <IconArrowNarrowUp
                                                    size={16}
                                                  />
                                                  {member.newrating -
                                                    member.oldrating}
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="flex flex-row gap-1">
                                                {Math.abs(member.newrating)}
                                                <span className="text-red-500 flex items-center gap-1">
                                                  <IconArrowNarrowDown
                                                    size={16}
                                                  />
                                                  {member.newrating -
                                                    member.oldrating}
                                                </span>
                                              </div>
                                            )}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>{" "}
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>No match history available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchHistory;

const getRatingChange = (match: MatchHistoryStat, userID: number) => {
  const currentPlayerData = match.matchhistorymember.find(
    (member) => member.profile_id === userID
  );

  if (currentPlayerData) {
    const ratingChange =
      currentPlayerData.newrating - currentPlayerData.oldrating;
    return (
      <div>
        {ratingChange > 0 ? (
          <div className="text-green-500 flex items-center gap-1">
            <IconArrowNarrowUp size={16} />
            {ratingChange}
          </div>
        ) : ratingChange < 0 ? (
          <div className="text-red-500 flex items-center gap-1">
            <IconArrowNarrowDown size={16} />
            {Math.abs(ratingChange)}
          </div>
        ) : (
          <div className="text-gray-500">0</div>
        )}
      </div>
    );
  }
  return <div className="text-gray-500">N/A</div>;
};
