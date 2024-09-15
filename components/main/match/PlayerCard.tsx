import { Counters } from "@/types/MatchTypes";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";

// Component for displaying badges
export const BadgeDisplay: React.FC<{
  counter: [keyof Counters, number];
}> = ({ counter }) => {
  const [key, value] = counter;

  const getBadgeImageUrl = (counterKey: string): string | null => {
    const badgeMap: { [key: string]: string } = {
      postGameAward_HighestScore: "/images/badges/highest_score.png",
      postGameAward_MostDeaths: "/images/badges/most_deaths.png",
      postGameAward_MostImprovements: "/images/badges/most_improvements.png",
      postGameAward_MostKills: "/images/badges/most_kills.png",
      postGameAward_MostResources: "/images/badges/most_resources.png",
      postGameAward_MostTitanKills: "/images/badges/most_titan_kills.png",
      postGameAward_largestArmy: "/images/badges/largest_army.png",
    };

    return badgeMap[counterKey] || null;
  };

  const badgeUrl = getBadgeImageUrl(key);

  return (
    <Tooltip
      key={key}
      content={key.replace("postGameAward_", "")}
      className="bg-neutral-900 text-white"
    >
      <Image
        src={badgeUrl || ""}
        alt={key}
        width={32}
        height={32}
        className={`transition-all duration-300 rounded-md shadow-md ${
          value === 0 ? "opacity-30 grayscale" : "hover:scale-110"
        }`}
      />
    </Tooltip>
  );
};

// Component for displaying stats
export const StatDisplay: React.FC<{
  label: string;
  value: number;
}> = ({ label, value }) => {
  return (
    <div className="gap-2 bg-neutral-900 rounded-md p-2 shadow-md w-full">
      <span className="text-gray-300 font-medium">{label}:</span>
      <span className="text-white font-bold">{value}</span>
    </div>
  );
};

// Main CounterDisplay component that decides which component to render
export const CounterDisplay: React.FC<{
  counter: [keyof Counters, number];
}> = ({ counter }) => {
  const [key] = counter;

  const isBadgeItem = (key: string): boolean => {
    return key.startsWith("postGameAward_");
  };

  return (
    <div className="flex flex-row justify-center items-center ">
      {isBadgeItem(key) && <BadgeDisplay counter={counter} />}
    </div>
  );
};
