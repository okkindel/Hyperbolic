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
  antyclokwise = false;
  startAngle: number;
  endAngle: number;
  plane: Circle;
  arc: Circle;
  p: Point;
  q: Point;

  constructor(p: Point, q: Point, plane: Circle) {
    this.plane = plane;
    this.p = p;
    this.q = q;
    this.calculateArc();
  }

  calculateArc() {
    this.arc = circleFromPoints(this.p, this.q, inversion(this.plane, this.p));
    const startAngle = Math.atan2(
      this.p.y - this.arc.center.y,
      this.p.x - this.arc.center.x
    );
    const endAngle = Math.atan2(
      this.q.y - this.arc.center.y,
      this.q.x - this.arc.center.x
    );

    // TODO
    this.startAngle = Math.min(startAngle, endAngle);
    this.endAngle = Math.max(startAngle, endAngle);
  }
}
