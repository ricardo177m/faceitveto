import { cubicBezierEase } from "@/utils/easeFuncs";

import { RadarObject } from "../objects/RadarObject";
import { Point2D } from "../Point";
import { RadarCanvas } from "../RadarCanvas";
import { Animation } from "./Animation";

const MAX_SIZE_DIFF = 1.2;

const HOVER_ANIMATION_DURATION = 200;

export class HoverAnimation extends Animation {
  target: RadarObject;
  hoverProgress: number = 0;

  constructor(radar: RadarCanvas, target: RadarObject) {
    super(radar);
    this.target = target;
  }

  update(delta: number): void {
    const { hover } = this.radar.camera;

    const targetSize = new Point2D(
      this.target.initialSize.x * MAX_SIZE_DIFF,
      this.target.initialSize.y * MAX_SIZE_DIFF
    );

    if (hover === this.target) {
      this.hoverProgress += delta;
      this.hoverProgress = Math.min(
        HOVER_ANIMATION_DURATION,
        this.hoverProgress
      );
    } else {
      this.hoverProgress -= delta;
      this.hoverProgress = Math.max(0, this.hoverProgress);
    }

    const progress = this.hoverProgress / HOVER_ANIMATION_DURATION;
    const eased = cubicBezierEase(progress) * MAX_SIZE_DIFF;

    this.target.size.x =
      this.target.initialSize.x +
      (targetSize.x - this.target.initialSize.x) * eased;
    this.target.size.y =
      this.target.initialSize.y +
      (targetSize.y - this.target.initialSize.y) * eased;
  }
}
