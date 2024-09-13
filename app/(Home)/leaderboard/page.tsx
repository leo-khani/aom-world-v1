"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Dynamically import the LeaderBoard component
const LeaderBoard = dynamic(() => import("@/components/main/Leaderboard"), {
  ssr: false,
});

export default function LeaderBoardPage() {
  const searchParams = useSearchParams();
  const matchType = searchParams.get("matchType");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeaderBoard length={15} mode={Number(matchType) || 1} />
    </Suspense>
  );
}
