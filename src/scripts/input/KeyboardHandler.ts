import { Camera } from "../Camera";
import { InputHandler } from "./InputHandler";

export class KeyboardHandler extends InputHandler {
  private onKeyUpHandle: (e: KeyboardEvent) => void = () => {};
  private onKeyDownHandle: (e: KeyboardEvent) => void = () => {};
  private _unregister: () => void = () => {};

  constructor() {
    super();
  }

  register(target: Camera): void {
    const handleInput = (event: KeyboardEvent, state: boolean) => {
      const inputState = target.input;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          inputState.left = state;
          break;

        case "ArrowRight":
          event.preventDefault();
          inputState.right = state;
          break;

        case "ArrowUp":
          event.preventDefault();
          inputState.up = state;
          break;

        case "ArrowDown":
          event.preventDefault();
          inputState.down = state;
          break;

        case "+":
          event.preventDefault();
          if (inputState.zoomIn !== state && state) target.zoomIn(1.5);
          inputState.zoomIn = state;
          break;

        case "-":
          event.preventDefault();
          if (inputState.zoomOut !== state && state) target.zoomIn(0.75);
          inputState.zoomOut = state;
          break;

        case "R":
        case "r":
          event.preventDefault();
          if (inputState.r !== state && state) target.default();
          inputState.r = state;
          break;

        case "P":
        case "p":
          event.preventDefault();
          if (inputState.dev1 !== state && state) target.radar.showDebugInfo = !target.radar.showDebugInfo;
          inputState.dev1 = state;
          break;
      }
    };

    this.onKeyDownHandle = (e) => handleInput(e, true);
    this.onKeyUpHandle = (e) => handleInput(e, false);

    document.addEventListener("keydown", this.onKeyDownHandle);
    document.addEventListener("keyup", this.onKeyUpHandle);

    this._unregister = () => {
      document.removeEventListener("keydown", this.onKeyDownHandle);
      document.removeEventListener("keyup", this.onKeyUpHandle);
    };
  }

  unregister(): void {
    if (this._unregister) this._unregister();
  }
}
