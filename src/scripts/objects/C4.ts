import { cubicBezierEase } from "@/utils/easeFuncs";

import { HoverAnimation } from "../animations/HoverAnimation";
import { Point2D, Point3D } from "../Point";
import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";
import { RadarObject } from "./RadarObject";

const sprite = {
  src: "/assets/plant.svg",
  color: "#f3f4f6",
};

const size = 18;

const blinkDuration = 1000;

export class C4 extends RadarObject {
  c4: MatchAnalysisPlant;
  color: string;
  map: RadarMap;

  blinkProgress: number = 0;

  constructor(radar: RadarCanvas, c4: MatchAnalysisPlant, map: RadarMap) {
    super(
      radar,
      new Point3D(c4.pos.x, c4.pos.y, c4.pos.z),
      new Point2D(size, size),
      sprite.src,
      25
    );
    this.c4 = c4;
    this.color = sprite.color;
    this.map = map;
  }

  update(delta: number): void {
    this.worldPos = this.map.gameUnitsToRadar(this.pos);

    this.blinkProgress = (this.blinkProgress + delta) % blinkDuration;

    if (this.radar.showDebugInfo) {
      if (!this.worldPos)
        this.radar.debug.push(`Plant ${this.c4.site} null radar pos!`);
      else
        this.radar.debug.push(
          `Plant ${this.c4.site} (${this.worldPos.x.toFixed(1)}, ${this.worldPos.y.toFixed(1)})`
        );
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (!this.isLoaded || !this.worldPos) return;

    ctx.fillStyle = this.color;

    const offset = new Point2D(this.size.x / 2, this.size.y / 2);

    const progress = this.blinkProgress / blinkDuration;
    this.animatePing(ctx, this.sprite, this.worldPos, this.size, progress);

    ctx.drawImage(
      this.sprite,
      this.worldPos.x - offset.x,
      this.worldPos.y - offset.y,
      this.size.x,
      this.size.y
    );
  }

  animatePing(
    ctx: CanvasRenderingContext2D,
    sprite: HTMLImageElement,
    worldPos: Point2D,
    size: Point2D,
    progress: number
  ): void {
    const offset = new Point2D(size.x / 2, size.y / 2);

    const eased = cubicBezierEase(progress);
    const scale = 1 + eased;

    ctx.save();
    ctx.translate(worldPos.x, worldPos.y);
    ctx.scale(scale, scale);
    ctx.translate(-worldPos.x, -worldPos.y);

    const opacity = 1 - eased * 1.15;
    ctx.globalAlpha = opacity < 0 ? 0 : opacity;
    ctx.drawImage(
      sprite,
      worldPos.x - offset.x,
      worldPos.y - offset.y,
      size.x,
      size.y
    );

    ctx.restore();
  }

  start(): void {
    new HoverAnimation(this.radar, this).start();
  }
}
