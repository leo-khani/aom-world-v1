import React from "react";
import Image from "next/image";

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

// MapImage component
const MapImage: React.FC<MapImageProps> = ({
  civid,
  width = 50,
  height = 50,
}) => {
  // Function to get the civilization icon path
  const getCivilizationIcon = (civid: number): string => {
    return civilizationIcons[civid] || "/maps/air.png";
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
