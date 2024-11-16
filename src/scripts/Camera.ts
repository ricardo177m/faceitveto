import { SortedList } from "@/utils/SortedList";

import { InputHandler } from "./input/InputHandler";
import { InputState } from "./input/InputState";
import { RadarObject } from "./objects/RadarObject";
import { Point2D } from "./Point";
import { RadarCanvas } from "./RadarCanvas";

const minZoom = 0.5;
const maxZoom = 3;

export class Camera {
  radar: RadarCanvas;
  zoom: number;
  scale: number;
  pos: Point2D;
  input: InputState;
  inputHandlers: InputHandler[] = [];
  cursorWorldPos: Point2D = { x: 0, y: 0 };
  isLoaded: boolean = false;

  private _initialSize: Point2D;
  private _hover: RadarObject | null = null;

  constructor(radar: RadarCanvas, ...inputHandlers: InputHandler[]) {
    this.radar = radar;
    this.input = new InputState();

    this.pos = { x: 0, y: 0 };
    this.zoom = 1;
    this.scale = 1;

    this._initialSize = new Point2D(radar.canvas.width, radar.canvas.height);

    this.inputHandlers.push(...inputHandlers);
  }

  start() {
    if (this.isLoaded) return;
    this.inputHandlers.forEach((h) => h.register(this));
    this.isLoaded = true;
  }

  update(delta: number) {
    if (this.input.left) this.move({ x: (-0.5 * delta) / this.zoom, y: 0 });
    if (this.input.right) this.move({ x: (0.5 * delta) / this.zoom, y: 0 });
    if (this.input.up) this.move({ x: 0, y: (-0.5 * delta) / this.zoom });
    if (this.input.down) this.move({ x: 0, y: (0.5 * delta) / this.zoom });

    const center = this.center();

    const view = this.viewSize();

    this.cursorWorldPos = this.getCursorWorldPos();

    this._hover =
      this.radar.radarObjects.findReverse((o) =>
        o.isInViewRect(this.cursorWorldPos)
      ) ?? null;

    if (this.radar.showDebugInfo) {
      const { debug } = this.radar;
      debug.push(
        `Camera(${this.pos.x.toFixed(1)},${this.pos.y.toFixed(1)}) zoom(${this.zoom.toFixed(2)}) scale(${this.scale.toFixed(2)})`
      );
      debug.push(
        ` > center(${center.x.toFixed(1)},${center.y.toFixed(
          1
        )}) view(${view.x.toFixed(0)},${view.y.toFixed(0)})`
      );
      debug.push(
        ` > cursor(${this.cursorWorldPos.x.toFixed(1)},${this.cursorWorldPos.y.toFixed(1)})`
      );
      debug.push(
        ` > hover: ${this.hover ? this.hover.constructor.name : "none"}`
      );
    }
  }

  render(ctx: CanvasRenderingContext2D, objects: SortedList<RadarObject>) {
    const { width, height } = this.radar.canvas;

    ctx.clearRect(0, 0, width, height);

    ctx.save();

    ctx.translate(width / 2, height / 2);
    ctx.scale(this.zoom, this.zoom);
    ctx.translate(-width / 2 - this.pos.x, -height / 2 - this.pos.y);

    objects.forEach((o) => o.render(ctx));

    if (this.radar.showDebugInfo) {
      // draw camera center
      ctx.fillStyle = "cyan";
      const center = this.center();
      ctx.fillRect(center.x - 2, center.y - 2, 4, 4);

      // draw cursor pos
      ctx.fillStyle = "red";
      ctx.fillRect(this.cursorWorldPos.x - 2, this.cursorWorldPos.y - 2, 4, 4);
    }

    ctx.restore();
  }

  zoomIn(factor: number, centerCursor: boolean = false) {
    if (factor <= 0) return;

    if (this.zoom === minZoom && factor < 1) return;
    if (this.zoom === maxZoom && factor > 1) return;

    const oldCursorPos = this.cursorWorldPos;

    this.zoom *= factor;

    this.zoom = Math.max(minZoom, this.zoom);
    this.zoom = Math.min(maxZoom, this.zoom);

    if (centerCursor) {
      const cursor = this.getCursorWorldPos();

      this.move({
        x: oldCursorPos.x - cursor.x,
        y: oldCursorPos.y - cursor.y,
      });
    }
  }

  move(delta: Point2D) {
    this.pos.x += delta.x;
    this.pos.y += delta.y;
  }

  default() {
    this.pos = { x: 0, y: 0 };
    this.zoom = 1;
  }

  center(): Point2D {
    const { width, height } = this.radar.canvas;
    return {
      x: this.pos.x + width / 2,
      y: this.pos.y + height / 2,
    };
  }

  viewSize(): Point2D {
    return {
      x: this.radar.canvas.width / this.zoom,
      y: this.radar.canvas.height / this.zoom,
    };
  }

  viewRect(): { pos: Point2D; size: Point2D } {
    const center = this.center();
    const size = this.viewSize();
    return {
      pos: { x: center.x - size.x / 2, y: center.y - size.y / 2 },
      size,
    };
  }

  screenToRadar(pos: Point2D): Point2D {
    const center = this.center();
    const size = this.viewSize();
    return {
      x: center.x - size.x / 2 + pos.x / this.zoom,
      y: center.y - size.y / 2 + pos.y / this.zoom,
    };
  }

  getCursorWorldPos(): Point2D {
    return this.screenToRadar(this.input.cursor);
  }

  get hover(): RadarObject | null {
    return this._hover;
  }

  resize(size: Point2D) {
    this.scale = size.x / this._initialSize.x;
    this.pos.x *= size.x / this.radar.canvas.width;
    this.pos.y *= size.y / this.radar.canvas.height;
  }

  stop() {
    this.inputHandlers.forEach((h) => h.unregister());
    this.isLoaded = false;
  }
}
