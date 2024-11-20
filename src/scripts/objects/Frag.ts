import { HoverAnimation } from "../animations/HoverAnimation";
import { Point2D, Point3D } from "../Point";
import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";
import { RadarObject } from "./RadarObject";

const color = {
  T: "rgb(250, 204, 21)",
  CT: "rgb(96 165 250)",
};
const size = 0.02;
const attackerSize = 4;

export class Frag extends RadarObject {
  frag: MatchAnalysisFrag;
  color: string;
  showAttacker: boolean = false;
  attackerColor: string;
  attackerWorldPos: Point2D | null;

  constructor(radar: RadarCanvas, frag: MatchAnalysisFrag, map: RadarMap) {
    super(
      radar,
      new Point3D(frag.pos.x, frag.pos.y, frag.pos.z),
      new Point2D(map.size.x * size, map.size.y * size),
      null,
      map,
      5
    );
    this.frag = frag;
    this.color = color[frag.team];
    this.attackerWorldPos = this.map!.gameUnitsToRadar(frag.attacker.pos);
    this.attackerColor = color[frag.attacker.team as "T" | "CT"];
  }

  update(): void {
    this.setSizeP(
      new Point2D(this.map!.size.x * size, this.map!.size.y * size)
    );

    this.worldPos = this.map!.gameUnitsToRadar(this.pos);
    this.attackerWorldPos = this.map!.gameUnitsToRadar(this.frag.attacker.pos);

    const { hover } = this.radar.camera;
    this.showAttacker = hover === this;

    if (this.radar.showDebugInfo) {
      const { debug } = this.radar;
      if (!this.worldPos) debug.push(`Frag ${this.frag.name} null radar pos!`);
      else {
        debug.push(
          `Frag ${this.frag.name}(${this.worldPos.x.toFixed(1)},${this.worldPos.y.toFixed(1)})`
        );
        debug.push(
          ` > size(${this.size.x.toFixed(1)},${this.size.y.toFixed(1)})`
        );
      }
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (!this.isLoaded || !this.worldPos) return;

    const offsetX = this.size.x / 2;
    const offsetY = this.size.y / 2;

    if (this.showAttacker) this.drawAttacker(ctx);

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size.x * 0.2;
    ctx.moveTo(this.worldPos.x - offsetX, this.worldPos.y - offsetY);
    ctx.lineTo(this.worldPos.x + offsetX, this.worldPos.y + offsetY);
    ctx.moveTo(this.worldPos.x + offsetX, this.worldPos.y - offsetY);
    ctx.lineTo(this.worldPos.x - offsetX, this.worldPos.y + offsetY);
    ctx.stroke();
  }

  drawAttacker(ctx: CanvasRenderingContext2D): void {
    if (!this.attackerWorldPos) return;

    ctx.beginPath();
    ctx.arc(
      this.attackerWorldPos.x,
      this.attackerWorldPos.y,
      attackerSize,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = this.attackerColor;
    ctx.fill();
  }

  start(): void {
    new HoverAnimation(this.radar, this).start();
  }

  stop(): void {}
}
