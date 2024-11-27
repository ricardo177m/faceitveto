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
      if (e.deltaY > 0)
        target.zoomIn(1 / ZOOM_SENSITIVITY, true); // zoom out
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
      inputState.cursor = {
        x: e.offsetX,
        y: e.offsetY,
      };
      if (this.isDragging) {
        target.move({
          x: -e.movementX / target.zoom,
          y: -e.movementY / target.zoom,
        });
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length == 1) {
        if (this.isDragging) {
          // target.move({
          //   x: -e.touches[0].clientX / target.zoom,
          //   y: -e.touches[0].clientY / target.zoom,
          // });
        }
      }
      // } else if (e.type == "touchmove" && e.touches.length == 2) {
      //   isDragging = false;
      //   zoom
      // }
    };

    this.onWheelHandle = (e) => handleWheel(e);

    const { canvas } = target.radar;

    canvas.addEventListener("wheel", this.onWheelHandle, { passive: false });
    canvas.addEventListener("mousedown", onPointerDown);
    canvas.addEventListener("mouseup", onPointerUp);
    canvas.addEventListener("mousemove", onPointerMove);
    canvas.addEventListener("mouseleave", onPointerUp);

    // canvas.addEventListener("touchstart", onPointerDown);
    // canvas.addEventListener("touchmove", handleTouch);
    // canvas.addEventListener("touchend", onPointerUp);

    this._unregister = () => {
      canvas.removeEventListener("wheel", this.onWheelHandle);
      canvas.removeEventListener("mousedown", onPointerDown);
      canvas.removeEventListener("mouseup", onPointerUp);
      canvas.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("mouseleave", onPointerUp);

      // canvas.removeEventListener("touchstart", onPointerDown);
      // canvas.removeEventListener("touchmove", handleTouch);
      // canvas.removeEventListener("touchend", onPointerUp);
    };
  }

  unregister(): void {
    if (this._unregister) this._unregister();
  }
}
