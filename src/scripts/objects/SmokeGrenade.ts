import { Point3D } from "../Point";
import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";
import { Grenade } from "./Grenade";

const sprite = {
  src: "/assets/equipment/smokegrenade.svg",
  color: "#d9f99d",
};
const circleSize = 2.6;

export class SmokeGrenade extends Grenade {
  constructor(
    radar: RadarCanvas,
    pos: Point3D,
    entityId: number,
    map: RadarMap
  ) {
    super(radar, pos, entityId, map, sprite);
  }

  drawExtra(ctx: CanvasRenderingContext2D): void {
    if (!this.worldPos) return;

    const circleRadius = (this.initialSize.x / 2) * circleSize;

    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.5;

    ctx.beginPath();
    ctx.arc(this.worldPos.x, this.worldPos.y, circleRadius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.globalAlpha = 1;
  }
}
