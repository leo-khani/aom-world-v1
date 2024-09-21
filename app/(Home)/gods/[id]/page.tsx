"use client";
import { CivName } from "@/components/main/match/CivImage";
import RaceStatisticsSingleGod from "@/components/main/statistics/RaceStatisticsSingleGod";
import Feedback from "@/components/section/Feedback";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";
import { civilizationPortrait, civilizationsNames } from "@/data/gods";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = Number(params.id);
  const godName = civilizationsNames[id] || "Unknown God";
  const godImage = civilizationPortrait[id] || "/default-god-image.png";

  return {
    title: `${godName} Statistics - Age of Mythology: Retold`,
    description: `View detailed statistics and matchup data for ${godName} in Age of Mythology: Retold. Analyze win rates, popular strategies, and more.`,
    openGraph: {
      title: `${godName} Statistics - Age of Mythology: Retold`,
      description: `Explore ${godName}'s performance data, matchups, and strategies in Age of Mythology: Retold.`,
      images: [{ url: godImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${godName} Statistics - AoM: Retold`,
      description: `Dive into ${godName}'s stats and strategies in Age of Mythology: Retold.`,
      images: [godImage],
    },
  };
}

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
