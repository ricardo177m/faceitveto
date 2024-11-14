import { overviews } from "@/config/radar";

export const gameUnitsToRadar = (
  pos: Position,
  map: string,
  size: number = 1024
) => {
  if (!overviews[map]) return null;
  const config = overviews[map];
  const { offsets } = config;
  const offsetX = offsets
    ? pos.z < offsets.lowerz
      ? offsets.lower.x
      : offsets.upper.x
    : 0;
  const offsetY = offsets
    ? pos.z < offsets.lowerz
      ? offsets.lower.y
      : offsets.upper.y
    : 0;
  const offsetZoom = offsets ? offsets.zoom : 1;
  return {
    x:
      ((pos.x - config.pos_x) / config.scale + offsetX) *
      ((size / 1024) * offsetZoom),
    y:
      ((config.pos_y - pos.y) / config.scale + offsetY) *
      ((size / 1024) * offsetZoom),
  };
};
