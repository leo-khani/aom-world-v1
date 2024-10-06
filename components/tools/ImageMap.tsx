import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageMapProps {
  mapname: string;
  width?: number;
  height?: number;
}

export const formatMapName = (name: string): string => {
  return name.replace(/^rm_/, ""); // Removes "rm_" prefix
};

export const formatMapNameText = (name: string): string => {
  // Removes "rm_", replaces underscores with spaces, and capitalizes the first letter of each word
  return name
    .replace(/^rm_/, "") // Remove "rm_" prefix
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const ImageMap: React.FC<ImageMapProps> = ({
  mapname,
  width = 100,
  height = 100,
}) => {
  const [imageSrc, setImageSrc] = useState<string>("/maps/the_unknown.png");

  useEffect(() => {
    const formattedMapName = formatMapName(mapname);
    const potentialSrc = `/maps/${formattedMapName}.png`;

    fetch(potentialSrc).then((res) => {
      setImageSrc(res.ok ? potentialSrc : "/maps/the_unknown.png");
    });
  }, [mapname]);

  return (
    <Image
      src={imageSrc}
      alt={`Map: ${formatMapNameText(mapname)}`}
      className="rounded-md border-2 border-neutral-600"
      width={width}
      height={height}
    />
  );
};

export default ImageMap;
