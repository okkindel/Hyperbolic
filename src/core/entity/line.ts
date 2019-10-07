import { circleFromPoints, inversion } from "../geometry";
import { Circle } from "./circle";
import { Point } from "./point";

/**
 * Line in Euclidean concept
 * in the form of ax + b.
 */
export class Line {
  a: number;
  b: number;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  at(x: number): number {
    return this.a * x + this.b;
  }

  intersect(line: Line): Point {
    const x = (line.b - this.b) / (this.a - line.a);
    const y = this.at(x);
    return new Point(x, y);
  }
}

/**
 * Line in Poincare concept.
 */
export class HypLine {
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
