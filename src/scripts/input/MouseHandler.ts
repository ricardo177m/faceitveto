import { Camera } from "../Camera";
import { InputHandler } from "./InputHandler";

const ZOOM_SENSITIVITY = 1.25;

export class MouseHandler extends InputHandler {
  private onWheelHandle: (e: WheelEvent) => void = () => {};
  private _unregister: () => void = () => {};

  isDragging: boolean = false;

  constructor() {
    super();
  }

  register(target: Camera): void {
    const inputState = target.input;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) target.zoomIn(1 / ZOOM_SENSITIVITY, true); // zoom out
      else target.zoomIn(ZOOM_SENSITIVITY, true); // zoom in
      inputState.cursor = { x: e.offsetX, y: e.offsetY };
    };

    const onPointerDown = () => {
      this.isDragging = true;
    };

    const onPointerUp = () => {
      this.isDragging = false;
    };

    const onPointerMove = (e: MouseEvent) => {
      inputState.cursor = { x: e.offsetX, y: e.offsetY };
      if (this.isDragging) {
        target.move({ x: -e.movementX / target.zoom, y: -e.movementY / target.zoom });
      }
    };

    // const handleTouch = (e) => {
    //   if (e.type == "touchmove" && this.isDragging) {
    //     target.move({ x: e.touches[0].movementX, y: e.touches[0].movementY });
    //   } else if (e.type == "touchmove" && e.touches.length == 2) {
    //     this.isDragging = false;
    //     // handlePinch(e);
    //   }
    // };

    this.onWheelHandle = (e) => handleWheel(e);

    const { canvas } = target.radar;

    canvas.addEventListener("wheel", this.onWheelHandle, { passive: false });
    canvas.addEventListener("mousedown", onPointerDown);
    canvas.addEventListener("mouseup", onPointerUp);
    canvas.addEventListener("mousemove", onPointerMove);
    canvas.addEventListener("mouseleave", onPointerUp);

    this._unregister = () => {
      canvas.removeEventListener("wheel", this.onWheelHandle);
      canvas.removeEventListener("mousedown", onPointerDown);
      canvas.removeEventListener("mouseup", onPointerUp);
      canvas.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("mouseleave", onPointerUp);
    };
  }

  unregister(): void {
    if (this._unregister) this._unregister();
  }
}
