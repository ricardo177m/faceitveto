import { cubicBezierEase } from "@/utils/easeFuncs";

import { RadarObject } from "../objects/RadarObject";
import { Point2D } from "../Point";
import { RadarCanvas } from "../RadarCanvas";
import { Animation } from "./Animation";

const MAX_SIZE_DIFF = 2.2;

const HOVER_ANIMATION_DURATION = 200;

export class HoverAnimation extends Animation {
  target: RadarObject;
  initialSize: Point2D;
  targetSize: Point2D;

  hoverProgress: number = 0;

  constructor(radar: RadarCanvas, target: RadarObject) {
    super(radar);
    this.target = target;
    this.initialSize = new Point2D(target.size.x, target.size.y);
    this.targetSize = new Point2D(
      target.size.x + MAX_SIZE_DIFF,
      target.size.y + MAX_SIZE_DIFF
    );
  }

  update(delta: number): void {
    const { hover } = this.radar.camera;

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
      this.initialSize.x + (this.targetSize.x - this.initialSize.x) * eased;
    this.target.size.y =
      this.initialSize.y + (this.targetSize.y - this.initialSize.y) * eased;
  }
}
