export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number, inverse?: boolean) {
    this.x = x;
    this.y = inverse ? 1 - y : y;
  }

  equals(otherPoint: Point) {
    return this.x === otherPoint.x && this.y === otherPoint.y;
  }
}
