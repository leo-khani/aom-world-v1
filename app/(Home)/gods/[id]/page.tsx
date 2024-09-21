"use client";
import RaceStatisticsSingleGod from "@/components/main/statistics/RaceStatisticsSingleGod";
import { useParams } from "next/navigation";
import React from "react";

export default function GodsPage() {
  const params = useParams<{ id: string }>();
  return (
    <div>
      <RaceStatisticsSingleGod id={Number(params?.id)} />
    </div>
  );
}
