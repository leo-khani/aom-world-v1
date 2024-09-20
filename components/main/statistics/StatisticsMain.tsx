"use client";
import { apiData } from "@/config/api";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Progress,
  Card,
  Tooltip,
  Chip,
  Image,
} from "@nextui-org/react";
import { Key } from "@react-types/shared";
import React, { useState, useEffect } from "react";

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

const civilizationIcons = {
  1: "/gods/greeks/major-gods/zeus_icon.png",
  2: "/gods/greeks/major-gods/hades_icon.png",
  3: "/gods/greeks/major-gods/poseidon_icon.png",
  4: "/gods/egyptians/major-gods/ra_icon.png",
  5: "/gods/egyptians/major-gods/isis_icon.png",
  6: "/gods/egyptians/major-gods/set_icon.png",
  7: "/gods/norse/major-gods/thor_icon.png",
  8: "/gods/norse/major-gods/odin_icon.png",
  9: "/gods/norse/major-gods/loki_icon.png",
  10: "/gods/atlantean/major-gods/kronos_icon.png",
  11: "/gods/atlantean/major-gods/oranos_icon.png",
  12: "/gods/atlantean/major-gods/gaia_icon.png",
  13: "/gods/norse/major-gods/freyr_icon.png",
};

const StatisticsMain = () => {
  interface StatisticsData {
    match_count: number;
    items: Array<{
      race_id: number;
      count: number;
      wins: number;
      losses: number;
      win_rate: number;
      pick_rate: number;
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
        <Progress
          label="Loading..."
          aria-labelledby="loading-label"
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          color="success"
          className="max-w-md"
          classNames={{ label: "text-white" }}
        />
      </div>
    );
  }

  if (!data || !data.items) {
    return <p>No data available</p>;
  }

  const columns = [
    { key: "race_id", label: "GOD" },
    { key: "count", label: "MATCHES" },
    { key: "wins", label: "WINS" },
    { key: "losses", label: "LOSSES" },
    { key: "win_rate", label: "WIN RATE" },
    { key: "pick_rate", label: "PICK RATE" },
  ];

  const renderCell = (
    item: {
      [x: string]: any;
      race_id?: number;
      count?: number;
      wins?: number;
      losses?: number;
      win_rate?: number;
      pick_rate?: number;
    },
    columnKey: Key
  ) => {
    const cellValue = item[columnKey];
    if (cellValue === undefined) return null;

    switch (columnKey) {
      case "race_id":
        return (
          <div className="flex items-center gap-2">
            <Image
              src={
                civilizationIcons[cellValue as keyof typeof civilizationIcons]
              }
              alt={
                civilizationNames[cellValue as keyof typeof civilizationNames]
              }
              width={32}
              height={32}
            />
            {civilizationNames[cellValue as keyof typeof civilizationNames]}
          </div>
        );
      case "win_rate":
        return (
          <Tooltip
            className="bg-neutral-700"
            content={`${cellValue}% win rate`}
          >
            <Progress value={cellValue} size="sm" color="success" />
          </Tooltip>
        );
      case "pick_rate":
        return (
          <Chip size="sm" variant="flat">
            {cellValue}%
          </Chip>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      <p className="mb-4">
        Total Analysed Matches: {data.match_count.toLocaleString("en-US")}
      </p>
      <Table aria-label="God Statistics" selectionMode="single">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={data.items}>
          {(item) => (
            <TableRow key={item.race_id.toString()}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default StatisticsMain;
