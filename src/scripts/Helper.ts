import { C4 } from "./objects/C4";
import { Decoy } from "./objects/Decoy";
import { Flashbang } from "./objects/Flashbang";
import { Frag } from "./objects/Frag";
import { HEGrenade } from "./objects/HEGrenade";
import { Inferno } from "./objects/Inferno";
import { RadarObject } from "./objects/RadarObject";
import { SmokeGrenade } from "./objects/SmokeGrenade";
import { Point2D } from "./Point";
import { RadarCanvas } from "./RadarCanvas";
import { RadarMap } from "./RadarMap";

function drawRect(
  ctx: CanvasRenderingContext2D,
  pos: Point2D,
  size: Point2D,
  style: string
) {
  ctx.fillStyle = style;
  ctx.fillRect(pos.x, pos.y, size.x, size.y);
}

function clearCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.scrollWidth, canvas.scrollHeight);
}

function drawDebugInfo(ctx: CanvasRenderingContext2D, log: string[]) {
  ctx.fillStyle = "#00ff00";
  ctx.font = "16px Consolas";
  log.forEach((line, i) => ctx.fillText(line, 10, 20 + i * 20));
}

function buildObjects(
  r: MatchAnalysisRound,
  radar: RadarCanvas,
  map: RadarMap
): RadarObject[] {
  const objs: RadarObject[] = [];

  const objMap = {
    smokegrenade: SmokeGrenade,
    flashbang: Flashbang,
    hegrenade: HEGrenade,
    inferno: Inferno,
    decoy: Decoy,
  };

  r.frags.forEach((o) => objs.push(new Frag(radar, o, map)));
  r.plants.forEach((o) => objs.push(new C4(radar, o, map)));
  r.grenades.forEach((o) => {
    const obj = objMap[o.type];
    if (obj) objs.push(new obj(radar, o, map));
  });

  return objs;
}

export { drawRect, clearCanvas, drawDebugInfo, buildObjects };
