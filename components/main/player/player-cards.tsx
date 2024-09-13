import { Avatar, CircularProgress, Spinner, Tooltip } from "@nextui-org/react";
import {
  IconAward,
  IconFlame,
  IconHash,
  IconSkull,
  IconSwords,
} from "@tabler/icons-react";
import React from "react";

interface PlayerHeaderProfileProps {
  username: string;
  totalGames: number;
  winPercent: number;
  avatarUrl: string;
  winStreak: number;
  wins: number;
  losses: number;
  rank: number;
}

export const PlayerHeaderProfile: React.FC<PlayerHeaderProfileProps> = ({
  username,
  totalGames,
  winPercent,
  avatarUrl,
  winStreak,
  wins,
  losses,
  rank,
}) => {
  const getProgressColor = (
    winPercent: number
  ): "success" | "warning" | "danger" => {
    if (winPercent >= 65) return "success";
    if (winPercent >= 50) return "warning";
    return "danger";
  };

  const progressColor = getProgressColor(winPercent);

  return (
    <>
      <div className="flex flex-col gap-2 px-2">
        <div className="text-5xl font-bold flex flex-row gap-4">
          <Avatar src={avatarUrl} size="lg" radius="md" className="shadow-lg" />
          {username}
          <Tooltip className="bg-neutral-800" content="Win rate">
            <CircularProgress
              aria-label="Loading..."
              size="lg"
              value={winPercent}
              color={progressColor}
              showValueLabel={true}
            />
          </Tooltip>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Tooltip className="bg-neutral-800" content="Total games">
            <div className="pl-2 flex items-center gap-1">
              <IconHash size={16} /> {rank}
            </div>
          </Tooltip>
          <div>|</div>
          <Tooltip className="bg-neutral-800" content="Total games">
            <div className="pl-2 flex items-center gap-1">
              <IconSwords size={16} /> {totalGames}
            </div>
          </Tooltip>
          <div>|</div>
          <Tooltip className="bg-neutral-800" content="Wins">
            <div className="flex items-center gap-1 text-green-500">
              <IconAward size={16} /> {wins}
            </div>
          </Tooltip>
          <div>|</div>
          <Tooltip className="bg-neutral-800" content="Losses">
            <div className="flex items-center gap-1 text-red-500">
              <IconSkull size={16} /> {losses}
            </div>
          </Tooltip>
          <div>|</div>
          <div>
            <Tooltip className="bg-neutral-800" content="Win streak">
              {winStreak > 0 ? (
                <div className="flex items-center gap-1 text-green-500">
                  <IconFlame size={16} /> {winStreak}
                </div>
              ) : winStreak < 0 ? (
                <div className="flex items-center gap-1 text-red-500">
                  <IconFlame size={16} /> {Math.abs(winStreak)}
                </div>
              ) : (
                <div className="flex items-center gap-1 text-gray-500">
                  <IconFlame size={16} /> {winStreak}
                </div>
              )}
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

interface PlayerCardRank1v1Props {
  children?: React.ReactNode;

  isLoading?: boolean;
}
export const PlayerCardRankSolo: React.FC<PlayerCardRank1v1Props> = ({
  children,
  isLoading = true,
}) => {
  if (isLoading) {
    return (
      <div className="bg-secondary rounded-md p-4 h-32">
        <div className="flex justify-center items-center h-full">
          <Spinner color="success" size="lg" />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-secondary rounded-md p-4">
        <span className="semibold flex gap-2 items-center">
          <IconSwords size={18} />
          Ranked Match
        </span>
        <div className="mt-4">
          <div className="grid grid-col items-center gap-2 w-full">
            <div className="flex flex-row justify-evenly text-sm text-gray-400 gap-4">
              <div className="w-1/5">Season</div>

              <div className="w-1/5">Points</div>
              <div className="w-2/5">Win Rate</div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export const getPlayerMatchHistory = () => {
  <>
    {/*    
    {playerData.matchHistoryStats.length === 0 ? (
      <p>No match history available</p>
    ) : (
      <ul className="w-full">
        {playerData.matchHistoryStats.map((match) => (
          <div className="" key={match.id}>
            <div className="flex justify-between items-center">
              <div>{convertUnixToDate(match.completiontime)}</div>
              <div className="text-3xl">test</div>
            </div>
            <div className="flex flex-row justify-start items-center gap-8">
              
              <div className="flex flex-col justify-center items-center gap-2">
                <Image
                  src={`/maps/${match.mapname.replace(/^rm_/, "")}.png`}
                  alt={match.mapname}
                  width={200}
                  height={200}
                />
                <span>
                  {formattedMapName(match.mapname.replace(/^rm_/, ""))}
                </span>
              </div>
              <li className="flex flex-col gap-1 justify-start items-start">
                <p>
                  {convertUnixToTime(
                    match.completiontime - match.startgametime
                  )}
                </p>
                <p>{match.description}</p>
                <p>{match.matchtype_id}</p>
              </li>
              <div>
                {match.matchhistorymember.map((member) => (
                  <p>{member.arbitration}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </ul>
    )}
    */}
  </>;
};
