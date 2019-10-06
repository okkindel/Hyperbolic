import { Point } from "./point";

export class Circle {
  origin: Point;
  radius: number;

  constructor(origin: Point, radius: number) {
    this.origin = origin;
    this.radius = radius;
  }
}
