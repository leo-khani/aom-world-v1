import React from "react";
import Player from "@/components/Player";
import { Metadata } from "next";
import { apiData } from "@/config/api";

export const revalidate = 0;

type PlayerEloAPI = {
  player_id: number;
  match_type: number;
  player_name: string;
  elo: number;
  elo_change: number;
  last_updated: string;
  source: string;
};

// SEO Metadata
export async function generateMetadata({
  params: { playerId },
}: {
  params: { playerId: string };
}): Promise<Metadata> {
  // Fetch player data
  let playerName;
  if (playerId) {
    playerName = await fetch(
      `${apiData.url}${apiData.public.getPlayerElo}?userId=${playerId}&matchType=1`
    )
      .then((res) => res.json())
      .then((data) => data.player_name);
  } else {
    playerName = "Player";
  }

  return {
    title: {
      absolute: `${playerName} - Player Profile | Age of Mythology: Retold`,
    },
    description: `View ${playerName}'s profile, match history, and stats in Age of Mythology: Retold. Analyze strategies and track progress.`,
    keywords:
      "Age of Mythology: Retold, player profile, RTS game, multiplayer stats, Greek gods, Norse mythology, Egyptian pantheon, Atlanteans",
    openGraph: {
      title: `${playerName}'s Age of Mythology: Retold Profile`,
      description: `Check out ${playerName}'s performance and stats in Age of Mythology: Retold.`,
      type: "website",
      url: `https://www.aomworld.pro/player/${playerName}`,
      images: [
        {
          url: "/images/logo-portrait.png",
          width: 1200,
          height: 630,
          alt: "AoM: Retold Player Profile",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${playerName}'s Age of Mythology: Retold Profile`,
      description: `View ${playerName}'s match history and stats in Age of Mythology: Retold.`,
      images: ["/images/logo-portrait.png"],
    },
  };
}

// Player Page Component
export default function PlayerPage({
  params,
}: {
  params: { playerId: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 hidden">
        {params.playerId}'s AoM: Retold Profile
      </h1>
      <Player playerId={params.playerId} />
    </div>
  );
}

// TODO: Implement error boundary for handling API fetch errors
// TODO: Add loading state while fetching player data
// TODO: Implement server-side rendering for improved SEO and performance
// TODO: Add filters for different game modes (1v1, team games, etc.)
// TODO: Implement schema markup for rich search results
// TODO: Add section for favorite gods and most-played civilizations
