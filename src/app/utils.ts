import { Circle } from "./circle";
import { Point } from "./point";
import { Angle } from "./math";
import { Line } from "./line";

export function drawPoint(context: CanvasRenderingContext2D, point: Point) {
  context.beginPath();
  context.arc(point.x, point.y, 10, 0, 2 * Math.PI, false);
  context.fill();
}

export function drawLine(context: CanvasRenderingContext2D, line: Line) {
  context.beginPath();
  context.moveTo(0, line.at(0));
  context.lineTo(context.canvas.width, line.at(context.canvas.width));
  context.stroke();
}

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
