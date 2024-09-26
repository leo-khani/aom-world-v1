import React from "react";
import Image from "next/image";
import { godNames } from "@/data/gods";

// Define the props interface for the MapImage component
interface MapImageProps {
  civid: string;
  width?: number;
  height?: number;
}

// Define a map object for civilization icons
const civilizationIcons: { [key: number]: string } = {
  1: "/gods/greeks/major-gods/zeus_icon.png",
  2: "/gods/greeks/major-gods/hades_icon.png",
  3: "/gods/greeks/major-gods/poseidon_icon.png",
  4: "/gods/egyptians/major-gods/ra_icon.png",
  5: "/gods/egyptians/major-gods/isis_icon.png",
  6: "/gods/egyptians/major-gods/set_icon.png",
  7: "/gods/norse/major-gods/thor_icon.png",
  8: "/gods/norse/major-gods/odin_icon.png",
  9: "/gods/norse/major-gods/loki_icon.png",
  10: "/gods/atlantean/major-gods/kronos_icon.png",
  11: "/gods/atlantean/major-gods/oranos_icon.png",
  12: "/gods/atlantean/major-gods/gaia_icon.png",
  13: "/gods/norse/major-gods/freyr_icon.png",
};

const civilizationPortrait: { [key: number]: string } = {
  1: "/gods/greeks/major-gods/zeus_portrait.png",
  2: "/gods/greeks/major-gods/hades_portrait.png",
  3: "/gods/greeks/major-gods/poseidon_portrait.png",
  4: "/gods/egyptians/major-gods/ra_portrait.png",
  5: "/gods/egyptians/major-gods/isis_portrait.png",
  6: "/gods/egyptians/major-gods/set_portrait.png",
  7: "/gods/norse/major-gods/thor_portrait.png",
  8: "/gods/norse/major-gods/odin_portrait.png",
  9: "/gods/norse/major-gods/loki_portrait.png",
  10: "/gods/atlantean/major-gods/kronos_portrait.png",
  11: "/gods/atlantean/major-gods/oranos_portrait.png",
  12: "/gods/atlantean/major-gods/gaia_portrait.png",
  13: "/gods/norse/major-gods/freyr_portrait.png",
};

const civilizationsNames: { [key: number]: string } = {
  1: "Zeus",
  2: "Hades",
  3: "Poseidon",
  4: "Ra",
  5: "Isis",
  6: "Set",
  7: "Thor",
  8: "Odin",
  9: "Loki",
  10: "Kronos",
  11: "Oranos",
  12: "Gaia",
  13: "Freyr",
};

export const CivTitle = ({ civid }: { civid: number }) => {
  const godName = civilizationsNames[civid];
  const god = godNames[godName];

  if (!god) {
    return <div>Unknown God</div>;
  }

  return <div>{god.title}</div>;
};

export const CivName = ({ civid }: { civid: number }) => {
  return <div>{civilizationsNames[civid] || `Civilization ${civid}`}</div>;
};

export const CivPortrait = ({ civid }: { civid: number }) => {
  return (
    <Image
      src={civilizationPortrait[civid]}
      alt={`Civilization ${civid}`}
      width={667 / 2}
      height={775 / 2} // or any other appropriate value
      className="rounded-md"
    />
  );
};

// MapImage component
const MapImage: React.FC<MapImageProps> = ({
  civid,
  width = 50,
  height = 50,
}) => {
  // Function to get the civilization icon path
  const getCivilizationIcon = (civid: number): string => {
    return civilizationIcons[civid] || "/maps/the_unknown.png";
  };

  return (
    <Image
      src={getCivilizationIcon(Number(civid))}
      width={width}
      height={height}
      alt={`Civilization ${civid}`}
      className="rounded-full border-2 border-neutral-600"
    />
  );
};

export default MapImage;

// TODO: Implement lazy loading for images to improve performance
// TODO: Add error handling for invalid civilization IDs
// TODO: Consider implementing a fallback image for unknown civilization IDs
// TODO: Explore using CSS modules for more scoped and maintainable styles
