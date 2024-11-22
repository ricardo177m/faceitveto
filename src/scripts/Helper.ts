import { Point2D } from "./Point";

function drawRect(
  ctx: CanvasRenderingContext2D,
  pos: Point2D,
  size: Point2D,
  style: string
) {
  ctx.fillStyle = style;
  ctx.fillRect(pos.x, pos.y, size.x, size.y);
}

function clearCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.scrollWidth, canvas.scrollHeight);
}

function drawDebugInfo(ctx: CanvasRenderingContext2D, log: string[]) {
  ctx.save();
  ctx.fillStyle = "#00ff00";
  ctx.font = "14px Cascadia Code";
  log.forEach((line, i) => ctx.fillText(line, 10, 20 + i * 20));
  ctx.restore();
}

export { drawRect, clearCanvas, drawDebugInfo };
