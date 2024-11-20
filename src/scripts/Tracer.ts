import { Player } from "./objects/Player";
import { Point2D, Point3D } from "./Point";

const tracerDuration = 2;

export class Tracer {
  show: boolean = false;
  endFrame: number = -1;
  worldPos: Point2D | null;
  yaw: number;
  color: string;
  player: Player;

  constructor(player: Player) {
    this.player = player;
    this.worldPos = player.worldPos;
    this.yaw = player.yaw!;
    this.color = player.color ? player.color.primary : "white";
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.show || !this.worldPos) return;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.worldPos!.x, this.worldPos!.y);
    ctx.lineTo(
      this.worldPos!.x + Math.cos((-this.yaw! * Math.PI) / 180) * 1000,
      this.worldPos!.y + Math.sin((-this.yaw! * Math.PI) / 180) * 1000
    );
    ctx.stroke();
  }

  setTracer(frame: number): void {
    const weaps = [
      "smokegrenade",
      "hegrenade",
      "flashbang",
      "decoy",
      "ingrenade",
      "molotov",
    ];
    this.show = this.player.activeWeapon
      ? !this.player.activeWeapon.startsWith("knife") &&
        !weaps.includes(this.player.activeWeapon)
      : false;
    this.endFrame = frame + tracerDuration;
    this.worldPos = this.player.worldPos;
    this.yaw = this.player.yaw!;
    this.color = this.player.color ? this.player.color.primary : "white";
  }
}
