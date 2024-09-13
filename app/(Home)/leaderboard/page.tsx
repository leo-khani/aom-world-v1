"use client";
import LeaderBoard from "@/components/main/Leaderboard";
import { useSearchParams } from "next/navigation";
export default function LeaderBoardPage() {
  const searchParams = useSearchParams();
  const matchType = searchParams.get("matchType");

  return (
    <>
      <LeaderBoard length={15} mode={Number(matchType) || 1} />
    </>
  );
}
