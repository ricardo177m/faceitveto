import { Point2D, Point3D } from "../Point";
import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";

export abstract class RadarObject {
  radar: RadarCanvas;
  size: Point2D;
  private _initialSize: Point2D;
  pos: Point3D;
  private _initialPos: Point2D;
  map: RadarMap | null;

  sprite: HTMLImageElement;
  spriteSrc: string | null;
  isLoaded: boolean = false;

  worldPos: Point2D | null = null;

  readonly renderPriority: number = 0;

  constructor(
    radar: RadarCanvas,
    pos: Point3D,
    size: Point2D,
    sprite: string | null,
    map: RadarMap | null,
    renderPriority: number = 0
  ) {
    this.radar = radar;
    this.pos = pos;
    this._initialPos = pos;
    this.size = size;
    this._initialSize = size;
    this.spriteSrc = sprite;
    this.sprite = new Image();
    this.renderPriority = renderPriority;
    this.map = map;
  }

  remove(): void {
    this.unload();
    this.radar.radarObjects.remove(this);
  }

  load(): void {
    if (this.isLoaded) return;
    if (this.spriteSrc) {
      this.sprite.src = this.spriteSrc;
      this.sprite.addEventListener("load", this._onLoad.bind(this));
    } else {
      this.isLoaded = true;
    }
    this.start();
  }

  unload(): void {
    if (this.spriteSrc) {
      this.sprite.src = "";
      this.sprite.removeEventListener("load", this._onLoad.bind(this));
    }
    this.isLoaded = false;
    this.stop();
  }

  isInViewRect(coords: Point2D) {
    if (!this.worldPos) return false;
    return (
      coords.x >= this.worldPos.x - this.size.x / 2 &&
      coords.x <= this.worldPos.x + this.size.x / 2 &&
      coords.y >= this.worldPos.y - this.size.y / 2 &&
      coords.y <= this.worldPos.y + this.size.y / 2
    );
  }

  setSizeP(size: Point2D): void {
    this.size = size;
    this._initialSize = size;
  }

  setPos(pos: Point3D): void {
    this.pos = pos;
  }

  private _onLoad(): void {
    this.isLoaded = true;
  }

  abstract start(): void;
  abstract update(delta: number): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
  abstract stop(): void;

  get initialSize(): Point2D {
    return this._initialSize;
  }
}
