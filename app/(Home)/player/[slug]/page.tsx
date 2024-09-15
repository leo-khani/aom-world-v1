import React from "react";
import Player from "@/components/Player";
import { Metadata } from "next";

export function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Metadata {
  return {
    title: {
      absolute: `${slug} - Player Profile`,
    },
    description: `View ${slug}'s profile and match history in Rocket League Sideswipe.`,
  };
}

export default function PlayerPage({ params }: { params: { slug: string } }) {
  return <Player username={params.slug} />;
}
