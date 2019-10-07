import { equals as rEquals } from "ramda";

/**
 * The Poincare disc point is free.
 */
export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number, inverse?: boolean) {
    this.x = x;
    this.y = inverse ? 1 - y : y;
  }

  equals(point: Point) {
    return rEquals(this.x, point.x) && rEquals(this.y, point.y);
  }
}
