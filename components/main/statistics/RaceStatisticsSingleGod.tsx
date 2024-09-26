"use client";
import { useState, useEffect, useMemo } from "react";
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
  Input,
  SortDescriptor,
} from "@nextui-org/react";
import CivImage, { CivName, CivPortrait, CivTitle } from "../match/CivImage";
import Loading from "@/components/Loading";
import { civilizationsNames, godPerks } from "@/data/gods";
import apiDataRelative from "@/config/api";
import { IconSearch } from "@tabler/icons-react";

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
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "win_rate",
    direction: "descending",
  });

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

        const filteredMatchups = result.data.filter(
          (matchup: RaceMatchup) =>
            (matchup.race_id_1 === id || matchup.race_id_2 === id) &&
            matchup.race_id_1 !== matchup.race_id_2
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

  const filteredMatchups = useMemo(() => {
    let filtered = matchups.filter((matchup) => {
      const normalizedMatchup = normalizeMatchup(matchup, id);
      const opponentCivName =
        civilizationsNames[normalizedMatchup.race_id_2].toLowerCase();
      return opponentCivName.includes(filterValue.toLowerCase());
    });

    return filtered.sort((a, b) => {
      const first = normalizeMatchup(a, id);
      const second = normalizeMatchup(b, id);

      let cmp = 0;

      if (sortDescriptor.column === "total_matches") {
        cmp = first.total_matches - second.total_matches;
      } else if (sortDescriptor.column === "win_rate") {
        const winRateA =
          first.total_matches > 0
            ? (first.wins_race_1 / first.total_matches) * 100
            : 0;
        const winRateB =
          second.total_matches > 0
            ? (second.wins_race_1 / second.total_matches) * 100
            : 0;
        cmp = winRateA - winRateB;
      }

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [matchups, id, filterValue, sortDescriptor]);

  const columns = [
    { key: "matchup", label: "Matchup" },
    { key: "total_matches", label: "Total Matches", sortable: true },
    { key: "win_rate", label: "Win Rate", sortable: true },
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
            <Tooltip
              content={civilizationsNames[normalizedMatchup.race_id_2]}
              className="bg-neutral-800"
            >
              <Link href={`/gods/${normalizedMatchup.race_id_2}`}>
                <CivImage civid={normalizedMatchup.race_id_2.toString()} />
              </Link>
            </Tooltip>
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  const godName = civilizationsNames[id];
  const perks = godPerks[godName] || [];

  return (
    <Card className="p-6">
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

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex flex-col items-start gap-1">
          <CivName civid={id} />
          <span className="text-slate-300 text-xs">
            <CivTitle civid={id} />
          </span>
        </h2>
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by civilization..."
          startContent={<IconSearch className="text-default-300" />}
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={(value) => setFilterValue(value)}
        />
      </div>

      <Table
        aria-label="Race matchup statistics"
        selectionMode="single"
        isStriped
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting={column.sortable}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={filteredMatchups}>
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
