import React from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import {
  IconAward,
  IconCopy,
  IconFlame,
  IconHash,
  IconShare,
  IconSkull,
  IconSwords,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { LeaderboardPlayer } from "@/types/getPlayerRanksTypes";
import { CountryFlagByUserId } from "./PlayerFlag";

// Types
interface PlayerHeaderProfileProps {
  item: LeaderboardPlayer; // Define a proper type
}

interface PlayerCardRank1v1Props {
  children?: React.ReactNode;
  isLoading?: boolean;
}

// Helper functions
const getProgressColor = (
  winPercent: number
): "success" | "warning" | "danger" => {
  if (winPercent >= 65) return "success";
  if (winPercent >= 50) return "warning";
  return "danger";
};

const shareButton = () => {
  navigator.clipboard.writeText(window.location.href);
  toast.success("Link copied to clipboard");
};

// Components
export const PlayerHeaderProfile: React.FC<PlayerHeaderProfileProps> = ({
  item,
}) => {
  const progressColor = getProgressColor(item.winPercent);

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar
          src={item.avatarUrl}
          size="lg"
          radius="md"
          className="shadow-lg"
        />
        <div className="flex flex-row items-center gap-4">
          <h1 className="text-2xl font-bold">{item.userName}</h1>
          <Tooltip className="bg-neutral-800" content="Win rate">
            <CircularProgress
              aria-label="Win rate"
              size="lg"
              value={item.winPercent}
              color={progressColor}
              showValueLabel={true}
            />
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
        <CountryFlagByUserId profileId={item.rlUserId.toString()} />
        <Divider />
        <StatItem
          icon={<IconHash size={16} />}
          value={item.rank}
          tooltip="Leaderboard rank"
        />
        <Divider />
        <StatItem
          icon={<IconSwords size={16} />}
          value={item.totalGames}
          tooltip="Total games"
        />
        <Divider />
        <StatItem
          icon={<IconAward size={16} />}
          value={item.wins}
          tooltip="Wins"
          className="text-green-500"
        />
        <Divider />
        <StatItem
          icon={<IconSkull size={16} />}
          value={item.losses}
          tooltip="Losses"
          className="text-red-500"
        />
        <Divider />
        <StatItem
          icon={<IconFlame size={16} />}
          value={item.winStreak}
          tooltip="Win streak"
          className={
            item.winStreak > 0
              ? "text-green-500"
              : item.winStreak < 0
              ? "text-red-500"
              : "text-gray-500"
          }
        />
        <Divider />
        <Tooltip className="bg-neutral-800" content="Share profile">
          <Button
            isIconOnly
            color="secondary"
            size="sm"
            onClick={shareButton}
            className="bg-neutral-800"
          >
            <IconShare size={16} />
          </Button>
        </Tooltip>
        <Tooltip className="bg-neutral-800" content="Copy profile ID">
          <Button
            isIconOnly
            color="secondary"
            size="sm"
            onClick={() =>
              navigator.clipboard.writeText(item.rlUserId.toString())
            }
            className="bg-neutral-800"
          >
            <IconCopy size={16} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

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
  );
};

// Helper components
const StatItem: React.FC<{
  icon: React.ReactNode;
  value: number;
  tooltip: string;
  className?: string;
}> = ({ icon, value, tooltip, className = "" }) => (
  <Tooltip className="bg-neutral-800" content={tooltip}>
    <div className={`flex items-center gap-1 ${className}`}>
      {icon} {value}
    </div>
  </Tooltip>
);

const Divider: React.FC = () => <div className="hidden sm:block">|</div>;
