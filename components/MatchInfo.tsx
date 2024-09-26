import { Counters, MatchData, MatchHistoryMember } from "@/types/MatchTypes";
import { PlayerProfileData } from "@/types/PlayerProfileTypes";
import React, { useEffect, useState } from "react";
import MapImage from "./main/match/MapImage";
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconSword,
  IconSwords,
} from "@tabler/icons-react";
import CivImage from "./main/match/CivImage";
import { CounterDisplay, StatDisplay } from "./main/match/PlayerCard";
import Link from "next/link";
import apiDataRelative from "@/config/api";
import { Spinner } from "@nextui-org/react";

interface MatchInfoProps {
  userID: string;
  matchID: string;
}

interface PlayerData {
  matchHistoryStats: MatchData[];
  profiles: PlayerProfileData[];
}

const MatchInfo: React.FC<MatchInfoProps> = ({ userID, matchID }) => {
  const [match, setMatch] = useState<MatchData>({} as MatchData);
  const [profiles, setProfiles] = useState<PlayerProfileData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      if (!userID) return;
      try {
        const response = await fetch(
          `${apiDataRelative.public.player.getPlayerMatchHistory}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ profileId: userID }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch match history");
        }

        const data: PlayerData = await response.json();

        const foundMatch = data.matchHistoryStats.find(
          (match) => match.id === Number(matchID)
        );

        if (!foundMatch) {
          throw new Error("No match found for the specified matchID");
        }

        setMatch(foundMatch);
        setProfiles(data.profiles);
      } catch (error) {
        setError("Error fetching match history");
        console.error("Error fetching match history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchHistory();
  }, [userID, matchID]);

  const parseCounters = (countersString: string): Counters => {
    return JSON.parse(countersString) as Counters;
  };

  const formatMapName = (mapname: string) => {
    return mapname
      .replace(/^rm_/, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Spinner color="success" />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="py-16">
      <div className="p-4 bg-neutral-900 text-white rounded-lg">
        <div className="mb-2 p-8">
          <div className="flex justify-between items-center">
            <div>
              <MapImage mapname={match.mapname} width={150} height={150} />
              <h1 className="text-2xl font-bold mt-2 text-center">
                {formatMapName(match.mapname)}
              </h1>
            </div>
            <div>
              <p className="text-sm text-gray-400">Match ID: {match.id}</p>
              <p className="text-sm text-gray-400">
                Match Type: {match.matchtype_id}
              </p>
              <p className="text-sm text-gray-400">
                Match Start Time:{" "}
                {new Date(match.startgametime * 1000).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Responsive team display */}
        <div className="flex flex-wrap w-full gap-8 justify-center">
          {Object.entries(
            match.matchhistorymember.reduce(
              (acc: { [key: string]: MatchHistoryMember[] }, member) => {
                if (!acc[member.teamid]) acc[member.teamid] = [];
                acc[member.teamid].push(member);
                return acc;
              },
              {}
            )
          ).map(([teamId, members]) => (
            <div
              key={teamId}
              className="bg-neutral-900 rounded-lg w-full md:w-1/2 lg:w-1/3 gap-4"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-1">
                {parseInt(teamId) + 1 === 1 ? (
                  <IconSword size={20} />
                ) : (
                  <IconSwords size={20} />
                )}{" "}
                Team {parseInt(teamId) + 1}
              </h2>
              <div>
                {members.map((member) => {
                  const playerProfile = profiles.find(
                    (profile) => member.profile_id === profile.profile_id
                  );
                  const playerAlias = playerProfile
                    ? playerProfile.alias
                    : "Unknown";
                  const playerCounters = parseCounters(
                    match.matchhistoryreportresults.find(
                      (result) => result.profile_id === member.profile_id
                    )?.counters || "{}"
                  );

                  return (
                    <div
                      key={member.profile_id}
                      className="bg-neutral-800 p-4 rounded-md flex flex-col gap-4 justify-center mb-2"
                    >
                      {/* PlayerCard */}
                      <div className="flex justify-center items-center gap-4">
                        <CivImage
                          civid={member.civilization_id.toString()}
                          width={100}
                          height={100}
                        />
                        <div>
                          <div className={`font-bold text-lg`}>
                            {member.profile_id !== Number(userID) ? (
                              <Link
                                href={`/profile/${member.profile_id}`}
                                className="hover:underline"
                              >
                                {playerAlias}
                              </Link>
                            ) : (
                              <span>{playerAlias}</span>
                            )}
                            {member.profile_id === Number(userID) && (
                              <span className="text-yellow-500"> (You)</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-base">
                              {member.newrating}
                            </span>
                            {member.newrating - member.oldrating > 0 ? (
                              <span className="text-green-500 flex items-center">
                                <IconArrowNarrowUp size={16} />
                                <span className="ml-1">
                                  +{member.newrating - member.oldrating}
                                </span>
                              </span>
                            ) : (
                              <span className="text-red-500 flex items-center">
                                <IconArrowNarrowDown size={16} />
                                <span className="ml-1">
                                  {member.oldrating - member.newrating}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Counters */}
                      <div className="grid grid-cols-9 sm:grid-cols-9 md:grid-cols-9 gap-2 justify-center text-sm text-gray-400">
                        {Object.entries(playerCounters).map((counter) => (
                          <div
                            key={counter[0]}
                            className="flex justify-between"
                          >
                            <CounterDisplay
                              counter={counter as [keyof Counters, number]}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="py-4">
                        <div className="grid grid-cols-2 gap-2">
                          <StatDisplay
                            label="Economic Score"
                            value={playerCounters.score_Economic}
                          />
                          <StatDisplay
                            label="Military Score"
                            value={playerCounters.score_Military}
                          />
                          <StatDisplay
                            label="Technology Score"
                            value={playerCounters.score_Technology}
                          />
                          <StatDisplay
                            label="Total Score"
                            value={playerCounters.score_Total}
                          />
                          <StatDisplay
                            label="Buildings Razed"
                            value={playerCounters.stat_BuildingsRazed}
                          />
                          <StatDisplay
                            label="Units Killed"
                            value={playerCounters.stat_UnitsKilled}
                          />
                          <StatDisplay
                            label="Units Lost"
                            value={playerCounters.stat_UnitsLost}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchInfo;
