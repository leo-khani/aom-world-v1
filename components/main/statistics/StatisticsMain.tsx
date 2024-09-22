"use client";
import TitleSection from "@/components/ui/title-section";
import { apiData } from "@/config/api";
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
import React, { useState, useEffect } from "react";
import CivImage from "../match/CivImage";
import Link from "next/link";
import Feedback from "@/components/section/Feedback";
import CivStatisticsChart from "./CivStatisticsChart";
import Loading from "@/components/Loading";

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

const StatisticsMain = () => {
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

  const [data, setData] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const apiurl = apiData.url + apiData.public.getStatistics;

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

  // Calculate max and min win rates
  const winRates = data.data.map((item) => item.win_rate);
  const maxWinRate = Math.max(...winRates);
  const minWinRate = Math.min(...winRates);

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
    { key: "winner_race_id", label: "GOD" },
    { key: "total_matches", label: "MATCHES" },
    { key: "wins", label: "WINS" },
    { key: "win_rate", label: "WIN RATE" },
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
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data.data}>
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
