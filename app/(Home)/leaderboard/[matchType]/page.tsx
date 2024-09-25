import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LeaderBoard = dynamic(() => import("@/components/main/Leaderboard"), {
  ssr: false,
});

/**
 * A Next.js page component that renders a leaderboard for a specific match type.
 * @param {{ params: { matchType: string } }} props The props object containing the match type.
 * @returns {JSX.Element} A React component element containing the Leaderboard component.
 */
export default function LeaderBoardPage({
  params: { matchType },
}: {
  params: { matchType: string };
}): JSX.Element {
  const matchTypeNumber = Number(matchType) || 1;

  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <LeaderBoard mode={matchTypeNumber} />
    </Suspense>
  );
}
