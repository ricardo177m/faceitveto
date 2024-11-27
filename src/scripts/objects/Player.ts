import EventEmitter from "eventemitter3";

import { equipmentMap } from "@/config/equipment";

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
  isDisconnected: boolean = false;
  steamid: string = "";
  name: string = "";
  team: string | null = null;
  color: { primary: string; secondary: string } | null = null;

  health: number = 0;
  armor: number = 0;
  isAlive: boolean = false;
  activeWeapon: string | null = null;
  yaw: number | null = 0;

  isDefusing: boolean = false;
  hasDefuser: boolean = false;
  hasHelmet: boolean = false;
  inventory: string[] = [];

  tracer: Tracer;
  weapon: ActiveWeapon;

  readonly _initialState: PlayerInitialState;
  private _emitter: EventEmitter;

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
    this._initialState = player;
    this.tracer = new Tracer(this);
    this.weapon = new ActiveWeapon(this);
    this._emitter = radar.replay.emitter;
    this.setInitial();
  }

  setInitial() {
    const colors = color[this._initialState.team as "T" | "CT"];
    this.color = this._initialState.is_disconnected ? null : (colors ?? null);
    this.isDisconnected = this._initialState.is_disconnected;
    const activeWeapon =
      equipmentMap[
        this._initialState.active_weapon_name as keyof typeof equipmentMap
      ] ?? this._initialState.active_weapon_name?.toLowerCase();
    this.setActiveWeapon(activeWeapon);
    this.setHealth(this._initialState.health || 0);
    this.setArmor(this._initialState.armor_value || 0);
    this.yaw = this._initialState.yaw;
    this.isDefusing = this._initialState.is_defusing || false;

    this.setDefuser(this._initialState.has_defuser || false);
    this.setHelmet(this._initialState.has_helmet || false);
    this.setInventory(this._initialState.inventory);
    this.steamid = this._initialState.steamid;
    this.name = this._initialState.name;
    this.team = this._initialState.team;
    this.tracer = new Tracer(this);
    this.weapon = new ActiveWeapon(this);

    this.setAlive(this._initialState.is_alive);
    const pos = this._initialState.is_disconnected
      ? new Point3D(-9999, -9999, -9999)
      : new Point3D(
          this._initialState.X,
          this._initialState.Y,
          this._initialState.Z
        );
    this.setPos(pos);
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

    if (this.radar.showNicknames) {
      ctx.font = "bold 10px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(this.name, this.worldPos.x, this.worldPos.y - this.size.y);
    }

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

  setAlive(alive: boolean): void {
    this.isAlive = alive;
    this.setRenderPriority(alive ? aliveRenderPriority : deadRenderPriority);
    this._emitter.emit(`player:${this.steamid}:isAlive`, alive);
  }

  setHealth(health: number): void {
    this.health = health;
    this._emitter.emit(`player:${this.steamid}:health`, health);
  }

  setArmor(armor: number): void {
    this.armor = armor;
    this._emitter.emit(`player:${this.steamid}:armor`, armor);
  }

  setHelmet(helmet: boolean): void {
    this.hasHelmet = helmet;
    this._emitter.emit(`player:${this.steamid}:helmet`, helmet);
  }

  // TODO defuser emit on pickup
  setDefuser(defuser: boolean): void {
    this.hasDefuser = defuser;
    this._emitter.emit(`player:${this.steamid}:defuser`, defuser);
  }

  setInventory(inventory: string[]): void {
    this.inventory = inventory;
    this._emitter.emit(`player:${this.steamid}:inventory`, inventory);
  }

  setActiveWeapon(weapon: string): void {
    this.activeWeapon = weapon;
    this._emitter.emit(`player:${this.steamid}:activeweapon`, weapon);
  }
}
