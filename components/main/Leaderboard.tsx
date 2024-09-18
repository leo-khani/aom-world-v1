"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import LeaderboardEloChange from "./LeaderboardEloChange";
import {
  IconAward,
  IconFlame,
  IconSkull,
  IconTrophyFilled,
} from "@tabler/icons-react";
import {
  Avatar,
  Button,
  CircularProgress,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { LeaderboardData, LeaderboardItem } from "@/types/leaderboardTypes";

interface leaderboardData {
  length?: number;
  showLoadMoreBtn?: boolean;
  mode?: number;
}

const Leaderboard: React.FC<leaderboardData> = ({
  length = null,
  showLoadMoreBtn = false,
  mode = 1,
}) => {
  const [data, setData] = useState<LeaderboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [matchType, setMatchType] = useState(mode);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 100;

  const pages = Math.ceil(totalItems / rowsPerPage);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/leaderboard/getLeaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
        body: JSON.stringify({
          region: 7,
          matchType: matchType,
          consoleMatchType: 15,
          searchPlayer: "",
          page: page,
          count: rowsPerPage, // Use rowsPerPage here
          sortColumn: "rank",
          sortDirection: "ASC",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result: LeaderboardData = await response.json();
      setData(result.items);
      setTotalItems(result.count);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [matchType, page]);

  const renderModeButtons = () => (
    <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-end">
      {[
        { id: 1, label: "Rank Solo", mobileLabel: "RM Solo" },
        { id: 2, label: "Rank Team", mobileLabel: "RM team" },
        { id: 3, label: "Deathmatch", mobileLabel: "DM solo" },
        { id: 4, label: "Team Deathmatch", mobileLabel: "DM team" },
      ].map((button) => (
        <Button
          key={button.id}
          size="sm"
          className="rounded-md px-2 sm:px-2 hover:bg-white hover:text-black font-semibold "
          style={{
            backgroundColor: matchType === button.id ? "#F5F5F5" : "",
            color: matchType === button.id ? "#000000" : "",
          }}
          onClick={() => setMatchType(button.id)}
        >
          <span className="sm:hidden">{button.mobileLabel}</span>
          <span className="hidden sm:inline">{button.label}</span>
        </Button>
      ))}
    </div>
  );

  const getProgressColor = (
    winPercent: number
  ): "success" | "warning" | "danger" => {
    if (winPercent >= 65) return "success";
    if (winPercent >= 50) return "warning";
    return "danger";
  };

  return (
    <>
      <div className="w-full overflow-x-auto px-4">
        <Table
          isStriped
          aria-label="Leaderboard"
          className="min-w-full"
          topContent={
            <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-bold flex items-center gap-1">
                  <IconTrophyFilled size={28} />
                  Leaderboard
                </p>
              </div>
              {renderModeButtons()}
            </div>
          }
          bottomContent={
            <div className="flex w-full justify-center">
              {showLoadMoreBtn ? (
                <Link href={`/leaderboard/${matchType}`}>
                  <Button className="rounded-md px-8" isLoading={isLoading}>
                    Load More
                  </Button>
                </Link>
              ) : (
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  total={pages}
                  page={page}
                  onChange={(newPage) => setPage(newPage)}
                />
              )}
            </div>
          }
        >
          <TableHeader className="">
            {/* Rank Place */}
            <TableColumn className="w-10">#</TableColumn>

            {/* Player Name */}
            <TableColumn>Name</TableColumn>

            {/* ELO */}
            <TableColumn className="hidden sm:table-cell">Elo</TableColumn>

            {/* Win % */}
            <TableColumn className="hidden md:table-cell">Win %</TableColumn>

            {/* Win/Losses */}
            <TableColumn className="hidden lg:table-cell">
              Win/Losses
            </TableColumn>

            {/* Total Games */}
            <TableColumn className="hidden xl:table-cell">
              Total Games
            </TableColumn>

            {/* Streak */}
            <TableColumn>Streak</TableColumn>
          </TableHeader>
          <TableBody isLoading={isLoading}>
            {(length ? data.slice(0, length) : data).map((player) => (
              <TableRow
                className="h-full"
                key={player.rlUserId}
                href={`/player/${player.userName}`}
              >
                {/* Rank Place */}
                <TableCell className="text-neutral-500">
                  {player.rank == 1
                    ? "🥇"
                    : player.rank == 2
                    ? "🥈"
                    : player.rank == 3
                    ? "🥉"
                    : player.rank}
                </TableCell>

                {/* Player Name, Avatar, Elo Calc */}
                <TableCell className="flex items-center justify-start gap-2 cursor-pointer hover:underline border-white group h-14">
                  <Avatar
                    className="rounded-sm w-8 h-8 duration-200 group-hover:scale-110"
                    src={player.avatarUrl}
                  />
                  <span className="truncate">{player.userName}</span>
                </TableCell>

                {/* ELO */}
                <TableCell className="hidden sm:table-cell">
                  <div className="flex items-center gap-2">
                    {player.elo}
                    {length && (
                      <LeaderboardEloChange
                        playerId={player.rlUserId}
                        matchType={matchType}
                      />
                    )}
                  </div>
                </TableCell>

                {/* Win % */}
                <TableCell className="hidden md:table-cell">
                  <Tooltip className="bg-neutral-800" content="Win rate">
                    <CircularProgress
                      aria-label="Win rate"
                      size="md"
                      value={player.winPercent}
                      color={getProgressColor(player.winPercent)}
                      showValueLabel={true}
                    />
                  </Tooltip>
                </TableCell>

                {/* Win/Losses */}
                <TableCell className="hidden lg:table-cell">
                  <div className="flex flex-row gap-1 items-center">
                    <span className="text-green-500">
                      <IconAward size={16} />
                    </span>
                    {player.wins}
                    <span className="text-neutral-500">/</span>
                    <span className="text-red-500">
                      <IconSkull size={16} />
                    </span>
                    {player.losses}
                  </div>
                </TableCell>

                {/* Total Games */}
                <TableCell className="hidden xl:table-cell">
                  {player.totalGames}
                </TableCell>

                {/* Win Streak */}
                <TableCell>
                  {player.winStreak > 0 ? (
                    <div className="flex items-center gap-1 text-green-500">
                      <IconFlame size={16} /> {player.winStreak}
                    </div>
                  ) : player.winStreak < 0 ? (
                    <div className="flex items-center gap-1 text-red-500">
                      <IconFlame size={16} /> {Math.abs(player.winStreak)}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-500">
                      <IconFlame size={16} /> {player.winStreak}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>{" "}
    </>
  );
};

export default Leaderboard;
