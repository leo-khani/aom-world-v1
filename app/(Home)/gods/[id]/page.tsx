"use client";
import { CivName } from "@/components/main/match/CivImage";
import RaceStatisticsSingleGod from "@/components/main/statistics/RaceStatisticsSingleGod";
import Feedback from "@/components/section/Feedback";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";

export default function GodsPage() {
  const params = useParams<{ id: string }>();
  return (
    <div className="container mx-auto py-8 flex flex-col gap-1">
      <Breadcrumbs className="py-4 mx-4">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/gods-statistics">Gods</BreadcrumbItem>
        <BreadcrumbItem isCurrent>
          <CivName civid={Number(params?.id)} />
        </BreadcrumbItem>
      </Breadcrumbs>
      <Feedback />
      <div className="mx-4">
        <RaceStatisticsSingleGod id={Number(params?.id)} />
      </div>
    </div>
  );
}
