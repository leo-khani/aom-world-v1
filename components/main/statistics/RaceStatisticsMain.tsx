"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Progress,
  Tooltip,
  Chip,
  Link,
  Spacer,
} from "@nextui-org/react";
import CivImage, { CivName } from "../match/CivImage";
import { IconArrowNarrowRight, IconChartAreaLine } from "@tabler/icons-react";
import Loading from "@/components/Loading";
import TitleSection from "@/components/ui/title-section";

interface RaceMatchup {
  race_id_1: number;
  race_id_2: number;
  wins_race_1: number;
  wins_race_2: number;
  total_matches: number;
}

function isValidMatchup(matchup: RaceMatchup): boolean {
  return (
    matchup.race_id_1 !== matchup.race_id_2 &&
    matchup.wins_race_1 >= 0 &&
    matchup.wins_race_2 >= 0 &&
    matchup.total_matches >= 0 &&
    matchup.total_matches === matchup.wins_race_1 + matchup.wins_race_2
  );
}

const RaceStatisticsMain = () => {
  const [data, setData] = useState<RaceMatchup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getRaceStatistics");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const validData = result.data.filter(isValidMatchup);
        setData(validData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const filteredData = data.reduce((acc, matchup) => {
    const key = [matchup.race_id_1, matchup.race_id_2].sort().join("-");
    if (!acc[key] || matchup.total_matches > acc[key].total_matches) {
      acc[key] = matchup;
    }
    return acc;
  }, {} as Record<string, RaceMatchup>);

  const uniqueMatchups = Object.values(filteredData);

  const groupedData = uniqueMatchups.reduce((acc, matchup) => {
    const addToGroup = (id: number, isMainRace: boolean) => {
      if (!acc[id]) acc[id] = [];
      acc[id].push({
        ...matchup,
        isMainRace,
      });
    };

    addToGroup(matchup.race_id_1, true);
    addToGroup(matchup.race_id_2, false);

    return acc;
  }, {} as Record<number, (RaceMatchup & { isMainRace: boolean })[]>);

  return (
    <Card className="p-4">
      <TitleSection
        title={"Gods Matchup Statistics"}
        icon={<IconChartAreaLine size={32} />}
      />
      <Spacer y={4} />

      {Object.keys(groupedData).map((key) => {
        const civMatchups = groupedData[Number(key)];

        return (
          <div key={key} className="mb-6">
            <h3 className="text-xl font-semibold mb-2 flex justify-between items-center gap-2 py-4 px-5">
              <div className="flex items-center gap-2 text-yellow-500">
                <CivImage civid={key} />
                <CivName civid={Number(key)} />
              </div>
              <div>
                <Link href={`/gods/${key}`}>
                  <div className="flex items-center gap-2 font-semibold text-white">
                    God Info <IconArrowNarrowRight size={18} />
                  </div>
                </Link>
              </div>
            </h3>
            <Table aria-label={`Matchups for Civilization ${key}`}>
              <TableHeader>
                <TableColumn>MATCHUP</TableColumn>
                <TableColumn>TOTAL MATCHES</TableColumn>
                <TableColumn className="uppercase flex items-center gap-1">
                  <CivName civid={Number(key)} /> WINS
                </TableColumn>
                <TableColumn>OPPONENT WINS</TableColumn>
                <TableColumn>WIN RATE</TableColumn>
              </TableHeader>
              <TableBody items={civMatchups}>
                {(item) => {
                  const wins = item.isMainRace
                    ? item.wins_race_1
                    : item.wins_race_2;
                  const opponentWins = item.isMainRace
                    ? item.wins_race_2
                    : item.wins_race_1;
                  const totalMatches = item.total_matches;
                  const winRate =
                    totalMatches > 0 ? (wins / totalMatches) * 100 : 0;

                  return (
                    <TableRow key={`${item.race_id_1}-${item.race_id_2}`}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Link href={`/gods/${key}`}>
                            <CivImage width={42} height={42} civid={key} />
                          </Link>
                          vs
                          <Link
                            href={`/gods/${
                              item.isMainRace ? item.race_id_2 : item.race_id_1
                            }`}
                          >
                            <CivImage
                              width={42}
                              height={42}
                              civid={(item.isMainRace
                                ? item.race_id_2
                                : item.race_id_1
                              ).toString()}
                            />
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip size="sm">{totalMatches}</Chip>
                      </TableCell>
                      <TableCell>
                        <Chip size="sm">{wins}</Chip>
                      </TableCell>
                      <TableCell>
                        <Chip size="sm">{opponentWins}</Chip>
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          className="bg-neutral-800"
                          content={`${winRate.toFixed(2)}% win rate`}
                        >
                          <Progress
                            value={winRate}
                            color="success"
                            showValueLabel={true}
                            className="max-w-md"
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                }}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </Card>
  );
};

export default RaceStatisticsMain;
