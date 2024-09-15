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
  return (
    <>
      <Image
        src={`/maps/${mapname.replace(/^rm_/, "")}.png`}
        alt={mapname}
        className="rounded-md border-2 border-neutral-600"
        width={width}
        height={height}
      />
    </>
  );
};

export default MapImage;
