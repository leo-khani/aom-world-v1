import React from "react";
import { Metadata } from "next";
import { apiDataAbsolute } from "@/config/api";
import PlayerClient from "@/components/player/PlayerClient";

export const revalidate = 0;

export async function generateMetadata({
  params: { playerId },
}: {
  params: { playerId: string };
}): Promise<Metadata> {
  // Fetch player data
  let playerName;

  if (playerId) {
    playerName = await fetch(
      `${apiDataAbsolute.public.getPlayerElo}?userId=${playerId}&matchType=1`
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
    <>
      <PlayerClient playerId={params.playerId} />

      {/*   <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 hidden">
          {params.playerId}'s AoM: Retold Profile
        </h1>
        <Player playerId={params.playerId} />
      </div>*/}
    </>
  );
}
