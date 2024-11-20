import { Decoy } from "./objects/Decoy";
import { Flashbang } from "./objects/Flashbang";
import { Grenade } from "./objects/Grenade";
import { HEGrenade } from "./objects/HEGrenade";
import { Inferno } from "./objects/Inferno";
import { Player } from "./objects/Player";
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
  object: Grenade;
}

const tracerDuration = 2;

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

  players: ReplayPlayer[] = [];
  grenades: ReplayGrenade[] = [];

  constructor(radar: RadarCanvas, data: MatchData) {
    this.radar = radar;
    this.framerate = data.framerate;
    this.startFrame = data.round_start_state.frame;
    this.endFrame = data.round_end_state.frame;
    this.initialState = data.round_start_state.data;
    this.events = data.events;
    this.playerPositions = data.player_positions;
    this.grenadePositions = data.grenades;
  }

  start() {
    this.initialState.map((p) => {
      const obj = new Player(this.radar, p);
      this.radar.radarObjects.push(obj);
      this.players.push({ steamid: p.steamid, playerObject: obj });
    });

    this.currentFrame = this.startFrame;
    this.isPaused = false;
  }

  update(delta: number) {
    const { debug } = this.radar;
    debug.push(`frame: ${this.currentFrame}`);

    if (this.isPaused) return;

    const frameTime = (1000 / this.framerate) * this.speed;
    this.lastFrameTime += delta;

    while (this.lastFrameTime >= frameTime) {
      this.lastFrameTime -= frameTime;
      this.currentFrame += 1;

      if (this.currentFrame >= this.endFrame) {
        this.isPaused = true;
        return;
      }

      this.processFrame();
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  processFrame() {
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
      obj.isDefusing = position.is_defusing[frameIndex] || false;
      obj.inventory = position.inventory[frameIndex];
    });

    const objMap = {
      smoke: SmokeGrenade,
      flashbang: Flashbang,
      hegrenade: HEGrenade,
      inferno: Inferno, // ! molotov or incgrenade (check)
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
          object: new _class(this.radar, pos, g.entity_id, this.radar.map),
        };
        this.radar.radarObjects.push(newGrenade.object);
        newGrenade.object.load();
        this.grenades.push(newGrenade);
      } else {
        grenade.object.pos = pos;

        if (g.end_frame === this.currentFrame) {
          grenade.object.unload();
        }
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
          player.playerObject.health = data.health;
          break;
        }

        case "item_equip": {
          const data = e.data as ItemEquip;
          const player = this.players.find(
            (p) => p.steamid === data.user_steamid
          );
          if (!player) return;
          player.playerObject.activeWeapon =
            data.item === "hkp2000" && data.issilenced
              ? "usp_silencer"
              : data.item;
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
      }
    });
  }
}
