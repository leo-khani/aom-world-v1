import { LeaderboardItem } from "@/types/leaderboardTypes";
import { Avatar } from "@nextui-org/react";
import React from "react";

interface TopThreeLeaderboardProps {
  playerData: LeaderboardItem[];
}

const TopThreeLeaderboard: React.FC<TopThreeLeaderboardProps> = ({
  playerData,
}) => {
  return (
    <div className="flex flex-col gap-8">
      {playerData.slice(0, 3).map((player) => (
        <div key={player.rank} className="bg-neutral-900 rounded-lg p-4">
          <div className="flex flex-row justify-between gap-2 items-center">
            <div
              className={`w-6 h-6 flex justify-center items-center ${
                player.rank == 1
                  ? "bg-primary"
                  : player.rank == 2
                  ? "bg-secondary"
                  : player.rank == 3
                  ? "bg-tertiary"
                  : "bg-white"
              } rounded-full`}
            >
              {player.rank}
            </div>
            <div className="flex flex-col">
              <p
                className={`text-sm font-bold ${
                  player.rank == 1
                    ? "text-yellow-500"
                    : player.rank == 2
                    ? "text-slate-400"
                    : "text-amber-700"
                }`}
              >
                {player.userName}
              </p>
              <p className="text-xs text-gray-400">
                Total Games: {player.totalGames}
              </p>
              <p className="text-xs text-gray-400">Total Wins: {player.wins}</p>
            </div>
            <div>
              <Avatar
                className="rounded-sm w-8 h-8 duration-200 group-hover:scale-110"
                src={player.avatarUrl}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopThreeLeaderboard;
