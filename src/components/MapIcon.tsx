import React from "react";

import NextImageWithFallback from "./ui/NextImageWithFallback";

interface MapIconProps {
  mapId: string;
}

const MapIcon: React.FC<MapIconProps> = ({ mapId }) => {
  return (
    <NextImageWithFallback
      src={`/assets/map-icons/${mapId}.svg`}
      fallbackSrc="/assets/map-icons/unknown.svg"
      width="36"
      height="36"
      alt="Map logo"
    />
  );
};

export default MapIcon;
