import { equals as rEquals } from "ramda";
import { Plane } from "../plane";

/**
 * The Poincare disc point is free.
 */
export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toCartesianCoords(plane: Plane): CartesianPoint {
    return new CartesianPoint(
      (this.x - plane.windowWidth / 2) / plane.radius,
      (this.y - plane.windowHeight / 2) / plane.radius,
      plane
    );
  }
}

export class CartesianPoint {
  plane: Plane;
  x: number;
  y: number;

  constructor(x: number, y: number, plane: Plane) {
    this.plane = plane;
    this.x = x;
    this.y = y;
  }

  toCanvasCoords(): Point {
    return new Point(
      this.x * this.plane.radius + this.plane.windowWidth / 2,
      this.y * this.plane.radius + this.plane.windowHeight / 2
    );
  }
}
