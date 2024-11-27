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

function fixDpi(canvas: HTMLCanvasElement) {
  // from @wdstack
  const dpi = 2;
  const style_height = +getComputedStyle(canvas)
    .getPropertyValue("height")
    .slice(0, -2);
  const style_width = +getComputedStyle(canvas)
    .getPropertyValue("width")
    .slice(0, -2);

  canvas.setAttribute("height", (style_height * dpi).toString());
  canvas.setAttribute("width", (style_width * dpi).toString());
}

export { drawRect, clearCanvas, drawDebugInfo, fixDpi };
