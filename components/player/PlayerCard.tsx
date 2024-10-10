import { PlayerProfile } from "@/app/api/v1/player/getPlayer/types";
import { LeaderboardItem } from "@/types/leaderboardTypes";
import {
  Avatar,
  Button,
  CircularProgress,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import {
  IconHash,
  IconSwords,
  IconAward,
  IconSkull,
  IconFlame,
  IconShare,
  IconCopy,
} from "@tabler/icons-react";
import React, { useEffect } from "react";
import { CountryFlagByUserId } from "../main/player/PlayerFlag";
import toast from "react-hot-toast";

interface PlayerCardProps {
  profile: PlayerProfile;
  playerLeaderboard: LeaderboardItem | null;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  profile,
  playerLeaderboard,
}) => {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (profile && playerLeaderboard) {
      setLoading(false);
    }
  }, [profile, playerLeaderboard]);

  if (!profile) return <>No profile data</>;
  if (!playerLeaderboard) return <>No leaderboard data</>;

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

  return (
    <div className="flex flex-row justify-center">
      {profile && (
        <div className="flex flex-row gap-2 px-2 items-center">
          <div>
            {loading && <AvatarLoader />}
            <Avatar
              radius="md"
              radioGroup="player-card"
              itemProp="image"
              itemScope
              itemType="http://schema.org/Person"
              src={playerLeaderboard.avatarUrl}
              alt={profile.alias}
              className="w-16 h-16 sm:w-20 sm:h-20 shadow-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="flex flex-row items-center gap-4">
                <h1 className="text-lg sm:text-2xl font-bold">
                  {profile.alias}
                </h1>
                <Tooltip className="bg-neutral-800" content="Win rate">
                  <CircularProgress
                    aria-label="Win rate"
                    size="md" // Adjust size for smaller screens
                    value={playerLeaderboard.winPercent}
                    color={getProgressColor(playerLeaderboard.winPercent)}
                    showValueLabel={true}
                  />
                </Tooltip>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-sm sm:text-base">
              <CountryFlagByUserId profileId={profile.profile_id.toString()} />
              <Divider />
              <StatItem
                icon={<IconHash size={14} />}
                value={playerLeaderboard.rank}
                tooltip="Leaderboard rank"
              />
              <Divider />
              <StatItem
                icon={<IconSwords size={14} />}
                value={playerLeaderboard.totalGames}
                tooltip="Total games"
              />
              <Divider />
              <StatItem
                icon={<IconAward size={14} />}
                value={playerLeaderboard.wins}
                tooltip="Wins"
                className="text-green-500"
              />
              <Divider />
              <StatItem
                icon={<IconSkull size={14} />}
                value={playerLeaderboard.losses}
                tooltip="Losses"
                className="text-red-500"
              />
              <Divider />
              <StatItem
                icon={<IconFlame size={14} />}
                value={playerLeaderboard.winStreak}
                tooltip="Win streak"
                className={
                  playerLeaderboard.winStreak > 0
                    ? "text-green-500"
                    : playerLeaderboard.winStreak < 0
                    ? "text-red-500"
                    : "text-gray-500"
                }
              />
              <Divider />
              <Tooltip className="bg-neutral-800" content="Share profile">
                <Button
                  isIconOnly
                  color="secondary"
                  size="sm" // Smaller button for mobile screens
                  onClick={shareButton}
                  className="bg-neutral-800"
                >
                  <IconShare size={14} />
                </Button>
              </Tooltip>

              <Tooltip className="bg-neutral-800" content="Copy profile ID">
                <Button
                  isIconOnly
                  color="secondary"
                  size="sm" // Smaller button for mobile screens
                  onClick={() =>
                    navigator.clipboard.writeText(
                      playerLeaderboard.rlUserId.toString()
                    )
                  }
                  className="bg-neutral-800"
                >
                  <IconCopy size={14} />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AvatarLoader = () => {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-full"></Skeleton>
    </div>
  );
};

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

export default PlayerCard;
