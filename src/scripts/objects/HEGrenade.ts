import { Point3D } from "../Point";
import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";
import { Grenade } from "./Grenade";

const sprite = {
  src: "/assets/equipment/hegrenade.svg",
  color: "#fecaca",
};

export class HEGrenade extends Grenade {
  constructor(
    radar: RadarCanvas,
    pos: Point3D,
    entityId: number,
    map: RadarMap
  ) {
    super(radar, pos, entityId, map, sprite);
  }

  drawExtra(): void {}

  stop(): void {}
}
