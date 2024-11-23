import { HoverAnimation } from "../animations/HoverAnimation";
import { Point2D, Point3D } from "../Point";
import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";
import { RadarObject } from "./RadarObject";

const size = 0.02;

export abstract class Grenade extends RadarObject {
  color: string;
  entityId: number;
  detonated: boolean = false;

  constructor(
    radar: RadarCanvas,
    pos: Point3D,
    entityId: number,
    map: RadarMap,
    sprite: Sprite,
    renderPriority: number = 30
  ) {
    super(
      radar,
      new Point3D(pos.x, pos.y, pos.z),
      new Point2D(map.size.x * size, map.size.y * size),
      sprite.src,
      map,
      renderPriority
    );
    this.color = sprite.color;
    this.entityId = entityId;
  }

  update(): void {
    this.setSizeP(
      new Point2D(this.map!.size.x * size, this.map!.size.y * size)
    );

    this.worldPos = this.map!.gameUnitsToRadar(this.pos);

    const { debug } = this.radar;
    if (!this.worldPos) debug.push(`${this.constructor.name} *null radar pos*`);
    else {
      debug.push(
        `${this.constructor.name}(${this.worldPos.x.toFixed(1)},${this.worldPos.y.toFixed(1)})`
      );
      debug.push(
        ` > size(${this.size.x.toFixed(1)},${this.size.y.toFixed(1)}) initialSize(${this.initialSize.x.toFixed(1)},${this.initialSize.y.toFixed(1)})`
      );
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (!this.isLoaded || !this.worldPos) return;

    const offsetX = this.size.x / 2;
    const offsetY = this.size.y / 2;

    if (this.detonated) this.drawExtra(ctx);

    ctx.drawImage(
      this.sprite,
      this.worldPos.x - offsetX,
      this.worldPos.y - offsetY,
      this.size.x,
      this.size.y
    );
  }

  setDetonated(): void {
    this.detonated = true;
  }

  start(): void {
    this.sprite.style.fill = this.color;
    new HoverAnimation(this.radar, this).start();
  }

  abstract drawExtra(ctx: CanvasRenderingContext2D): void;

  stop(): void {}
}
