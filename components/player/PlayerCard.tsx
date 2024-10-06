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
  // The profile object should contain all the user data
  // from the API, such as the username, profile ID, and
  // other relevant information.
  profile,
  // The playerLeaderboard object should contain the
  // player's leaderboard rank, win rate, and other
  // relevant statistics.
  playerLeaderboard,
}) => {
  // This state variable is used to track whether the
  // component is currently loading data. It is set
  // to true initially and then set to false when the
  // data is loaded.
  const [loading, setLoading] = React.useState(true);

  // Ensure useEffect is called unconditionally
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

  // This function is called when the share button is
  // clicked. It copies the current URL to the
  // clipboard.
  const shareButton = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  // If the component is loading, return a loading animation.
  // If the component is not loading, return the player card.
  return (
    <div className="flex flex-row justify-center">
      {profile && (
        <>
          <div className="flex flex-row gap-2 px-2 items-center">
            <div>
              {/* If the component is loading, show a loading animation. */}
              {loading && <AvatarLoader />}

              {/* If the component is not loading, show the player's avatar. */}
              <Avatar
                radius="md"
                radioGroup="player-card"
                itemProp="image"
                itemScope
                itemType="http://schema.org/Person"
                src={playerLeaderboard.avatarUrl}
                alt={profile.alias}
                className="w-20 h-20 shadow-lg"
              />
            </div>

            <div>
              {/* Show the player's username and win rate. */}
              <div className="flex gap-2">
                <div className="flex flex-row items-center gap-4">
                  <h1 className="text-2xl font-bold">{profile.alias}</h1>
                  <Tooltip className="bg-neutral-800" content="Win rate">
                    <CircularProgress
                      aria-label="Win rate"
                      size="lg"
                      value={playerLeaderboard.winPercent}
                      color={getProgressColor(playerLeaderboard.winPercent)}
                      showValueLabel={true}
                    />
                  </Tooltip>
                </div>
              </div>

              {/* Show the player's country flag and leaderboard statistics. */}
              <div className="flex items-center gap-2">
                {/* Country flag */}
                <CountryFlagByUserId
                  profileId={profile.profile_id.toString()}
                />

                {/* Leaderboard rank */}
                <Divider />
                <StatItem
                  icon={<IconHash size={16} />}
                  value={playerLeaderboard.rank}
                  tooltip="Leaderboard rank"
                />

                {/* Total games */}
                <Divider />
                <StatItem
                  icon={<IconSwords size={16} />}
                  value={playerLeaderboard.totalGames}
                  tooltip="Total games"
                />

                {/* Wins */}
                <Divider />
                <StatItem
                  icon={<IconAward size={16} />}
                  value={playerLeaderboard.wins}
                  tooltip="Wins"
                  className="text-green-500"
                />

                {/* Losses */}
                <Divider />
                <StatItem
                  icon={<IconSkull size={16} />}
                  value={playerLeaderboard.losses}
                  tooltip="Losses"
                  className="text-red-500"
                />

                {/* Win streak */}
                <Divider />
                <StatItem
                  icon={<IconFlame size={16} />}
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

                {/* Share button */}
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

                {/* Copy profile ID button */}
                <Tooltip className="bg-neutral-800" content="Copy profile ID">
                  <Button
                    isIconOnly
                    color="secondary"
                    size="sm"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        playerLeaderboard.rlUserId.toString()
                      )
                    }
                    className="bg-neutral-800"
                  >
                    <IconCopy size={16} />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const AvatarLoader = () => {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="w-32 h-32 rounded-full"></Skeleton>
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
