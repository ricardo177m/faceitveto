import EventEmitter from "eventemitter3";

import { config } from "@/config/config";

import { C4 } from "./objects/C4";
import { Decoy } from "./objects/Decoy";
import { Flashbang } from "./objects/Flashbang";
import { Grenade } from "./objects/Grenade";
import { HEGrenade } from "./objects/HEGrenade";
import { Incendiary } from "./objects/Incendiary";
import { Molotov } from "./objects/Molotov";
import { Player } from "./objects/Player";
import { RadarObject } from "./objects/RadarObject";
import { SmokeGrenade } from "./objects/SmokeGrenade";
import { Point3D } from "./Point";
import { RadarCanvas } from "./RadarCanvas";

interface ReplayPlayer {
  steamid: string;
  playerObject: Player;
}

interface ReplayGrenade {
  entityid: number;
  type: string;
  thrownBy: string;
  object: Grenade;
}

export class Replay {
  radar: RadarCanvas;

  framerate: number;
  startFrame: number;
  endFrame: number;

  initialState: PlayerInitialState[];
  events: MatchEvent[];
  playerPositions: MatchPlayerPosition[];
  grenadePositions: MatchGrenade[];

  currentFrame: number = 0;
  lastFrameTime: number = 0;
  speed: number = 1;
  isPaused: boolean = false;
  roundTime: number = 0;
  bombPlantTime: number | null = null;

  players: ReplayPlayer[] = [];
  grenades: ReplayGrenade[] = [];
  others: RadarObject[] = [];

  emitter: EventEmitter;

  constructor(radar: RadarCanvas, data: MatchData) {
    this.radar = radar;
    this.framerate = data.framerate;
    this.startFrame = data.round_start_state.frame;
    this.endFrame = data.round_end_state.frame;
    this.initialState = data.round_start_state.data;
    this.events = data.events;
    this.playerPositions = data.player_positions;
    this.grenadePositions = data.grenades;
    this.emitter = new EventEmitter();
  }

  start() {
    this.initialState.map((p) => {
      const obj = new Player(this.radar, p);
      this.radar.radarObjects.push(obj);
      this.players.push({ steamid: p.steamid, playerObject: obj });
    });
    this.lastFrameTime = 0;
    this.currentFrame = this.startFrame;
    this.roundTime = config.roundTime;
    this.bombPlantTime = null;
    this.setPause(false);
  }

  setInitialState() {
    this.players.forEach((p) => p.playerObject.setInitial());
    this.grenades.forEach((g) => g.object.unload(true));
    this.others.forEach((o) => o.unload(true));
    this.roundTime = config.roundTime;
    this.bombPlantTime = null;

    this.grenades = [];
    this.others = [];
  }

  update(delta: number) {
    const { debug } = this.radar;
    debug.push(`frame: ${this.currentFrame}`);
    debug.push(`roundTime: ${this.roundTime}`);

    if (this.isPaused) return;

    const frameTime = 1000 / this.framerate / this.speed;
    this.lastFrameTime += delta;

    while (this.lastFrameTime >= frameTime) {
      if (this.currentFrame >= this.endFrame) {
        this.setPause(true);
        return;
      }

      this.lastFrameTime -= frameTime;
      this.currentFrame += 1;

      const progress = (this.currentFrame - this.startFrame) / this.endFrame;
      this.emitter.emit("progress", progress);

      this.processFrame();
    }
  }

  seek(progress: number) {
    if (progress < 0 || progress > 1) return;

    const frame = Math.floor(this.startFrame + this.endFrame * progress);

    if (frame < this.currentFrame) {
      this.setInitialState();
      this.lastFrameTime = 0;
      this.currentFrame = this.startFrame;
    }
    while (this.currentFrame < frame) {
      this.currentFrame += 1;
      this.processFrame();
    }

    this.emitter.emit("progress", progress);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.emitter.emit("pause", this.isPaused);
  }

  setPause(val: boolean) {
    this.isPaused = val;
    this.emitter.emit("pause", this.isPaused);
  }

  setSpeed(speed: number) {
    this.speed = speed;
    this.emitter.emit("speed", speed);
  }

  updateRoundTime(timeElapsed: number) {
    this.roundTime = this.bombPlantTime
      ? config.bombTime - (timeElapsed - this.bombPlantTime)
      : config.roundTime - timeElapsed;
    if (this.roundTime < 0) this.roundTime = 0;
    this.emitter.emit("timer", this.roundTime);
  }

