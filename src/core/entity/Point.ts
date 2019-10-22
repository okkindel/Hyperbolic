import { HypPoint } from "./hyperbolic";
import { Plane } from "./Plane";

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

  toHypPoint(plane: Plane): HypPoint {
    return new HypPoint(
      (this.x - plane.windowWidth / 2) / plane.radius,
      (this.y - plane.windowHeight / 2) / plane.radius,
      plane
    );
  }
}
