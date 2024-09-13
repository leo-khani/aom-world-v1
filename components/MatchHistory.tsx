import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Spinner,
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
} from "@tabler/icons-react";
import LeaderboardEloChange from "./main/LeaderboardEloChange";
import Link from "next/link";

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
    teamid: any;
    newrating: any;
    oldrating: any;
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
  matchHistoryStats: MatchHistoryStat[];
  playerName: string;
  profiles: Profile[];
}

interface MatchHistoryProps {
  userID?: any; // Updated type to 'string' for better clarity
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ userID }) => {
  const [matchHistory, setMatchHistory] = useState<MatchHistoryStat[] | null>(
    null
  );
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      if (!userID) return;
      try {
        const response = await fetch("/api/player/getPlayerMatchHistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch match history");
        }

        const data: PlayerData = await response.json();
        setMatchHistory(data.matchHistoryStats);
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
    return `${days} Days ago`;
  };

  const civilization_idFormatter = (civilizations_id: number) => {
    switch (civilizations_id) {
      case 1:
        return "/gods/greeks/major-gods/zeus_icon.png";
      case 2:
        return "/gods/greeks/major-gods/hades_icon.png";
      case 3:
        return "/gods/greeks/major-gods/poseidon_icon.png";
      case 4:
        return "/gods/egyptians/major-gods/ra_icon.png";

      case 5:
        return "/gods/egyptians/major-gods/isis_icon.png";

      case 6:
        return "/gods/egyptians/major-gods/set_icon.png";
      case 7:
        return "/gods/norse/major-gods/thor_icon.png";
      case 8:
        return "/gods/norse/major-gods/odin_icon.png";
      case 9:
        return "/gods/norse/major-gods/loki_icon.png";
      case 10:
        return "/gods/norse/major-gods/freyr_icon.png";
      case 11:
        return "/gods/atlantean/major-gods/kronos_icon.png";
      case 12:
        return "/gods/atlantean/major-gods/oranos_icon.png";
      case 13:
        return "/gods/atlantean/major-gods/gaia_icon.png";
      default:
        return "/maps/air.png";
    }
  };

  if (loading) return <div>Loading match history...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="">
        {matchHistory && matchHistory.length > 0 ? (
          <Table aria-label="Match History Table" className="">
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
                Opponent(s)
              </TableColumn>
            </TableHeader>
            <TableBody>
              {matchHistory.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        src={`/maps/${match.mapname.replace(/^rm_/, "")}.png`}
                        alt={match.mapname}
                        className="rounded-md border-2 border-neutral-600"
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
                    <Link
                      href={`/match/${match.id}`}
                      className="flex gap-1 items-center text-right justify-end text-white/60 hover:text-white hover:underline duration-200 mt-1"
                    >
                      View Summary <IconPacman size={18} />
                    </Link>
                  </TableCell>
                  <TableCell className="text-md">
                    <div>
                      {match.matchhistorymember[0].newrating -
                        match.matchhistorymember[0].oldrating >
                      0 ? (
                        <div className="text-green-500 flex items-center gap-1">
                          <IconArrowNarrowUp size={16} />{" "}
                          {match.matchhistorymember[0].newrating -
                            match.matchhistorymember[0].oldrating}{" "}
                        </div>
                      ) : (
                        <div className="text-red-500 flex items-center gap-1">
                          <IconArrowNarrowDown size={16} />
                          {Math.abs(
                            match.matchhistorymember[0].newrating -
                              match.matchhistorymember[0].oldrating
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="flex flex-row gap-2">
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
                          {members.map((member: any) => {
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
                                className="flex flex-row items-center gap-2 bg-neutral-800 p-2 m-2 rounded-md w-full"
                              >
                                <Image
                                  src={civilization_idFormatter(
                                    member.civilization_id
                                  )}
                                  width={50}
                                  height={50}
                                  alt={member.civilization_id.toString()}
                                  className="rounded-full border-2 border-neutral-600"
                                />
                                <div
                                  className={
                                    member.profile_id === parseInt(userID)
                                      ? "font-bold text-yellow-500"
                                      : ""
                                  }
                                >
                                  {playerAlias}
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
  );
};

export default MatchHistory;