  processFrame() {
    this.updateRoundTime(this.currentFrame / this.framerate);

    const events = this.events.filter((e) => e.frame === this.currentFrame);
    const frameGrenades = this.grenadePositions.filter(
      (g) =>
        g.start_frame <= this.currentFrame && g.end_frame >= this.currentFrame
    );

    // players
    this.players.forEach((p) => {
      const position = this.playerPositions.find(
        (pos) => pos.steamid === p.steamid
      );
      if (!position) return;

      const tracer = p.playerObject.tracer;
      if (tracer.endFrame < this.currentFrame) tracer.show = false;

      const obj = p.playerObject;
      const frameIndex = this.currentFrame - this.startFrame;

      if (
        position.X[frameIndex] &&
        position.Y[frameIndex] &&
        position.Z[frameIndex]
      ) {
        obj.pos.x = position.X[frameIndex];
        obj.pos.y = position.Y[frameIndex];
        obj.pos.z = position.Z[frameIndex];
      }

      obj.yaw = position.yaw[frameIndex];

      if (obj.blindDuration > 0) {
        obj.blind = obj.blindDuration - (obj.lastBlindStart - this.roundTime);
        if (obj.blind <= 0) {
          obj.blind = 0;
          obj.blindDuration = 0;
        }
      }
    });

    const objMap = {
      smoke: SmokeGrenade,
      flashbang: Flashbang,
      he_grenade: HEGrenade,
      incendiary_grenade: Incendiary,
      molotov: Molotov,
      decoy: Decoy,
    };

    // grenades
    frameGrenades.forEach((g) => {
      const frameIndex = this.currentFrame - g.start_frame;
      const pos = new Point3D(
        g.X[frameIndex],
        g.Y[frameIndex],
        g.Z[frameIndex]
      );

      const grenade = this.grenades.find((gr) => gr.entityid === g.entity_id);
      if (!grenade) {
        const _class = objMap[g.type as keyof typeof objMap];
        const newGrenade: ReplayGrenade = {
          entityid: g.entity_id,
          type: g.type,
          thrownBy: g.thrower_steamid,
          object: new _class(this.radar, pos, g.entity_id, this.radar.map),
        };
        this.radar.radarObjects.push(newGrenade.object);
        newGrenade.object.load();
        this.grenades.push(newGrenade);
      } else {
        grenade.object.pos = pos;
      }
    });

    // events
    events.forEach((e) => {
      switch (e.event_name) {
        case "player_hurt": {
          const data = e.data as PlayerHurt;
          const player = this.players.find(
            (p) => p.steamid === data.user_steamid
          );
          if (!player) return;
          player.playerObject.setHealth(data.health);
          player.playerObject.setArmor(data.armor);
          break;
        }

        case "player_death": {
          const data = e.data as PlayerHurt;
          const player = this.players.find(
            (p) => p.steamid === data.user_steamid
          );
          if (!player) return;
          player.playerObject.setAlive(false);
          break;
        }

        case "item_equip": {
          const data = e.data as ItemEquip;
          const player = this.players.find(
            (p) => p.steamid === data.user_steamid
          );
          if (!player) return;
          const activeWeapon =
            data.item === "hkp2000" && data.issilenced
              ? "usp_silencer"
              : data.item === "m4a1" && data.issilenced
                ? "m4a1_silencer"
                : data.item;
          player.playerObject.setActiveWeapon(activeWeapon);
          break;
        }

        case "weapon_fire": {
          const data = e.data as WeaponFire;
          const player = this.players.find(
            (p) => p.steamid === data.user_steamid
          );
          if (!player) return;
          player.playerObject.tracer.setTracer(this.currentFrame);
          break;
        }

        case "bomb_begindefuse": {
          const data = e.data as BeginDefuse;
          const player = this.players.find(
            (p) => p.steamid === data.user_steamid
          );
          if (!player) return;
          player.playerObject.isDefusing = true;
          // ...
          break;
        }

        case "bomb_abortdefuse": {
          const data = e.data as ReplayPlayerEvent;
          const player = this.players.find(
            (p) => p.steamid === data.user_steamid
          );
          if (!player) return;
          player.playerObject.isDefusing = false;
          // ...
          break;
        }

        case "player_inv_change": {
          const data = e.data as InvChange;
          const player = this.players.find(
            (p) => p.steamid === data.user_steamid
          );
          if (!player) return;
          player.playerObject.setInventory(data.inventory);
          break;
        }

        case "smokegrenade_detonate": {
          const data = e.data as GrenadeEvent;
          const grenade = this.grenades.find(
            (g) => g.entityid === data.entityid
          );
          if (!grenade) return;
          grenade.object.setDetonated();
          break;
        }

        // for infernos: event entityid differs from parsed grenade entityid
        // not a good workaround
        case "inferno_startburn": {
          const data = e.data as GrenadeEvent;
          const grenade = this.grenades.find(
            (g) =>
              g.thrownBy === data.user_steamid &&
              (g.type === "molotov" || g.type === "incendiary_grenade")
          );
          if (!grenade) return;
          grenade.object.setDetonated();
          break;
        }

        case "inferno_extinguish":
        case "inferno_expire": {
          const data = e.data as GrenadeEvent;
          const grenade = this.grenades.find(
            (g) =>
              g.thrownBy === data.user_steamid &&
              (g.type === "molotov" || g.type === "incendiary_grenade")
          );
          if (!grenade) return;
          grenade.object.unload(true);
          break;
        }

        case "smokegrenade_expired":
        case "hegrenade_detonate":
        case "flashbang_detonate":
        case "decoy_detonate": {
          const data = e.data as GrenadeEvent;
          const grenade = this.grenades.find(
            (g) => g.entityid === data.entityid
          );
          if (!grenade) return;
          grenade.object.unload(true);
          break;
        }

        case "bomb_planted": {
          const data = e.data as BombEvent;
          const objpos = new Point3D(data.X, data.Y, data.Z);
          const obj = new C4(this.radar, objpos, data.site, this.radar.map);
          this.radar.radarObjects.push(obj);
          obj.load();
          this.others.push(obj);
          this.bombPlantTime = this.currentFrame / this.framerate;
          break;
        }

        case "player_blind": {
          const data = e.data as PlayerBlind;
          const player = this.players.find(
            (p) => p.steamid === data.user_steamid
          );
          if (!player) return;
          player.playerObject.lastBlindStart = this.roundTime;
          player.playerObject.blindDuration = data.blind_duration;
          break;
        }

        // bomb_exploded
        // bomb_defused
        // round_end
      }
    });
  }
}
