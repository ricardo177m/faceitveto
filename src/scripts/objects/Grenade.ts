import { HoverAnimation } from "../animations/HoverAnimation";
import { Point2D, Point3D } from "../Point";
import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";
import { RadarObject } from "./RadarObject";

const size = 18;

export abstract class Grenade extends RadarObject {
  grenade: MatchAnalysisGrenade;
  color: string;
  map: RadarMap;

  constructor(
    radar: RadarCanvas,
    grenade: MatchAnalysisGrenade,
    map: RadarMap,
    sprite: Sprite,
    renderPriority: number = 30
  ) {
    super(
      radar,
      new Point3D(grenade.pos.x, grenade.pos.y, grenade.pos.z),
      new Point2D(size, size),
      sprite.src,
      renderPriority
    );
    this.grenade = grenade;
    this.color = sprite.color;
    this.map = map;
  }

  update(): void {
    // this.size.x = this.map.size.x;
    // this.size.y = this.map.size.y;

    this.worldPos = this.map.gameUnitsToRadar(this.pos);
    if (this.radar.showDebugInfo) {
      const { debug } = this.radar;
      if (!this.worldPos)
        debug.push(`Grenade ${this.grenade.type} null radar pos!`);
      else {
        debug.push(
          `${this.grenade.type} (${this.worldPos.x.toFixed(1)}, ${this.worldPos.y.toFixed(1)})`
        );
        debug.push(
          ` - size: (${this.size.x.toFixed(1)}, ${this.size.y.toFixed(1)}) (${((this.size.x / this.map.size.x) * 100).toFixed(1)}, ${((this.size.y / this.map.size.y) * 100).toFixed(1)})`
        );
      }
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (!this.isLoaded || !this.worldPos) return;

    const offsetX = this.size.x / 2;
    const offsetY = this.size.y / 2;

    this.drawExtra(ctx);

    ctx.drawImage(
      this.sprite,
      this.worldPos.x - offsetX,
      this.worldPos.y - offsetY,
      this.size.x,
      this.size.y
    );
  }

  start(): void {
    this.sprite.style.fill = this.color;
    new HoverAnimation(this.radar, this).start();
  }

  abstract drawExtra(ctx: CanvasRenderingContext2D): void;
}
