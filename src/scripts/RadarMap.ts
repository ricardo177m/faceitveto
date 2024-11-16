import { overviews } from "@/config/radar";

import { RadarObject } from "./objects/RadarObject";
import { Point2D, Point3D } from "./Point";
import { RadarCanvas } from "./RadarCanvas";

export class RadarMap extends RadarObject {
  overview: Overview;

  constructor(radar: RadarCanvas, map: string) {
    const { width, height } = radar.canvas;
    const size = Math.max(width, height);

    const spritesrc = `/assets/radars/${map}.png`;
    super(
      radar,
      new Point3D(0, 0, 0),
      new Point2D(size, size),
      spritesrc,
      null,
      -1
    );
    this.overview = overviews[map];
  }

  update() {
    if (this.radar.showDebugInfo)
      this.radar.debug.push(
        `${this.map}(${this.pos.x.toFixed(1)},${this.pos.y.toFixed(1)}) size(${this.size.x.toFixed(0)},${this.size.y.toFixed(0)})`
      );
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.isLoaded) return;
    ctx.drawImage(
      this.sprite,
      this.pos.x,
      this.pos.y,
      this.size.x,
      this.size.y
    );
  }

  gameUnitsToRadar(pos: Point3D) {
    if (!this.overview) return null;
    const { offsets } = this.overview;
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

    return new Point2D(
      ((pos.x - this.overview.pos_x) / this.overview.scale + offsetX) *
        ((this.size.x / 1024) * offsetZoom) +
        this.pos.x,
      ((this.overview.pos_y - pos.y) / this.overview.scale + offsetY) *
        ((this.size.y / 1024) * offsetZoom) +
        this.pos.y
    );
  }

  resize(size: Point2D) {
    this.size = size;
  }

  start(): void {}
}
