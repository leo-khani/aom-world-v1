import LeaderBoard from "@/components/main/Leaderboard";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function LeaderBoardPage() {
  const searchParams = useSearchParams();
  const matchType = searchParams.get("matchType");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeaderBoard length={15} mode={Number(matchType) || 1} />
    </Suspense>
  );
}
