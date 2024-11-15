import { RadarCanvas } from "../RadarCanvas";

export abstract class Animation {
  radar: RadarCanvas;
  ticking: number = 0;

  constructor(radar: RadarCanvas) {
    this.radar = radar;
  }

  abstract update(delta: number): void;

  start(): void {
    this.radar.animations.push(this);
  }

  stop(): void {
    this.radar.animations = this.radar.animations.filter((o) => o !== this);
  }

  _update(delta: number): void {
    this.ticking += delta;
    this.update(delta);
  }
}
