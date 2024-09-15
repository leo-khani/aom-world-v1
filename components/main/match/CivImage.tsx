import React from "react";

import Image from "next/image";

interface MapImageProps {
  civid: string;
  width?: number;
  height?: number;
}

const MapImage: React.FC<MapImageProps> = ({
  civid,
  width = 50,
  height = 50,
}) => {
  const civilization_idFormatter = (civid: number) => {
    switch (civid) {
      case 1:
        return "/gods/greeks/major-gods/zeus_icon.png";
      case 2:
        return "/gods/greeks/major-gods/hades_icon.png";
      case 3:
        return "/gods/greeks/major-gods/poseidon_icon.png";
      case 4:
        return "/gods/egyptians/major-gods/ra_icon.png";

      case 5:
        return "/gods/egyptians/major-gods/isis_icon.png";

      case 6:
        return "/gods/egyptians/major-gods/set_icon.png";
      case 7:
        return "/gods/norse/major-gods/thor_icon.png";
      case 8:
        return "/gods/norse/major-gods/odin_icon.png";
      case 9:
        return "/gods/norse/major-gods/loki_icon.png";
      case 13:
        return "/gods/norse/major-gods/freyr_icon.png";
      case 10:
        return "/gods/atlantean/major-gods/kronos_icon.png";
      case 11:
        return "/gods/atlantean/major-gods/oranos_icon.png";
      case 12:
        return "/gods/atlantean/major-gods/gaia_icon.png";
      default:
        return "/maps/air.png";
    }
  };
  return (
    <>
      <Image
        src={civilization_idFormatter(Number(civid))}
        width={width}
        height={height}
        alt={civid.toString()}
        className="rounded-full border-2 border-neutral-600"
      />
    </>
  );
};

export default MapImage;
