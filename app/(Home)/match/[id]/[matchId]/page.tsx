"use client";
import MatchInfo from "@/components/MatchInfo";
import { MatchData } from "@/types/MatchTypes";
import { PlayerProfileData } from "@/types/PlayerProfileTypes";
import { useParams } from "next/navigation";

type PlayerData = {
  matchHistoryStats: MatchData[];
  profiles: PlayerProfileData[];
};
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
