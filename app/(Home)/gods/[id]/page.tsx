import GodsPageClient from "@/components/clientPage/GodsPageClient";
import { civilizationPortrait, civilizationsNames } from "@/data/gods";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

/**
 * Generates metadata for a god's statistics page.
 * @param {Props} props The props object containing the god's ID.
 * @returns {Promise<Metadata>} A promise resolving to the generated metadata.
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const id = Number(params.id);
  const godName = civilizationsNames[id] || "Unknown God";
  const godImage =
    civilizationPortrait[id] ||
    "/gods/egyptians/major-gods/UI_god_pantheon_egyptian.png";

  return {
    title: `${godName} Statistics - Age of Mythology: Retold`,
    description: `View detailed statistics and matchup data for ${godName} in Age of Mythology: Retold. Analyze win rates, popular strategies, and more.`,
    openGraph: {
      title: `${godName} Statistics - Age of Mythology: Retold`,
      description: `Explore ${godName}'s performance data, matchups, and strategies in Age of Mythology: Retold.`,
      images: [{ url: godImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${godName} Statistics - AoM: Retold`,
      description: `Dive into ${godName}'s stats and strategies in Age of Mythology: Retold.`,
      images: [godImage],
    },
  };
}

export default function GodsPage(): JSX.Element {
  /**
   * A page component for a god's statistics page.
   * @param {Object} props The props object containing the god's ID.
   * @param {string} props.params.id The ID of the god.
   * @returns {JSX.Element} The rendered page component.
   */
  return <GodsPageClient />;
}
