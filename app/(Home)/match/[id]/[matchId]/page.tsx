"use client";
import MatchInfo from "@/components/MatchInfo";
import { useParams } from "next/navigation";

export default async function MatchPage() {
  const params = useParams<{ id: string; matchId: string }>();

  if (!params.id) {
    return <div>Missing match id</div>;
  } else {
    return (
      <div>
        <MatchInfo userID={params.id} matchID={params.matchId} />
      </div>
    );
  }
}
