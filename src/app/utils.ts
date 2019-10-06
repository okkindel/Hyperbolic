import { Circle } from "./circle";
import { Point } from "./point";
import { Angle } from "./math";

export function drawArc(
  context: CanvasRenderingContext2D,
  circle: Circle,
  start: Angle,
  stop: Angle
) {
  context.beginPath();
  context.arc(circle.origin.x, circle.origin.y, circle.radius, start, stop);
  context.stroke();
}

export function drawCircle(context: CanvasRenderingContext2D, circle: Circle) {
  drawArc(context, circle, 0, 2 * Math.PI);
}

export function drawPoint(context: CanvasRenderingContext2D, point: Point) {
  context.fillRect(point.x - 1, point.y - 1, 2, 2);
}
