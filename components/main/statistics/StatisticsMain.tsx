"use client";
import TitleSection from "@/components/ui/title-section";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Progress,
} from "@nextui-org/react";
import { Key } from "@react-types/shared";
import { IconChartPie, IconExternalLink } from "@tabler/icons-react";
import React, { useState, useEffect, useMemo } from "react";
import CivImage from "../match/CivImage";
import Link from "next/link";
import Feedback from "@/components/section/Feedback";
import CivStatisticsChart from "./CivStatisticsChart";
import Loading from "@/components/Loading";
import apiDataRelative, { apiDataAbsolute } from "@/config/api";

// Mapping civilization IDs to names
const civilizationNames = {
  1: "Zeus",
  2: "Hades",
  3: "Poseidon",
  4: "Ra",
  5: "Isis",
  6: "Set",
  7: "Thor",
  8: "Odin",
  9: "Loki",
  10: "Kronos",
  11: "Oranos",
  12: "Gaia",
  13: "Freyr",
};

interface StatisticsData {
  match_count: number;
  data: Array<{
    id: number;
    winner_race_id: number;
    wins: number;
    total_matches: number;
    win_rate: number;
  }>;
}

const StatisticsMain = () => {
  const [data, setData] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const apiurl = apiDataRelative.public.getStatistics;

  const [sortDescriptor, setSortDescriptor] = useState<{
    column: Key;
    direction: "ascending" | "descending";
  }>({
    column: "win_rate",
    direction: "descending",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiurl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiurl]);

  const sortedItems = useMemo(() => {
    if (!data || !data.data) return [];
    return [...data.data].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [data, sortDescriptor]);

  const { maxWinRate, minWinRate } = useMemo(() => {
    if (!data || !data.data) return { maxWinRate: 0, minWinRate: 0 };
    const winRates = data.data.map((item) => item.win_rate);
    return {
      maxWinRate: Math.max(...winRates),
      minWinRate: Math.min(...winRates),
    };
  }, [data]);

  const getColor = (winRate: number) => {
    if (winRate >= maxWinRate - (maxWinRate - minWinRate) * 0.25) {
      return "success"; // High win rate
    } else if (winRate >= minWinRate + (maxWinRate - minWinRate) * 0.25) {
      return "warning"; // Medium win rate
    } else {
      return "danger"; // Low win rate
    }
  };

  const columns = [
    { key: "winner_race_id", label: "GOD", sortable: true },
    { key: "total_matches", label: "MATCHES", sortable: true },
    { key: "wins", label: "WINS", sortable: true },
    { key: "win_rate", label: "WIN RATE", sortable: true },
  ];

  const renderCell = (item: { [key: string]: any }, columnKey: Key) => {
    const cellValue = item[columnKey];

    if (columnKey === "winner_race_id") {
      return (
        <div className="flex items-center gap-2">
          <Link href={`/gods/${cellValue}`} className="flex items-center gap-2">
            <CivImage civid={cellValue} />
            {civilizationNames[cellValue as keyof typeof civilizationNames]}
            <IconExternalLink size={16} />
          </Link>
        </div>
      );
    } else if (columnKey === "win_rate") {
      const color = getColor(cellValue);
      return (
        <Progress
          value={cellValue}
          color={color}
          label={`${cellValue.toFixed(2)}%`}
        />
      );
    }
    return cellValue;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!data || !data.data) {
    return <p>No data available</p>;
  }

  return (
    <div className="mx-4 flex flex-col gap-4">
      <div className="py-4">
        <TitleSection
          title="Statistics"
          subTitle={`Total Matches: ${data.match_count}`}
          icon={<IconChartPie size={32} />}
        />
      </div>
      <div className="w-full">
        <Feedback />
      </div>

      <Table
        aria-label="God Statistics"
        selectionMode="single"
        className=""
        isStriped
        sortDescriptor={sortDescriptor}
        onSortChange={(descriptor) => {
          if (descriptor.column) {
            setSortDescriptor(
              descriptor as {
                column: Key;
                direction: "ascending" | "descending";
              }
            );
          }
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="bg-neutral-900 p-4 rounded-lg w-full">
        <CivStatisticsChart data={data.data} />
      </div>
    </div>
  );
};

export default StatisticsMain;
