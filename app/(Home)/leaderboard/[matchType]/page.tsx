import Loading from "@/components/Loading";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LeaderBoard = dynamic(() => import("@/components/main/Leaderboard"), {
  ssr: false,
});

// metadata
export const metadata: Metadata = {
  title: {
    default: "AoM World Live Leaderboard",
    template: "%s | AoM World",
  },
  description:
    "View real-time leaderboard rankings for Age of Mythology World. Track top players and their stats.",
  keywords: [
    "Age of Mythology",
    "AoM World",
    "live leaderboard",
    "RTS game",
    " competitive gaming",
    "player rankings",
    "AoM stats",
    "AoM Leaderboard",
    "Aom",
  ],
};

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
