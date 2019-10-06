import { Point } from "./point";
import { Slope } from "./math";

// ax + b
export class Line {
  a: Slope;
  b: number;

  constructor(a: Slope, b: number) {
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
