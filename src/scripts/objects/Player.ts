import { ActiveWeapon } from "../ActiveWeapon";
import { Point2D, Point3D } from "../Point";
import type { RadarCanvas } from "../RadarCanvas";
import { Tracer } from "../Tracer";
import { RadarObject } from "./RadarObject";

const color = {
  T: {
    primary: "rgb(250, 204, 21)",
    secondary: "rgb(158, 131, 24)",
  },
  CT: {
    primary: "rgb(96, 165, 250)",
    secondary: "rgb(56, 109, 175)",
  },
};

const size = 0.018;

const aliveRenderPriority = 20;
const deadRenderPriority = 19;

export class Player extends RadarObject {
  isDisconnected: boolean;
  steamid: string;
  name: string;
  team: string | null;
  color: { primary: string; secondary: string } | null;

  health: number;
  armor: number;
  isAlive: boolean;
  activeWeapon: string | null;
  yaw: number | null;

  isDefusing: boolean = false;
  hasDefuser: boolean = false;
  hasHelmet: boolean = false;
  inventory: string[] = [];

  tracer: Tracer;
  weapon: ActiveWeapon;

  constructor(radar: RadarCanvas, player: PlayerInitialState) {
    const pos = player.is_disconnected
      ? new Point3D(-9999, -9999, -9999)
      : new Point3D(player.X, player.Y, player.Z);
    super(
      radar,
      pos,
      new Point2D(radar.map.size.x * size, radar.map.size.y * size),
      null,
      radar.map,
      player.is_alive ? aliveRenderPriority : deadRenderPriority
    );
    const colors = color[player.team as "T" | "CT"];
    this.color = player.is_disconnected ? null : (colors ?? null);
    this.isDisconnected = player.is_disconnected;
    this.activeWeapon = player.active_weapon_name;
    this.health = player.health || 0;
    this.armor = player.armor_value || 0;
    this.yaw = player.yaw;
    this.isDefusing = player.is_defusing || false;
    this.isAlive = player.is_alive || false;

    this.hasDefuser = player.has_defuser || false;
    this.hasHelmet = player.has_helmet || false;
    this.steamid = player.steamid;
    this.name = player.name;
    this.team = player.team;
    this.inventory = player.inventory;
    this.tracer = new Tracer(this);
    this.weapon = new ActiveWeapon(this);
  }

  setAlive(alive: boolean): void {
    this.isAlive = alive;
    this.setRenderPriority(alive ? aliveRenderPriority : deadRenderPriority);
  }

  update(): void {
    this.setSizeP(
      new Point2D(this.map!.size.x * size, this.map!.size.y * size)
    );

    this.weapon.update();

    this.worldPos = this.map!.gameUnitsToRadar(this.pos);

    const { debug } = this.radar;
    if (!this.worldPos) debug.push(`Player ${this.name} null radar pos!`);
    else {
      debug.push(
        `Player ${this.name}(${this.worldPos.x.toFixed(1)},${this.worldPos.y.toFixed(1)}) size(${this.size.x.toFixed(1)},${this.size.y.toFixed(1)})`
      );
      debug.push(
        ` > health(${this.health}) weapon(${this.activeWeapon}) defusing(${this.isDefusing})`
      );
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (!this.isLoaded || !this.worldPos) return;

    ctx.save();
    if (this.health > 0) {
      this.drawAlive(ctx, this.worldPos);
      if (this.tracer.show) this.tracer.draw(ctx);
    } else {
      this.drawDead(ctx, this.worldPos);
    }

    this.weapon.draw(ctx);

    // name
    ctx.font = "bold 10px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(this.name, this.worldPos.x, this.worldPos.y - this.size.y);

    ctx.restore();
  }

  private drawAlive(ctx: CanvasRenderingContext2D, pos: Point2D): void {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this.size.x / 2, 0, 2 * Math.PI);
    ctx.fillStyle = this.color ? this.color.secondary : "rgb(128, 128, 128)";
    ctx.strokeStyle = this.color ? this.color.primary : "rgb(128, 128, 128)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.arc(
      pos.x,
      pos.y,
      this.size.x / 2,
      -Math.PI / 2,
      (this.health / 100) * 2 * Math.PI - Math.PI / 2
    );
    ctx.fillStyle = this.color ? this.color.primary : "rgb(128, 128, 128)";
    ctx.fill();

    // 90º -> top
    const yawRads = -this.yaw! * (Math.PI / 180);
    const circleRadius = (this.size.x / 2) * 1.75;
    const circleX = pos.x + Math.cos(yawRads) * circleRadius;
    const circleY = pos.y + Math.sin(yawRads) * circleRadius;
    ctx.beginPath();
    ctx.moveTo(circleX, circleY);
    ctx.lineTo(
      circleX - this.size.x * 0.4 * Math.cos(yawRads - Math.PI / 3),
      circleY - this.size.x * 0.4 * Math.sin(yawRads - Math.PI / 3)
    );
    ctx.lineTo(
      circleX - this.size.x * 0.4 * Math.cos(yawRads + Math.PI / 3),
      circleY - this.size.x * 0.4 * Math.sin(yawRads + Math.PI / 3)
    );
    ctx.closePath();
    ctx.fillStyle = this.color ? this.color.primary : "rgb(128, 128, 128)";
    ctx.fill();
  }

  private drawDead(ctx: CanvasRenderingContext2D, pos: Point2D): void {
    const offsetX = this.size.x / 2;
    const offsetY = this.size.y / 2;

    ctx.beginPath();
    ctx.strokeStyle = this.color ? this.color.primary : "rgb(128, 128, 128)";
    ctx.lineWidth = this.size.x * 0.2;
    ctx.globalAlpha = 0.7;
    ctx.moveTo(pos.x - offsetX, pos.y - offsetY);
    ctx.lineTo(pos.x + offsetX, pos.y + offsetY);
    ctx.moveTo(pos.x + offsetX, pos.y - offsetY);
    ctx.lineTo(pos.x - offsetX, pos.y + offsetY);
    ctx.stroke();
  }

  start(): void {}

  stop(): void {
    this.weapon.stop();
  }
}
