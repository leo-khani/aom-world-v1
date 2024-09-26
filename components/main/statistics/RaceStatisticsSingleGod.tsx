"use client";
import { useState, useEffect } from "react";
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Progress,
  Tooltip,
  Link,
} from "@nextui-org/react";
import CivImage, { CivName, CivPortrait } from "../match/CivImage";
import Loading from "@/components/Loading";
import { civilizationsNames, godPerks } from "@/data/gods";
import apiDataRelative from "@/config/api";

interface RaceStatisticsSingleGodProps {
  id: number;
}

interface RaceMatchup {
  race_id_1: number;
  race_id_2: number;
  wins_race_1: number;
  wins_race_2: number;
  total_matches: number;
}

const RaceStatisticsSingleGod: React.FC<RaceStatisticsSingleGodProps> = ({
  id,
}) => {
  const [matchups, setMatchups] = useState<RaceMatchup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const normalizeMatchup = (matchup: RaceMatchup, id: number): RaceMatchup => {
    if (matchup.race_id_1 === id) {
      return matchup;
    }
    return {
      race_id_1: matchup.race_id_2,
      race_id_2: matchup.race_id_1,
      wins_race_1: matchup.wins_race_2,
      wins_race_2: matchup.wins_race_1,
      total_matches: matchup.total_matches,
    };
  };

  useEffect(() => {
    const fetchMatchups = async () => {
      try {
        const response = await fetch(
          `${apiDataRelative.public.getRaceStatistics}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        // Filter matchups that involve the specified civilization and exclude self-matchups
        const filteredMatchups = result.data.filter(
          (matchup: RaceMatchup) =>
            (matchup.race_id_1 === id || matchup.race_id_2 === id) &&
            matchup.race_id_1 !== matchup.race_id_2
        );

        // Sort matchups by total matches
        const sortedMatchups = filteredMatchups.sort(
          (a: { total_matches: number }, b: { total_matches: number }) =>
            b.total_matches - a.total_matches
        );

        setMatchups(sortedMatchups);
      } catch (error) {
        console.error("Error fetching matchups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchups();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  const godName = civilizationsNames[id];
  const perks = godPerks[godName] || [];

  const columns = [
    { key: "matchup", label: "Matchup" },
    { key: "total_matches", label: "Total Matches" },
    { key: "win_rate", label: "Win Rate" },
  ];

  const renderCell = (matchup: RaceMatchup, columnKey: string) => {
    const normalizedMatchup = normalizeMatchup(matchup, id);
    const wins = normalizedMatchup.wins_race_1;
    const totalMatches = normalizedMatchup.total_matches;
    const winRate = totalMatches > 0 ? (wins / totalMatches) * 100 : 0;

    switch (columnKey) {
      case "matchup":
        return (
          <div className="flex items-center gap-2">
            <CivImage civid={normalizedMatchup.race_id_1.toString()} /> vs{" "}
            <Link href={`/gods/${normalizedMatchup.race_id_2}`}>
              <CivImage civid={normalizedMatchup.race_id_2.toString()} />
            </Link>
          </div>
        );
      case "total_matches":
        return totalMatches;
      case "win_rate":
        return (
          <Tooltip
            content={`${winRate.toFixed(2)}% win rate`}
            className="bg-neutral-800"
          >
            <Progress value={winRate} color="success" showValueLabel={true} />
          </Tooltip>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col-2 justify-center items-start gap-2 mb-4">
        <div>
          <CivPortrait civid={id} />
        </div>
        <div className="w-72 h-full bg-neutral-800 rounded-lg p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2">God Perks</h3>
          <ul className="list-disc pl-4">
            {perks.map((perk, index) => (
              <li key={index} className="text-sm mb-1">
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <CivName civid={id} />
      </h2>
      <Table
        aria-label="Race matchup statistics"
        selectionMode="single"
        isStriped
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={matchups}>
          {(item) => (
            <TableRow key={`${item.race_id_1}-${item.race_id_2}`}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey.toString())}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RaceStatisticsSingleGod;
