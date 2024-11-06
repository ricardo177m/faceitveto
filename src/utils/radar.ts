import { overviews } from "@/config/radar";

export const gameUnitsToRadar = (
  x: number,
  y: number,
  map: string,
  size: number = 1024
) => {
  if (!overviews[map]) return null;
  const config = overviews[map];
  return {
    x: ((x - config.pos_x) / config.scale) * (size / 1024),
    y: ((config.pos_y - y) / config.scale) * (size / 1024),
  };
};
