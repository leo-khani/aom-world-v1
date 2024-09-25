import React from "react";
import RaceStatisticsMain from "@/components/main/statistics/RaceStatisticsMain";
import Feedback from "@/components/section/Feedback";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  /**
   * Generates metadata for the Gods Statistics page.
   *
   * @returns {Promise<Metadata>} A promise resolving to the generated metadata.
   */
  return {
    title: "Gods Statistics",
    description: "Statistics for all gods",
  } as const;
}

/**
 * The Gods Statistics page component.
 *
 * @returns {React.ReactElement} A div containing the RaceStatisticsMain component
 * and the Feedback component.
 */
export default function GodsStatisticsPage(): React.ReactElement {
  return (
    <div className="container mx-auto py-8 flex flex-col gap-1">
      <Feedback />
      <div className="mx-4">
        <RaceStatisticsMain />
      </div>
    </div>
  );
}
