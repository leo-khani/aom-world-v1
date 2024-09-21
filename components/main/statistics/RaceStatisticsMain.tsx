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
} from "@nextui-org/react";
import CivImage, { CivName } from "../match/CivImage";
import { IconArrowNarrowRight } from "@tabler/icons-react";

interface RaceMatchup {
  race_id_1: number;
  race_id_2: number;
  wins_race_1: number;
  wins_race_2: number;
  total_matches: number;
}

const RaceStatisticsMain = () => {
  const [data, setData] = useState<RaceMatchup[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getRaceStatistics");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const filteredData = data.filter(
    (matchup) =>
      matchup.race_id_1 !== matchup.race_id_2 && matchup.total_matches > 0
  );

  const groupedData = filteredData.reduce((acc, matchup) => {
    const id1 = matchup.race_id_1;
    const id2 = matchup.race_id_2;

    if (!acc[id1]) {
      acc[id1] = [];
    }
    if (!acc[id2]) {
      acc[id2] = [];
    }

    acc[id1].push(matchup);
    acc[id2].push(matchup);

    return acc;
  }, {} as Record<number, RaceMatchup[]>);

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4">Race Matchup Statistics</h2>
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
                <TableColumn>WIN RATE RACE 1</TableColumn>
              </TableHeader>
              <TableBody items={civMatchups}>
                {(item) => {
                  const isCivOneMain = item.race_id_1 === Number(key);
                  return (
                    <TableRow key={`${item.race_id_1}-${item.race_id_2}`}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {isCivOneMain ? (
                            <>
                              <Link href={`/gods/${item.race_id_1}`}>
                                <CivImage
                                  width={42}
                                  height={42}
                                  civid={item.race_id_1.toString()}
                                />
                              </Link>
                              vs
                              <Link href={`/gods/${item.race_id_2}`}>
                                <CivImage
                                  width={42}
                                  height={42}
                                  civid={item.race_id_2.toString()}
                                />
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link href={`/gods/${item.race_id_2}`}>
                                <CivImage
                                  width={42}
                                  height={42}
                                  civid={item.race_id_2.toString()}
                                />
                              </Link>
                              vs
                              <Link href={`/gods/${item.race_id_1}`}>
                                <CivImage
                                  width={42}
                                  height={42}
                                  civid={item.race_id_1.toString()}
                                />
                              </Link>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip size="sm">{item.total_matches}</Chip>
                      </TableCell>
                      <TableCell>
                        <Chip size="sm">{item.wins_race_1}</Chip>
                      </TableCell>
                      <TableCell>
                        <Chip size="sm">{item.wins_race_2}</Chip>
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          className="bg-neutral-800"
                          content={`${(
                            (item.wins_race_1 / item.total_matches) *
                            100
                          ).toFixed(2)}% win rate`}
                        >
                          <Progress
                            value={
                              (item.wins_race_1 / item.total_matches) * 100
                            }
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
