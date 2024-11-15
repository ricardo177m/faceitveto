import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";
import { Grenade } from "./Grenade";

const sprite = {
  src: "/assets/equipment/molotov.svg",
  color: "#fed7aa",
};

const circleSize = 2.2;

export class Inferno extends Grenade {
  circleRadius: number;

  constructor(
    radar: RadarCanvas,
    grenade: MatchAnalysisGrenade,
    map: RadarMap
  ) {
    super(radar, grenade, map, sprite);
    this.circleRadius = (this.size.x / 2) * circleSize;
  }

  drawExtra(ctx: CanvasRenderingContext2D): void {
    if (!this.worldPos) return;

    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.5;

    ctx.beginPath();
    ctx.arc(
      this.worldPos.x,
      this.worldPos.y,
      this.circleRadius,
      0,
      2 * Math.PI
    );
    ctx.fill();

    ctx.globalAlpha = 1;
  }
}
