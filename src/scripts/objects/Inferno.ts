import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";
import { Grenade } from "./Grenade";

const sprite = {
  src: "/assets/equipment/molotov.svg",
  color: "#fed7aa",
};

const circleSize = 2.18;

export class Inferno extends Grenade {
  constructor(
    radar: RadarCanvas,
    grenade: MatchAnalysisGrenade,
    map: RadarMap
  ) {
    super(radar, grenade, map, sprite);
  }

  drawExtra(ctx: CanvasRenderingContext2D): void {
    if (!this.worldPos) return;
    const circleRadius = (this.size.x / 2) * circleSize;

    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.5;

    ctx.beginPath();
    ctx.arc(this.worldPos.x, this.worldPos.y, circleRadius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.globalAlpha = 1;
  }
}
