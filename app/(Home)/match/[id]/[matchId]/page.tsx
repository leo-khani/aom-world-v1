"use client";

import MatchInfo from "@/components/MatchInfo";

/**
 * A Next.js page component that displays a single match based on the route parameters "id" and "matchId".
 * @param {{ id: string, matchId: string }} params The props object containing the route parameters "id" and "matchId".
 * @returns {JSX.Element} A React component element containing the MatchInfo component.
 */
export default function MatchPage({
  params: { id, matchId },
}: {
  params: { id: string; matchId: string };
}): JSX.Element {
  if (!id) {
    return <div>Missing match id</div>;
  }

  return (
    <>
      <MatchInfo userID={id} matchID={matchId} />
    </>
  );
}
