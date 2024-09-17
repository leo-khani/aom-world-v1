import React from "react";
import Image from "next/image";

interface MapImageProps {
  mapname: string;
  width?: number;
  height?: number;
}

const MapImage: React.FC<MapImageProps> = ({
  mapname,
  width = 100,
  height = 100,
}) => {
  // Function to format the map name for the image source
  const formatMapName = (name: string): string => {
    return name.replace(/^rm_/, "");
  };

  return (
    <Image
      src={`/maps/${formatMapName(mapname)}.png`}
      alt={`Map: ${mapname}`}
      className="rounded-md border-2 border-neutral-600"
      width={width}
      height={height}
    />
  );
};

export default MapImage;

// TODO: Implement error handling for missing map images
// TODO: Add lazy loading for images to improve performance
// TODO: Consider implementing a fallback image for unknown map names
// TODO: Explore using next/image's built-in optimization features
