import { Camera } from "../Camera";
import { RadarObject } from "../objects/RadarObject";

export abstract class InputHandler {
  abstract register(target: Camera | RadarObject): void;
  abstract unregister(): void;
}
