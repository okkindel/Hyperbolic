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

  intersectPoint(line: Line): Point {
    const x = (line.b - this.b) / (this.a - line.a);
    const y = this.at(x);
    return new Point(x, y);
  }
}
