import React from "react";
import Player from "@/components/Player";
import { Metadata } from "next";

// SEO Metadata
export function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Metadata {
  return {
    title: {
      absolute: `${slug} - Player Profile | Age of Mythology: Retold`,
    },
    description: `View ${slug}'s profile, match history, and stats in Age of Mythology: Retold. Analyze strategies and track progress.`,
    keywords:
      "Age of Mythology: Retold, player profile, RTS game, multiplayer stats, Greek gods, Norse mythology, Egyptian pantheon, Atlanteans",
    openGraph: {
      title: `${slug}'s Age of Mythology: Retold Profile`,
      description: `Check out ${slug}'s performance and stats in Age of Mythology: Retold.`,
      type: "website",
      url: `https://www.aomworld.pro/player/${slug}`,
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
      title: `${slug}'s Age of Mythology: Retold Profile`,
      description: `View ${slug}'s match history and stats in Age of Mythology: Retold.`,
      images: ["/images/logo-portrait.png"],
    },
  };
}

// Player Page Component
export default function PlayerPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 hidden">
        {params.slug}'s AoM: Retold Profile
      </h1>
      <Player username={params.slug} />
    </div>
  );
}

// TODO: Implement error boundary for handling API fetch errors
// TODO: Add loading state while fetching player data
// TODO: Implement server-side rendering for improved SEO and performance
// TODO: Add filters for different game modes (1v1, team games, etc.)
// TODO: Implement schema markup for rich search results
// TODO: Add section for favorite gods and most-played civilizations
