import { Point2D } from "../Point";

export class InputState {
  up: boolean = false;
  down: boolean = false;
  left: boolean = false;
  right: boolean = false;

  r: boolean = false;
  zoomIn: boolean = false;
  zoomOut: boolean = false;

  dev1: boolean = false;

  cursor: Point2D = { x: 0, y: 0 };
}
