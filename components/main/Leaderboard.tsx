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
import { IconFlame, IconTrophyFilled } from "@tabler/icons-react";
import { Avatar, Button, Pagination } from "@nextui-org/react";
import Link from "next/link";

// Define a TypeScript interface for the player data
interface Player {
  gameId: string;
  userId: string | null;
  rlUserId: number;
  userName: string;
  avatarUrl: string;
  playerNumber: string | null;
  elo: number;
  eloRating: number;
  eloHighest: number;
  rank: number;
  rankTotal: number;
  region: string;
  wins: number;
  winPercent: number;
  losses: number;
  winStreak: number;
  totalGames: number;
  rankLevel: string;
  rankIcon: string;
  leaderboardKey: string;
}

interface leaderboardData {
  length?: number;
  showLoadMoreBtn?: boolean;
  mode?: number;
}

const Leaderboard: React.FC<leaderboardData> = ({
  length = 100,
  showLoadMoreBtn = false,
  mode = 1,
}) => {
  const [data, setData] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [matchType, setMatchType] = useState(mode);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/leaderboard/getLeaderboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            region: 7,
            matchType: matchType,
            consoleMatchType: 15,
            searchPlayer: "",
            page: 1,
            count: 50,
            sortColumn: "rank",
            sortDirection: "ASC",
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result.items);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [matchType]);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = length;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data, matchType]);

  const renderModeButtons = () => (
    <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-end">
      {[
        { id: 1, label: "RM 1v1" },
        { id: 2, label: "RM Team" },
        { id: 3, label: "Deathmatch" },
        { id: 4, label: "Team Deathmatch" },
      ].map((button) => (
        <Button
          key={button.id}
          className="rounded-md px-4 sm:px-8 hover:bg-white hover:text-black font-semibold"
          style={{
            backgroundColor: matchType === button.id ? "#F5F5F5" : "",
            color: matchType === button.id ? "#000000" : "",
          }}
          onClick={() => setMatchType(button.id)}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );

  return (
    <>
      <div className="w-full overflow-x-auto">
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
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              )}
            </div>
          }
        >
          <TableHeader>
            <TableColumn className="w-10">#</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn className="hidden sm:table-cell">Elo</TableColumn>
            <TableColumn className="hidden md:table-cell">Win %</TableColumn>
            <TableColumn className="hidden lg:table-cell">
              Win/Losses
            </TableColumn>
            <TableColumn className="hidden xl:table-cell">
              Total Games
            </TableColumn>
            <TableColumn>Streak</TableColumn>
          </TableHeader>
          <TableBody isLoading={isLoading}>
            {items.map((player, index) => (
              <TableRow
                key={player.rlUserId}
                href={`/player/${player.userName}`}
              >
                <TableCell className="text-neutral-500">
                  {(page - 1) * rowsPerPage + index + 1}.
                </TableCell>
                <TableCell className="flex items-center justify-start gap-2 cursor-pointer hover:underline border-white group">
                  <Avatar
                    className="rounded-sm w-8 h-8 duration-200 group-hover:scale-110"
                    src={player.avatarUrl}
                  />
                  <span className="truncate">{player.userName}</span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex items-center gap-2">
                    {player.elo}
                    <LeaderboardEloChange rlUserId={player.rlUserId} />
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {player.winPercent}%
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {player.wins}/{player.losses}
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {player.totalGames}
                </TableCell>
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
      </div>
    </>
  );
};

export default Leaderboard;
