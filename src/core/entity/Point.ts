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

  inversion = (plane: Plane): Point => {
    // https://en.wikipedia.org/wiki/Inversive_geometry#inverse_of_a_point
    const c = plane.center;
    const r = plane.radius;
    const denominator = Math.pow(this.x - c.x, 2) + Math.pow(this.y - c.y, 2);
    return new Point(
      c.x + (r * r * (this.x - c.x)) / denominator,
      c.y + (r * r * (this.y - c.y)) / denominator
    );
  };
}
