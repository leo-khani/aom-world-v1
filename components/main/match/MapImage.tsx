import React, { useState, useEffect } from "react";
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
  const [imageSrc, setImageSrc] = useState<string>("/maps/the_unknown.png");

  // Function to format the map name for the image source
  const formatMapName = (name: string): string => {
    return name.replace(/^rm_/, "");
  };

  useEffect(() => {
    const formattedMapName = formatMapName(mapname);
    const potentialSrc = `/maps/${formattedMapName}.png`;

    // Check if the image exists
    fetch(potentialSrc)
      .then((res) => {
        if (res.ok) {
          setImageSrc(potentialSrc);
        } else {
          console.warn(`Image for map ${mapname} not found, using default.`);
          setImageSrc("/maps/the_unknown.png");
        }
      })
      .catch(() => {
        console.warn(`Error loading image for map ${mapname}, using default.`);
        setImageSrc("/maps/the_unknown.png");
      });
  }, [mapname]);

  return (
    <Image
      src={imageSrc}
      alt={`Map: ${mapname}`}
      className="rounded-md border-2 border-neutral-600"
      width={width}
      height={height}
    />
  );
};

export default MapImage;
