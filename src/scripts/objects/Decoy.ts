import { Point3D } from "../Point";
import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";
import { Grenade } from "./Grenade";

const sprite = {
  src: "/assets/equipment/decoy.svg",
  color: "#f3f4f6",
};

export class Decoy extends Grenade {
  constructor(
    radar: RadarCanvas,
    pos: Point3D,
    entityId: number,
    map: RadarMap
  ) {
    super(radar, pos, entityId, map, sprite, 20);
  }

  drawExtra(): void {}
}
