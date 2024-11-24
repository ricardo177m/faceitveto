import { SortedList } from "@/utils/SortedList";

import { Animation } from "./animations/Animation";
import { Camera } from "./Camera";
import { clearCanvas, drawDebugInfo } from "./Helper";
import { KeyboardHandler } from "./input/KeyboardHandler";
import { MouseHandler } from "./input/MouseHandler";
import { RadarObject } from "./objects/RadarObject";
import { Point2D } from "./Point";
import { RadarMap } from "./RadarMap";
import { Replay } from "./Replay";

export class RadarCanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  radarObjects: SortedList<RadarObject>;
  animations: Animation[] = [];

  camera: Camera;
  map: RadarMap;

  ended: boolean = false;
  fps: number = 0;
  debug: string[] = [];
  showDebugInfo: boolean = false;

  replay: Replay;

  private _lastframe: number = 0;
  private requestId: number | null = null;

  constructor(
    canvas: HTMLCanvasElement,
    data: MatchData,
    map: string,
    size: Point2D
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;

    const comparator = (a: RadarObject, b: RadarObject) => {
      return a.renderPriority !== b.renderPriority
        ? a.renderPriority - b.renderPriority
        : a.pos.z - b.pos.z;
    };

    this.radarObjects = new SortedList(comparator);

    this.replay = new Replay(this, data);
    this.camera = new Camera(this, new KeyboardHandler(), new MouseHandler());

    this.map = new RadarMap(this, map);
    this.radarObjects.push(this.map);

    this.resize(size);
  }

  start() {
    this.replay.start();
    this.camera.start();
    this.radarObjects.forEach((o) => o.load());
    this.requestId = window.requestAnimationFrame(this._startLoop);
  }

  update(delta: number) {
    this.debug = [];
    this.fps = 1000 / delta;
    this.debug.push(`fps: ${Math.ceil(this.fps)}`);

    this.replay.update(delta);
    this.camera.update(delta);
    this.radarObjects.forEach((o) => o.update(delta));
    this.animations.forEach((o) => o._update(delta));
  }

  render() {
    clearCanvas(this.ctx, this.canvas);
    this.camera.render(this.ctx, this.radarObjects);
    if (this.showDebugInfo) drawDebugInfo(this.ctx, this.debug);
  }

  stop() {
    if (this.ended) return;
    this.ended = true;

    this.camera.stop();
    this.radarObjects.forEach((o) => o.unload());
    this.radarObjects.clear();
    this.animations = [];
    window.cancelAnimationFrame(this.requestId!);
  }

  resize(size: Point2D) {
    this.camera.resize(size);
    this.map.resize(size);
    this.canvas.width = size.x;
    this.canvas.height = size.y;
  }

  private _loop = (current: number) => {
    const delta = current - this._lastframe;
    this._lastframe = current;

    this.update(delta);
    this.render();
    this.requestId = window.requestAnimationFrame(this._loop);
  };

  // skip first frame to avoid large deltas
  private _startLoop = (current: number) => {
    this._lastframe = current;
    this.requestId = window.requestAnimationFrame(this._loop);
  };
}
