import LoadingBear from "@/components/loader/LoadingBear";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "About",
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
 * The About page component.
 *
 * This component is responsible for rendering the About page,
 * which is currently just a placeholder page with a loading
 * animation.
 *
 * @returns {JSX.Element} The rendered page component.
 */
export default function About() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      {/* A loading animation to indicate that the page is still in development. */}
      <LoadingBear />
      {/* A heading to indicate that this is the About page. */}
      <h1 className="text-3xl font-bold">About</h1>
      {/* A paragraph to indicate that the page is still being worked on. */}
      <p className="text-lg text-center">Working on it...</p>
    </div>
  );
}
