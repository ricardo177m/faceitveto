import { SortedList } from "@/utils/SortedList";

import { Animation } from "./animations/Animation";
import { Camera } from "./Camera";
import { buildObjects, clearCanvas, drawDebugInfo } from "./Helper";
import { KeyboardHandler } from "./input/KeyboardHandler";
import { MouseHandler } from "./input/MouseHandler";
import { RadarObject } from "./objects/RadarObject";
import { Point2D } from "./Point";
import { RadarMap } from "./RadarMap";

// const size = 750;

export class RadarCanvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  radarObjects: SortedList<RadarObject>;
  animations: Animation[] = [];

  data: MatchAnalysis;
  camera: Camera;
  map: RadarMap;

  ended: boolean = false;
  fps: number = 0;
  debug: string[] = [];
  showDebugInfo: boolean = false;

  round: number = 1;

  private _lastframe: number = 0;

  constructor(canvas: HTMLCanvasElement, data: MatchAnalysis, size: Point2D) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;

    const comparator = (a: RadarObject, b: RadarObject) => {
      return a.renderPriority !== b.renderPriority
        ? a.renderPriority - b.renderPriority
        : a.pos.z - b.pos.z;
    };

    this.radarObjects = new SortedList(comparator);

    this.data = data;
    this.camera = new Camera(this, new KeyboardHandler(), new MouseHandler());

    this.map = new RadarMap(this, data.map);
    this.radarObjects.push(this.map);

    this.resize(size);

    const roundData = this.data.data.rounds.find((r) => r.round === this.round);
    if (!roundData) return;

    this.radarObjects.push(...buildObjects(roundData, this, this.map));
  }

  start() {
    this.radarObjects.forEach((o) => o.load());
    this.camera.start();
    window.requestAnimationFrame(this._loop);
  }

  update(delta: number) {
    this.debug = [];
    this.fps = 1000 / delta;

    if (this.showDebugInfo) this.debug.push(`fps: ${Math.ceil(this.fps)}`);

    this.camera.update(delta);
    this.radarObjects.forEach((o) => o.update(delta));
    this.animations.forEach((o) => o._update(delta));
  }

  render() {
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
  }

  setRound(round: number) {
    this.round = round;
    this.radarObjects.filter((o) => o instanceof RadarMap);
    this.animations = [];

    const { data } = this.data;
    const roundData = data.rounds.find((r) => r.round === round);
    if (!roundData) return;

    this.radarObjects.push(...buildObjects(roundData, this, this.map));
    this.radarObjects.forEach((o) => o.load());
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

    clearCanvas(this.ctx, this.canvas);
    if (this.ended) return;

    this.update(delta);
    this.render();
    window.requestAnimationFrame(this._loop);
  };
}
