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
} from "@nextui-org/react";
import CivImage, { CivName, CivPortrait } from "../match/CivImage";

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

  useEffect(() => {
    const fetchMatchups = async () => {
      try {
        const response = await fetch(`/api/getRaceStatistics`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        // Filter matchups that involve the specified civilization
        const filteredMatchups = result.data.filter(
          (matchup: RaceMatchup) =>
            matchup.race_id_1 === id || matchup.race_id_2 === id
        );

        setMatchups(filteredMatchups);
      } catch (error) {
        console.error("Error fetching matchups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchups();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    { key: "matchup", label: "Matchup" },
    { key: "total_matches", label: "Total Matches" },
    { key: "win_rate", label: "Win Rate" },
  ];

  const renderCell = (matchup: RaceMatchup, columnKey: string) => {
    const isCivOne = matchup.race_id_1 === id;
    const wins = isCivOne ? matchup.wins_race_1 : matchup.wins_race_2;
    const totalMatches = matchup.total_matches;
    const winRate = totalMatches > 0 ? (wins / totalMatches) * 100 : 0;

    if (matchup.race_id_1 === id && matchup.race_id_2 === id) {
      return null;
    }

    switch (columnKey) {
      case "matchup":
        return (
          <div className="flex items-center gap-2">
            <CivImage civid={id.toString()} /> vs{" "}
            {isCivOne ? (
              <CivImage civid={matchup.race_id_2.toString()} />
            ) : (
              <CivImage civid={matchup.race_id_1.toString()} />
            )}
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
      <div className="flex flex-col justify-center items-center gap-2 mb-4">
        <CivPortrait civid={id} />
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CivName civid={id} />
        </h2>
      </div>
      <Table aria-label="Race matchup statistics">
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
