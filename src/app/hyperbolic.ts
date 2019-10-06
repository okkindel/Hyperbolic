import { circleFromPoints, inversion } from "./math";
import { Circle } from "./circle";
import { Point } from "./point";

export const distance = (p: Point, q: Point): number => {
  // https://en.wikipedia.org/wiki/Poincar%C3%A9_disk_model#Distance
  const numer = 2 * (Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
  const denominator =
    (1 - (Math.pow(p.x, 2) + Math.pow(p.y, 2))) *
    (1 - (Math.pow(q.x, 2) + Math.pow(q.y, 2)));
  return Math.acosh(1 + numer / denominator);
};

export class HLine {
  startAngle: number;
  endAngle: number;
  circle: Circle;
  p: Point;
  q: Point;

  constructor(p: Point, q: Point, plane: Circle) {
    this.p = p;
    this.q = q;
    this.circle = circleFromPoints(p, q, inversion(plane, p));

    this.startAngle = Math.atan2(
      p.y - this.circle.center.y,
      p.x - this.circle.center.x
    );

    this.endAngle = Math.atan2(
      q.y - this.circle.center.y,
      q.x - this.circle.center.x
    );
  }
}
