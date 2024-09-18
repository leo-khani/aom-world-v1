import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the LeaderBoard component
const LeaderBoard = dynamic(() => import("@/components/main/Leaderboard"), {
  ssr: false,
});

interface LeaderBoardPageProps {
  params: { matchType: string };
}

export default function LeaderBoardPage({ params }: LeaderBoardPageProps) {
  const matchType = params.matchType;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeaderBoard mode={Number(matchType) || 1} />
    </Suspense>
  );
}
